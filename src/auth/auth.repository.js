export class AuthRepository {
    constructor (users) {
        this.users = users;
    }

    findUnique = async (email, nickname) => {
        const find = await this.users.findOne({ $or: [{ email : email }, { nickname : nickname }] });

        return find;
    };

    findEmail = async (email) => {
        const findEmail = await this.users.findOne({ email : email });

        return findEmail;
    };

    // 회원가입
    register = async (id, email, hashPassword, nickname) => {
        const create = await this.users.create({
           id, 
           email,
           password : hashPassword,
           nickname
        });

        return create;
    };
}