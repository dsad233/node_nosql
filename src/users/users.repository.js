export class UsersRepository {
    constructor (users){
        this.users = users;
    }

    findNickname = async (nickname) => {
        const findNickname = await this.users.findOne({ nickname : nickname });

        return findNickname;
    };

    // 삭제 요청된 회원 전체 조회 [어드민만]
    findDeletedUser = async () => {
        const DeletedAll = await this.users.find({ deletedAt : { $ne : null } }, {
            _id : false,
            id : true, 
            email : true,
            password : true,
            nickname : true,
            provider : true,
            createdAt : true,
            updatedAt : true,
            deletedAt : true
        });
        
        return DeletedAll;
    };

    // 회원 상세 조회 [어드민만 조회 가능하게 할 예정]
    findById = async (id) => {
        const findId = await this.users.findOne({ id : +id },
            {
                _id : false,
                id : true, 
                email : true,
                password : true,
                nickname : true,
                provider : true,
                createdAt : true,
                updatedAt : true,
                deletedAt : true
            }
        );
        
        return findId;
    };

    // 회원 마이페이지 조회
    findMyPage = async (id) => {
        const findId = await this.users.findOne({ id : +id },
            {
                _id : false,
                id : true, 
                email : true,
                password : true,
                nickname : true,
                provider : true,
                createdAt : true,
                updatedAt : true
            }
        );
        
        return findId;
    };

    // 회원 전체 조회 [어드민만 가능하게 할 예정]
    userAll = async () => {
        const userAll = await this.users.find({}, 
            { 
                _id : false,
                id : true, 
                email : true,
                password : true,
                nickname : true,
                provider : true,
                createdAt : true,
                updatedAt : true,
                deletedAt : true
            });

        return userAll;
    };

    // 회원 수정
    userEdit = async (id, hashPassword, nickname, updateDate) => {
        const updatedUser = await this.users.updateOne({ id : +id },{
            password : hashPassword,
            nickname,
            updatedAt : updateDate
        });

        return updatedUser;
    };

    // 회원 탈퇴
    userDelete = async (id) => {
        const deletedUser = await this.users.deleteOne({ id : +id });

        return deletedUser;
    };

    // 임시 회원 탈퇴
    tbUserDelete = async (id) => {
        const tobeDeleted = await this.users.updateOne({ id : +id }, 
            {
                deletedAt : new Date()
            }
        );

        return tobeDeleted;
    };

}