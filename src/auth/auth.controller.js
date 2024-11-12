export class AuthController {
    constructor(authService){
        this.authService = authService;
    }

    // 회원가입
    register = async (req, res, next) => {
        try {
            const { email, password, nickname } = req.body;

            if(!email){
                return res.status(400).json({ message : "이메일란이 누락되었습니다." });
            }

            if(!password){
                return res.status(400).json({ message : "패스워드란이 누락되었습니다." });
            }

            if(!nickname){
                return res.status(400).json({ message : "닉네임란이 누락되었습니다." });
            }

            if(email && email.length < 5){
                return res.status(400).json({ message : "이메일란을 5자 이상으로 작성해주세요." });
            }

            if(password && password.length < 8){
                return res.status(400).json({ message : "패스워드란을 8자 이상으로 작성해주세요." });
            }

            if(nickname && nickname.length < 2){
                return res.status(400).json({ message : "닉네임란을 2자 이상으로 작성해주세요." });
            }
    
            await this.authService.register(email, password, nickname);
    
            return res.status(201).json({ message : "회원 생성 완료" });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "회원 생성 오류" });
        }
    };

    // 카카오 계정 토큰 발급
    kakaoPage = async (req, res, next) => {
        try { 
            const kakaouser = req.user;
            const kakaoToken = req.authInfo.token;

            res.cookie('authorization', `Bearer ${kakaoToken}`, { httpOnly: true, secure: true, maxAge: 3600000 });
            res.render('mypage', kakaouser);
        } catch (error){
            console.log(error.message);
        }
    };

    // 로그인
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
    
            if(!email){
                return res.status(400).json({ message : "이메일란이 누락되었습니다." });
            }
    
            if(!password){
                return res.status(400).json({ message : "패스워드란이 누락되었습니다." });
            }

            if(email && email.length < 5){
                return res.status(400).json({ message : "이메일란을 5자 이상으로 작성해주세요." });
            }

            if(password && password.length < 8){
                return res.status(400).json({ message : "패스워드란을 8자 이상으로 작성해주세요." });
            }
    
            const token = await this.authService.login(email, password);

            res.cookie('authorization', `Bearer ${token}`);
    
            return res.status(200).json({ message : "로그인 완료" });
        } catch(error){
            console.log(error.message);
            return res.status(500).json({ message : "로그인에 실패하였습니다." });
        }
    };


    // 로그아웃
    logout = async (req, res, next) => {
        try {
            res.clearCookie('authorization');
            return res.status(200).json({ message : "로그아웃 완료" });
        } catch(error){
            console.log(error.message);
            return res.status(500).json({ message : "로그아웃에 실패하였습니다." });
        }
    };
}