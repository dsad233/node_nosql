export class PostCommentRepository {
    constructor(postComments){
        this.postComments = postComments;
    }

    // 댓글 전체 조회
    findAllComment = async () => {
        const findComment = await this.postComments.find({ deletedAt : null }, {
            _id : false,
            posts : {
                postId : true,
                title : true,
                content : true,
                createdAt : true,
                users : {
                    userId : true,
                    nickname : true
                }
            },
            users : {
                userId : true,
                nickname : true
            },
            id : true,
            title : true,
            content : true,
            createdAt : true,
            updatedAt : true
        });

        return findComment;
    };

    // 댓글 상세 조회
    findOneComment = async (id) => {
        const findId = await this.postComments.findOne({ $and : [{ id : +id }, { deletedAt : null }]}, {
            _id : false,
            users : {
                userId : true,
                nickname : true
            },
            id : true,
            title : true,
            content : true,
            createdAt : true,
            updatedAt : true
        });

        return findId;
    };

    // 댓글 수정
    editComment = async (id, title, content) => {
        const editComment = await this.postComments.updateOne({ id : +id }, {
            title,
            content
        });

        return editComment;
    };

    // 댓글 삭제
    deleteComment = async (id) => {
        const deleteComment = await this.postComments.deleteOne({ id : +id });

        return deleteComment;
    }

    // 임시 댓글 삭제
    tbCommentdelete = async (id) => {
        const tobedeleted = await this.postComments.updateOne({ id : +id }, {
            deletedAt : new Date()
        });

        return tobedeleted;
    };
}