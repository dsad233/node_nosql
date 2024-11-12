import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { ENV_KAKAO_ID, ENV_REDIRECT_URL, ENV_KAKAO_SECRET_KEY, ENV_JWT_SECRET_KEY } from "./const_config.js";
import users from "../schemas/users.schemas.js";
import jwt from "jsonwebtoken";

export default async function kakaoAccess (req, res, app) {
    app.use(passport.initialize());
    passport.use(new KakaoStrategy({
        clientID : ENV_KAKAO_ID,
        clientSecret : ENV_KAKAO_SECRET_KEY,
        callbackURL : ENV_REDIRECT_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            const findUser = await users.findOne({ id : profile._json.id });
    
            if(findUser && profile._json.id === findUser.id && profile.provider === 'kakao'){

                const tokenSign = jwt.sign({ id : profile._json.id }, ENV_JWT_SECRET_KEY, { expiresIn : '12h' });
                
                return done(null, findUser, { token : tokenSign });
            } else {
                const newUser = await users.create({
                    id : profile._json.id,
                    email : profile._json.kakao_account.email,
                    nickname : profile._json.properties.nickname,
                    provider : 'kakao'
                });

                const createSign = jwt.sign({ id : profile._json.id }, ENV_JWT_SECRET_KEY, { expiresIn : '12h' });

                return done(null, newUser, createSign);
            }
        } catch (error){
            console.log(error.message);
            done(error);
            return res.status(500).json({ message : "카카오 토큰 발급 오류" });       
        }
      }
    ));
}

