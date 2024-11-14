export class PostCommentReplyRepository{
    constructor(posts, postcomments, postcommentreplys){
        this.posts = posts;
        this.postcomments = postcomments;
        this.postcommentreplys = postcommentreplys;
    }

    // 해당 게시글 ID 조회
    findPostID = async (postId) => {
        const findPostOne = await this.posts.findOne({ $and : [{id : +postId}, {deletedAt : null}] },{
            _id : false,
            id : true
        });

        return findPostOne;
    };

    // 해당 댓글 ID 조회
    findCommentID = async (postId, commentId) => {
        const findCommentOne = await this.postcomments.findOne({ $and : [{postId : +postId}, {id : +commentId}, {deletedAt : null}]}, {
            _id : false,
            id : true
        });

        return findCommentOne;
    };

    // 대댓글 전체 조회
    find = async (postId, commentId) => {
        const find = await this.postcommentreplys.find({ $and : [{postId : +postId}, {postcommentId : +commentId}, {deletedAt : null}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            context : true,
            createdAt : true,
            users : {
                userId : true,
                nickname : true
            }
        });

        return find;
    };

    // 대댓글 ID 전체 조회 (ID만 select 조회)
    findSelectID = async () => {
        const findSelect = await this.postcommentreplys.find({ deletedAt : null }, {
            _id : false,
            id : true
        });
        
        return findSelect;
    };

    // 대댓글 상세 조회
    findOne = async (postId, commentId, id) => {
        const findOne = await this.postcommentreplys.findOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +id}, {deletedAt : null}] }, {
            _id : false,
            postId : true,
            postcommentId : true,
            context : true,
            createdAt : true,
            users : {
                userId : true,
                nickname : true
            }
        })

        return findOne;
    };

    // 삭제된 댓글 리스트 전체 조회
    findDeletedList = async () => {
        const find = await this.postcommentreplys.find({ deletedAt : { $ne : null }},{
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            context : true,
            createdAt : true,
            updatedAt : true,
            deletedAt : true,
            users : {
                userId : true,
                nickname : true
            }
        })

        return find;
    };

    // 대댓글 생성
    create = async (count, postId, commentId, context, user) => {
        const create = await this.postcommentreplys.create({
            id : count,
            postId : postId,
            postcsmmentId : commentId, 
            context : context,
            users : {
                userId : user.id,
                nickname : user.nickname
            }
        });
        
        return create;
    };

    // 대댓글 업데이트 
    update = async (postId, commentId, id, context) => {
        const update = await this.postcommentreplys.updateOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +id}, {deletedAt : null}] }, {
            context : context,
            updatedAt : new Date()
        });
        
        return update;
    };

    // 대댓글 삭제
    delete = async (postId, commentId, id) => {
        const data = await this.postcommentreplys.deleteOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +id}, {deletedAt : null}] });

        return data;
    }

    // 임시 대댓글 삭제
    softdelete = async (postId, commentId, id) => {
        const data = await this.postcommentreplys.updateOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +id}, {deletedAt : null}] }, {
            deletedAt : new Date()
        });

        return data;
    };
}