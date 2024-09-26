export class PostsRepository {
    constructor (posts) {
        this.posts = posts;
    }

    // 삭제 요청된 게시물 전체 조회[어드민만]
    findDeletedPost = async () => {
        const DeletedPost = await this.posts.find({ deletedAt : { $ne : null } }, {
            _id : false,
            id : true,
            title : true,
            content : true,
            createdAt : true,
            updatedAt : true,
            deletedAt : true,
            users : {
                userId : true,
                nickname : true
            }
        });

        return DeletedPost;
    };

    // 게시글 상세 조회
    findById = async (id) => {
        const findId = await this.posts.findOne({ $and : [{ id : +id }, { deletedAt : null }] },{
            _id : false,
            id : true,
            title : true,
            content : true,
            createdAt : true,
            users : {
                userId : true,
                nickname : true
            }
        });

        return findId;
    };

    // 게시물 생성
    createPost = async (id, title, content, userId, nickname) => {
        const createdPost = await this.posts.create({
            id,
            title,
            content,
            users : {
                userId,
                nickname
            }
        });

        return createdPost;
    };

    // 게시물 전체 조회
    findPost = async () => {
        const all = await this.posts.find({ deletedAt : null }, 
            { 
                _id : false,
                id : true,
                title : true,
                createdAt : true,
                users : {
                    userId : true,
                    nickname : true
                }
            }
        );
        
        return all;
    };

    // 게시글 수정
    editPost = async (id, title, content, updateDate) => {
        const updatedPost = await this.posts.updateOne({ id : +id }, 
            {
                title,
                content,
                updatedAt : updateDate
            }
        )

        return updatedPost;
    };

    // 게시글 삭제
    deletePost = async (id) => {
        const deletedPost = await this.posts.deleteOne({ id : +id });

        return deletedPost;
    };

    // 임시 게시글 삭제
    tbDeletePost = async (id) => {
        const tbDeleted = await this.posts.updateOne({ id : +id }, {
            deletedAt : new Date()
        });

        return tbDeleted;
    }

}