import bcrypt from "bcrypt";
import { ENV_PASSWORD_SALT } from "../utils/const_config.js";
import signToken from "../utils/jwt/jwtSign.js";
export class AuthService {
    constructor (authRepository){
        this.authRepository = authRepository;
    }

    // 패스워드 암호화 과정
    hashPassword = async (password) => {
        const salts = await bcrypt.genSalt(ENV_PASSWORD_SALT);
        const hashPassword = await bcrypt.hash(password, salts);

        return hashPassword;
    };

    // 회원 유무 조회 & 패스워드 해독 후 비교
    comparePassword = async (email, password) => {
        const findUser = await this.authRepository.findEmail(email);

        if(!findUser){
            throw new Error("계정이 존재하지 않습니다.");
        }

        if(findUser && findUser.deletedAt !== null){
            throw new Error("삭제 요청된 계정입니다. 문의 바랍니다.");
        }
    
        const comparePassword = await bcrypt.compare(password, findUser.password);

        if(!comparePassword){
            throw new Error("패스워드가 일치하지 않습니다.");
        }

        return findUser;
    };

    // 회원가입
    register = async (id, email, password, nickname) => {
        const findUnique = await this.authRepository.findUnique(email, nickname);
        const hashPassword = await this.hashPassword(password);

        if(findUnique && findUnique.deletedAt === null && findUnique && email === findUnique.email){
            throw new Error("이미 존재하는 이메일입니다.");
        }

        if(findUnique && findUnique.deletedAt === null && findUnique && nickname === findUnique.nickname){
            throw new Error("이미 존재하는 닉네임입니다.");
        }

        if(findUnique && findUnique.deletedAt !== null){
            throw new Error("삭제 요청된 계정입니다. 문의 바랍니다.");
        }

        const create = await this.authRepository.register(id, email, hashPassword, nickname);

        return create;
    };

    // 로그인
    login = async (email, password) => {
        const findUser = await this.comparePassword(email, password);
        const sign = await signToken(findUser.id);
        
        return sign;
    };

}