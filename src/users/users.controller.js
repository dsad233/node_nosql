export class UsersController {
    constructor(usersService, authService){
        this.usersService = usersService;
        this.authService = authService;
    }

    // 삭제 요청된 회원 전체 조회 [어드민만]
    findDeletedUser = async (req, res) => {
        try {
            const findDeleted = await this.usersService.findDeletedUser();

            return res.status(200).json({ message : "삭제 요청된 회원 전체 조회", data : findDeleted });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "삭제 요청된 회원 젠체 조회 오류" });
        }
    };

    // 회원 전체 조회 [어드민만 가능하게 할 예정]
    userAll = async (req, res) => {
        try {
            const usersData = await this.usersService.userAll();
            
            return res.status(200).json({ message : "회원 전체 조회", data : usersData });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "회원 전체 조회 오류" });
        }
    };

    // 유저 상세 조회
    userOne = async (req, res) => {
        try {
            const { id } = req.params;
            const userOne = await this.usersService.userOne(id);
    
            return res.status(200).json({ message : "회원 상세 조회", data : userOne });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "회원 상세 조회 오류" });
        }
    };

    // 유저 마이페이지 조회
    userInfo = async (req, res) => {
        try {
            const { id } = req.user;

            const infoGet = await this.usersService.findMyPage(id);

            return res.status(200).json({ message : "회원 마이페이지 조회", data : infoGet });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "회원 마이페이지 조회 오류" });
        }
    };

    // 회원 수정
    userEdit = async (req, res, next) => {
        try {
            const { id } = req.user;
            const { password, nickname } = req.body;
        
            if(!password){
                return res.status(404).json({ message : "패스워드란이 누락되었습니다." });
            }

            if(password && password.length < 8){
                return res.status(404).json({ message : "패스워드란을 8자 이상으로 작성하여 주십시오." });
            }

            if(nickname && nickname.length < 2){
                return res.status(404).json({ message : "닉네임란을 2자 이상으로 작성하여 주십시오." });
            }

            const hashPassword = await this.authService.hashPassword(password);

            await this.usersService.userEdit(id, hashPassword, nickname);

            res.clearCookie('authorization');
            return res.status(201).json({ message : "회원 정보 수정 완료" });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "회원 정보 수정 오류" });
        }
    };

    // 회원 탈퇴
    userDelete = async (req, res, next) => {
        try {
            const { id } = req.user;

            await this.usersService.userDelete(id);

            res.clearCookie('authorization');
            return res.status(201).json({ message : "회원 탈퇴 완료" });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "회원 탈퇴 오류" });
        }
    };

    // 임시 회원 탈퇴
    tbUserDelete = async (req, res, next) => {
        try {
            const { id } = req.user;

            await this.usersService.tbUserDelete(id);
            
            res.clearCookie('authorization');
            return res.status(201).json({ message : "회원 탈퇴 완료" });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "회원 탈퇴 오류" });
        }
    };
}