import express from "express";
import posts from "../schemas/posts.schemas.js";
import { PostsRepository } from "./posts.repository.js";
import { PostsService } from "./posts.service.js";
import { PostsController } from "./posts.controller.js";
import checkToken from "../utils/jwt/jwtCheck.js";

const router = express.Router();

const postsRepository = new PostsRepository(posts);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);

// 게시물 생성
router.post('', checkToken, postsController.postCreate);
// 삭제 요청된 게시글 전체 조회 [어드민만]
router.get('/tbdeletedpost', postsController.findDeletedPost);
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


export default router;