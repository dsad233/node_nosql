import express from "express";
import users from "../schemas/users/users.schemas.js";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { AuthService } from "../auth/auth.service.js";
import { UsersController } from "./users.controller.js";
import checkToken from "../utils/jwt/jwtCheck.js";

const router = express.Router();

const authRepository = new AuthRepository(users);
const authService = new AuthService(authRepository);

const usersRepository = new UsersRepository(users);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService, authService);

// 삭제 요청된 회원 전체 조회 [어드민만]
router.get('/tbdeleteduser', checkToken, usersController.findDeletedUser);
// 회원 전체 조회 [어드민만 가능하게 할 예정]
router.get('', checkToken, usersController.userAll);
// 회원 마이페이지 조회
router.get('/info', checkToken, usersController.userInfo);
// 회원 상세 조회 [어드민만 조회 가능하게 할 예정]
router.get('/:id', checkToken, usersController.userOne);

// 회원 수정
router.patch('', checkToken, usersController.userEdit);
// 회원 탈퇴
router.delete('', checkToken, usersController.userDelete);
// 임시 회원 탈퇴 
router.patch('/softdelete', checkToken, usersController.tbUserDelete);

export default router;
