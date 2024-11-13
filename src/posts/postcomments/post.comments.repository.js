export class PostCommentRepository {
    constructor(posts, postComments){
        this.posts = posts;
        this.postComments = postComments;
    }

    // 게시글 전체 조회
    findPostAll = async () => {
        const find = await this.posts.find({ deletedAt : null },{
            _id : false,
            id : true,
            title : true,
            createdAt : true
        });

        return find;
    };

    // 게시글 아이디 검색
    findPostId = async (id) => {
        const findPost = await this.posts.findOne({ $and : [{id : +id}, {deletedAt : null}] }, {
            _id : false,
            id : true,
            title : true,
            context : true,
            createdAt : true,
            users : {
                userId : true,
                nickname : true
            }
        });

        return findPost;
    };

    // 게시글 댓글 아이디 검색
    findById = async (id) => {
        const findId = await this.postComments.findOne({ $and : [{id : +id}, {deletedAt : null}] },{
            _id : false,
            id : true,
            context : true,
            createdAt : true,
            users : {
                userId : true,
                nickname : true
            }
        });

        return findId;
    };

    // 댓글생성
    createComment = async (user, postId, count, context) => {
        const addComment = await this.postComments.create({
            id : count,
            context,
            postId,
            users : {
                userId : user.id,
                nickname : user.nickname
            }
        });

        return addComment;
    };

    // 댓글 ID 전체 조회 (전체 조회)
    findAll = async () => {
        const find = await this.postComments.find({ deletedAt : null },{
            _id : false,
            id : true
        });
        
        return find;
    }

    // 해당 게시글 댓글 전체 조회
    findAllComment = async (postId) => {
        const findComment = await this.postComments.find({ $and : [{ postId : postId } , { deletedAt : null }] }, {
            _id : false,
            users : {
                userId : true,
                nickname : true
            },
            id : true,
            postId : true,
            context : true,
            createdAt : true
        });
        

        return findComment;
    };
    

    // 내가 작성한 게시글 댓글 전체 조회
    findUserCommentAll = async (user) => {
        const userCommentAll = await this.postComments.find({ $and : [{ users : { userId : user.id, nickname : user.nickname } }, { deletedAt : null }]}, {
            _id : false,
            id : true,
            postId : true,
            context : true,
            createdAt : true
        });

        return userCommentAll;
    };

    // 임시 댓글 삭제 목록 전체 조회 [어드민만]
    findDeleteList = async () => {
        const findDeleted = await this.postComments.find({ deletedAt : { $ne : null } }, {
            _id : false,
            postId : true,
            context : true,
            createdAt : true,
            updatedAt : true,
            deletedAt : true,
            users : true
        });

        return findDeleted;
    };

    // 댓글 상세 조회
    findOneComment = async (postId, id) => {
        const findId = await this.postComments.findOne({ $and : [{ id : +id }, { postId : postId }, { deletedAt : null }]}, {
            _id : false,
            users : {
                userId : true,
                nickname : true
            },
            id : true,
            postId : true,
            context : true,
            createdAt : true
        });

        return findId;
    };

    // 댓글 수정
    editComment = async (postId, id, context) => {
        const editComment = await this.postComments.updateOne({ $and : [{postId : +postId}, {id : +id}, {deletedAt : null}] }, {
            context
        });

        return editComment;
    };

    // 댓글 삭제
    deleteComment = async (postId, id) => {
        const deleteComment = await this.postComments.deleteOne({ $and : [{postId : +postId}, {id : +id}] });

        return deleteComment;
    }

    // 임시 댓글 삭제
    tbCommentdelete = async (postId, id) => {
        const tobedeleted = await this.postComments.updateOne({ $and : [{postId : +postId}, {id : +id}, {deletedAt : null}] }, {
            deletedAt : new Date()
        });

        return tobedeleted;
    };
}