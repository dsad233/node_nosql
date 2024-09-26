import express from "express";
import usersRouter from "../src/users/users.router.js";
import authRouter from "../src/auth/auth.router.js";
import postsRouter from "../src/posts/posts.router.js";
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);


export default router;