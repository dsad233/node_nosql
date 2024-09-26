export class UsersService {
    constructor(usersRepository){
        this.usersRepository = usersRepository;
    }

    // 삭제 요청된 회원 전체 조회 [어드민만]
    findDeletedUser = async () => {
        const DeletedAll = await this.usersRepository.findDeletedUser();

        if(DeletedAll.length === 0){
            throw new Error("회원이 존재하지 않습니다.");
        }

        return DeletedAll;
    };

    // 회원 전체 조회 [어드민만 가능하게 할 예정]
    userAll = async () => {
        const userAll = await this.usersRepository.userAll();

        if(userAll.length === 0){
            throw new Error("회원이 존재하지 않습니다.");
        }

        return userAll;
    };

    // 회원 상세 조회 [어드민만 조회 가능하게 할 예정]
    userOne = async (id) => {
        const findId = await this.usersRepository.findById(id);

        if(!findId){
            throw new Error("회원이 존재하지 않습니다.");
        }
        
        return findId;
    }

    // 회원 마이페이지 조회
    findMyPage = async (id) => {
        const findMyId = await this.usersRepository.findMyPage(id);

        if(!findMyId){
            throw new Error("회원이 존재하지 않습니다.");
        }
        
        return findMyId;
    }

    // 회원 수정
    userEdit = async (id, hashPassword, nickname) => {
        const findId = await this.usersRepository.findById(id);

        if(!findId){
            throw new Error("회원이 존재하지 않습니다.");
        }

        const findNickname = await this.usersRepository.findNickname(nickname);

        if(findNickname && nickname === findNickname.nickname){
            throw new Error("이미 존재하는 닉네임입니다.");
        }

        const updateDate = new Date();
        const Edit = await this.usersRepository.userEdit(id, hashPassword, nickname, updateDate);

        return Edit;
    }

    // 회원 탈퇴
    userDelete = async (id) => {
        const findId = await this.usersRepository.findById(id);

        if(!findId){
            throw new Error("회원이 존재하지 않습니다.");
        }

        const Delete = await this.usersRepository.userDelete(id);

        return Delete;
    };

    // 임시 회원 탈퇴
    tbUserDelete = async (id) => {
        const tobeDelete = await this.usersRepository.tbUserDelete(id);
        
        if(!tobeDelete){
            throw new Error("회원이 존재하지 않습니다.");
        }

        return tobeDelete;
    };

}