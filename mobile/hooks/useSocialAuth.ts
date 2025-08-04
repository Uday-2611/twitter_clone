import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react"
import { Alert } from "react-native";

export const useSocialAuth = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
        setIsLoading(true);
        try {

            const { createSessionId, setActive } = await startSSOFlow({ strategy });

            if (createSessionId && setActive) {
                await setActive({ session: createSessionId });
            }

        } catch (error) {
            const provider = strategy === 'oauth_google' ? 'Google' : 'Apple'

            Alert.alert('Error', `Failed to sign in with ${provider}. Please try again`)
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, handleSocialAuth }
}

// TODO: What is strategy in auth 