import express from "express";
import posts from "../schemas/posts.schemas.js";
import { PostsRepository } from "./posts.repository.js";
import { PostsService } from "./posts.service.js";
import { PostsController } from "./posts.controller.js";
import checkToken from "../utils/jwt/jwtCheck.js";

import postcomments from "../schemas/post.comments.js";
import { PostCommentRepository } from "./postcomments/post.comments.repository.js";
import { PostCommentService } from "./postcomments/post.comments.service.js";
import { PostCommentController } from "./postcomments/post.comments.controller.js";

import postLikes from "../schemas/post.likes.js";
import { PostLikeRepository } from "../posts/postlikes/postlikes.repository.js";
import { PostLikeService } from "../posts/postlikes/postlikes.service.js";
import { PostLikeController } from "../posts/postlikes/postlikes.controller.js";


const router = express.Router();

const postsRepository = new PostsRepository(posts);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);

const postCommentRepository = new PostCommentRepository(posts, postcomments);
const postCommentService = new PostCommentService(postCommentRepository);
const postCommentController = new PostCommentController(postCommentService);

const postLikeRepository = new PostLikeRepository(posts, postLikes);
const postLikeService = new PostLikeService(postLikeRepository);
const postLikeController = new PostLikeController(postLikeService);


// ---- 게시글 ---- //
// 게시물 생성
router.post('', checkToken, postsController.postCreate);
// 삭제 요청된 게시글 전체 조회 [어드민만]
router.get('/deleted', postsController.findDeletedPost);
// 게시물 전체 조회
router.get('', checkToken, postsController.find);
// 내가 작성한 게시글 조회
router.get('/mypost', checkToken, postsController.findMyPost);
// 게시글 상세 조회
router.get('/:id', checkToken, postsController.findOne);
// 게시글 수정
router.patch('/:id', checkToken, postsController.postUpdate);
// 게시글 삭제
router.delete('/:id', checkToken, postsController.postDelete);
// 임시 게시글 삭제
router.patch('/softdelete/:id', checkToken, postsController.tbDeletePost);


//  ---- 게시글 좋아요 ---- //
// 해당 게시글 좋아요 count 조회 
router.get('/:postId/postlike/postcount', checkToken, postLikeController.findPostLikeCount);
// 해당 게시글 좋아요 count 수만 조회
router.get('/:postId/postlike/count', checkToken, postLikeController.findLikeCount);
// 해당 게시글 좋아요를 누른 유저들 전체 조회
router.get('/:postId/postlike', checkToken, postLikeController.findLikeUser);
// 유저가 누른 좋아요 총 목록 조회
router.get('/postlike/mylike', checkToken, postLikeController.findUserLikedAll);
// 해당 게시글 좋아요 상세 조회
router.get('/:postId/postlike/:likeId', checkToken, postLikeController.findOne);
// 게시글 좋아요 생성
router.post('/:postId/postlike', checkToken, postLikeController.create);


// ---- 게시글 댓글 ---- //
// 댓글 전체 조회
router.get('/:postId/post-comments', checkToken, postCommentController.find);
// 해당 게시글의 댓글 목록 전체 조회
router.get('/:postId/post-comments/comments', checkToken, postCommentController.findCommentAll);
// 댓글 삭제리스트 전체 조회 [어드민만]
router.get('/post-comments/deleted', checkToken, postCommentController.findDeleted);
// 유저가 작성한 댓글에 대한 게시글 전체 조회
router.get('/post-comments/mycomments', checkToken, postCommentController.findUserAllComment);
// 해당 게시글에 대한 댓글 카운트 조회
router.get('/:postId/post-comments/count', checkToken, postCommentController.findCommentAllCount);
// 댓글 상세 조회
router.get('/:postId/post-comments/:id', checkToken, postCommentController.findOne);
// 댓글 생성
router.post('/:postId/post-comments', checkToken, postCommentController.create);
// 댓글 수정
router.patch('/:postId/post-comments/:id', checkToken, postCommentController.update);
// 댓글 삭제
router.delete('/:postId/post-comments/:id', checkToken, postCommentController.delete);
// 임시 댓글 삭제
router.patch('/:postId/post-comments/softdelete/:id', checkToken, postCommentController.tbdelete);



export default router;