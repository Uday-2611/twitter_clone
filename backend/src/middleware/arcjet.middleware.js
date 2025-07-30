import { aj } from "../config/arcjet.js";

// Arcjet middleware for rate limiting, bot protection, and security -> 
export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1 //each request contains 1 token
        });

        // handle denied requests -> 
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    error: 'Too many requests',
                    message: 'Rate limit exceeded. Please try again later'
                });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({
                    error: 'Bot access denied',
                    message: 'Automated requests are not allowed'
                });
            } else {
                return res.status(403).json({
                    error: 'Forbidden',
                    message: 'Access denied by security policy'
                });
            }
        }

        // check for spoofed bots -> 
        if (decision.results.some((results) => results.reason.isBot() && results.reason.isSpoofed())) {
            return res.status(403).json({
                error: 'Spoofed Bot detected',
                message: 'Malicious bot activity detected'
            });
        }

        next();
    } catch (error) {
        console.error('Arcjet middleware error', error);
        // allow request to continue if Arcjet fails -> 
        next();
    }
}