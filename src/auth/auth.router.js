import express from "express";
import users from "../schemas/users.schemas.js";
import { UsersRepository } from "../users/users.repository.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { AuthService } from "../auth/auth.service.js";
import { AuthController } from "../auth/auth.controller.js";
import checkToken from "../utils/jwt/jwtCheck.js";
import passport from "passport";

const router = express.Router();

const usersRepository = new UsersRepository(users);
const authRepository = new AuthRepository(users);
const authService = new AuthService(authRepository, usersRepository);
const authController = new AuthController(authService);

// 회원가입
router.post('/register', authController.register);
// 로그인
router.post('/login', authController.login);
// 로그아웃
router.post('/logout', checkToken, authController.logout);
// 카카오 계정 회원가입 진행 페이지 이동
router.get('/kakao', passport.authenticate('kakao'));
// 카카오 계정 토큰 발급
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/', session: false }), authController.kakaoPage);

export default router;