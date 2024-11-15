import express from "express";
import posts from "../schemas/posts/posts-schemas.js"
import { PostsRepository } from "./posts.repository.js";
import { PostsService } from "./posts.service.js";
import { PostsController } from "./posts.controller.js";
import checkToken from "../utils/jwt/jwtCheck.js";

import postcomments from "../schemas/posts/post-comments/post-comments.js";
import { PostCommentRepository } from "./postcomments/post-comments-repository.js";
import { PostCommentService } from "./postcomments/post-comments-service.js";
import { PostCommentController } from "./postcomments/post-comments-controller.js";

import postcommentlike from "../schemas/posts/post-comments/post-comments-like.js";
import { PostCommentLikeRepository } from "./postcomments/post-comments-like/post-comments-like.repository.js";
import { PostCommentLikeService } from "./postcomments/post-comments-like/post-comments-like.service.js";
import { PostCommentLikeController } from "./postcomments/post-comments-like/post-comments-like.controller.js";

import postcommentreplys from "../schemas/posts/post-comments/post.comments-reply/post-comments-reply.js";
import { PostCommentReplyRepository } from "./postcomments/post-comments-reply/post-comments-reply.repository.js";
import { PostCommentReplyService } from "./postcomments/post-comments-reply/post-comments-reply.service.js";
import { PostCommentReplyController } from "./postcomments/post-comments-reply/post-comments-reply.controller.js";

import postcommentreplylike from "../schemas/posts/post-comments/post.comments-reply/post-comments-reply-like.js"
import { PostCommentReplyLikeRepository } from "./postcomments/post-comments-reply/post-comments-reply-like/post-comments-reply-like.repository.js";
import { PostCommentReplyLikeService } from "./postcomments/post-comments-reply/post-comments-reply-like/post-comments-reply-like.service.js";
import { PostCommentReplyLikeController } from "./postcomments/post-comments-reply/post-comments-reply-like/post-comments-reply-like.controller.js";

import postLikes from "../schemas/posts/post-likes.js";
import { PostLikeRepository } from "./postlikes/post-likes.repository.js";
import { PostLikeService } from "./postlikes/post-likes.service.js";
import { PostLikeController } from "./postlikes/post-likes.controller.js";


const router = express.Router();

const postsRepository = new PostsRepository(posts);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);

const postLikeRepository = new PostLikeRepository(posts, postLikes);
const postLikeService = new PostLikeService(postLikeRepository);
const postLikeController = new PostLikeController(postLikeService);

const postCommentRepository = new PostCommentRepository(posts, postcomments);
const postCommentService = new PostCommentService(postCommentRepository);
const postCommentController = new PostCommentController(postCommentService);

const postCommentLikeRepository = new PostCommentLikeRepository(posts, postcomments, postcommentlike);
const postCommentLikeService = new PostCommentLikeService(postCommentLikeRepository);
const postCommentLikeController = new PostCommentLikeController(postCommentLikeService);

const postCommentReplyRepository = new PostCommentReplyRepository(posts, postcomments, postcommentreplys);
const postCommentReplyService = new PostCommentReplyService(postCommentReplyRepository);
const postCommentReplyController = new PostCommentReplyController(postCommentReplyService);

const postCommentReplyLikeRepository = new PostCommentReplyLikeRepository(posts, postcomments, postcommentreplys, postcommentreplylike);
const postCommentReplyLikeService = new PostCommentReplyLikeService(postCommentReplyLikeRepository);
const postCommentReplyLikeController = new PostCommentReplyLikeController(postCommentReplyLikeService);


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


// ---- 게시글 댓글 좋아요 ---- //
// 해당 게시글의 댓글 좋아요 목록 전체 조회
router.get('/:postId/post-comments/:commentId/likes', checkToken, postCommentLikeController.find);
// 해당 게시글의 댓글 좋아요 카운트 조회
router.get('/:postId/post-comments/:commentId/likes/count', checkToken, postCommentLikeController.findCount);
// 해당 게시글의 댓글 좋아요 목록 상세 조회
router.get('/:postId/post-comments/:commentId/likes/:id', checkToken, postCommentLikeController.findOne);
// 해당 게시글의 댓글 좋아요 생성
router.post('/:postId/post-comments/:commentId/likes', checkToken, postCommentLikeController.create);



// ---- 게시글 대댓글 ---- //
// 해당 게시글의 대댓글 전체 조회
router.get('/:postId/post-comments/:commentId/replys', checkToken, postCommentReplyController.find);
// 해당 게시글의 대댓글 카운트
router.get('/:postId/post-comments/:commentId/replys/count', checkToken, postCommentReplyController.findCount);
// 해당 게시글의 대댓글 상세 조회
router.get('/:postId/post-comments/:commentId/replys/:id', checkToken, postCommentReplyController.findOne);
// 삭제된 대댓글 리스트 전체 조회 [어드민만]
router.get('/post-comments/replys/deleted', checkToken, postCommentReplyController.findDeleted);
// 대댓글 생성
router.post('/:postId/post-comments/:commentId/replys', checkToken, postCommentReplyController.create);
// 대댓글 업데이트
router.patch('/:postId/post-comments/:commentId/replys/:id', checkToken, postCommentReplyController.update);
// 대댓글 삭제
router.delete('/:postId/post-comments/:commentId/replys/:id', checkToken, postCommentReplyController.delete);
// 대댓글 임시 삭제 (softdelete)
router.patch('/:postId/post-comments/:commentId/replys/softdelete/:id', checkToken, postCommentReplyController.softdelete);




export default router;