import express from 'express';
import { followUser, getCurrentUser, getUserProfile, syncUser, updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// public route -> 
router.get('/profile/:username', getUserProfile);

// update profile -> have to be authenticated.
router.put('/profile',protectRoute, updateProfile);
// sync the user from clerk to mongoDB.
router.post('/sync', protectRoute, syncUser);
// to get the current logged in user.
router.post('/me', protectRoute, getCurrentUser);
// endpoint to be able to follow a user.
router.post('/follow/:targetUserId', protectRoute, followUser);

export default router;