import jwt from "jsonwebtoken";
import users from "../../schemas/users.schemas.js"
import { ENV_JWT_SECRET_KEY } from "../const_config.js";

export default async function checkToken (req, res, next){
    try {
        if(!req.cookies.authorization){
            return res.status(400).json({ message : "로그인을 진행해 주세요." });
        }

        const [tokenType, token] = req.cookies.authorization.split(' ');

        if(!tokenType || !token){
            return res.status(404).json({ message : "토큰이 존재하지 않습니다." });
        }

        if(tokenType !== 'Bearer'){
            return res.status(404).json({ message : "토큰 타입이 일치하지 않습니다." });
        }

        const verify = jwt.verify(token, ENV_JWT_SECRET_KEY);

        const findUser = await users.findOne({ id : +verify.id });

        if(!findUser){
            return res.status(404).json({ message : "회원정보가 존재하지 않습니다." });
        }

        if(findUser.deletedAt !== null){
            return res.status(403).json({ message : "삭제 요청된 회원입니다. 문의 바랍니다." });
        }

        req.user = findUser;

        next();
    } catch (error){
        console.log(error.message);
        return res.status(500).json({ message : "회원 인증에 실패하였습니다." });
    }
}
