import express from "express";
import postComments from "../../schemas/post.comments";
import { PostCommentController } from "../postcomments/post.comments.controller.js";
import { PostCommentService } from "../postcomments/post.comments.service.js";
import { PostCommentRepository } from "../postcomments/post.comments.repository.js";

const router = express.Router();

const postCommentRepository = new PostCommentRepository(postComments);
const postCommentService = new PostCommentService(postCommentRepository);
const postCommentController = new PostCommentController(postCommentService);


router.get('', postCommentController);



export default router;