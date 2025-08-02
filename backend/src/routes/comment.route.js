import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js';

const router = express.Router();

// public router -> 
router.get('/post/:postId', getComments);

// protected router -> 
router.post('/post/:postId', protectRoute, createComment);
router.post('/:commentId', protectRoute, deleteComment);

export default router;