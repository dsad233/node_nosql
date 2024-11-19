export class PostCommentReplyLikeRepository {
    constructor(posts, postcomments, postcommentreplys, postcommentreplylike) {
        this.posts = posts;
        this.postcomments = postcomments;
        this.postcommentreplys = postcommentreplys;
        this.postcommentreplylike = postcommentreplylike;
    }

    // 게시물 ID 조회
    findPostID = async (postId) => {
        const findOne = await this.posts.findOne({ $and : [{id : +postId}, {deletedAt : null}] },{
            _id : false,
            id : true
        });

        return findOne;
    };

    
    // 해당 게시글 댓글 ID 조회
    findCommentID = async (postId, commentId) => {
        const findOne = await this.postcomments.findOne({ $and : [{postId : +postId}, {id : +commentId}, {deletedAt : null}] }, {
            _id : false,
            id : true
        });

        return findOne;
    };

    // 해당 게시글 대댓글 ID 조회
    findReplyID = async (postId, commentId, replyId) => {
        const findOne = await this.postcommentreplys.findOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +replyId}, {deletedAt : null}] }, {
            _id : false,
            id : true
        });

        return findOne;
    };


    // 해당 게시글, 댓글의 대댓글 좋아요 전체 조회
    find = async (postId, commentId, replyId) => {
        const find = await this.postcommentreplylike.find({ $and : [{postId : +postId}, {postcommentId : +commentId}, {postcommentreplyId : +replyId}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            postcommentreplyId : true,
            createdAt : true,
            users : true
        });

        return find;
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 ID만 전체 조회
    findSelectID = async () => {
        const find = await this.postcommentreplylike.find({}, {
            _id : false,
            id : true
        });

        return find;
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 상세 조회
    findOne = async (id, postId, commentId, replyId) => {
        const findOne = await this.postcommentreplylike.findOne({ $and : [{id : +id}, {postId : +postId}, {postcommentId : +commentId}, {postcommentreplyId : +replyId}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            postcommentreplyId : true,
            createdAt : true,
            users : true
        });

        return findOne;
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 상세 조회
    findReplyUserLike = async (postId, commentId, replyId, user) => {
        const findUserLikeOne = await this.postcommentreplylike.findOne({ $and : [{users : { userId : user.id, nickname : user.nickname }}, {postId : +postId}, {postcommentId : +commentId}, {postcommentreplyId : +replyId}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            postcommentreplyId : true,
            createdAt : true,
            users : true
        });

        return findUserLikeOne;
    };


    // 해당 게시글, 댓글의 대댓글 좋아요 생성
    create = async (count, postId, commentId, replyId, user) => {
        const create = await this.postcommentreplylike.create({
            id : count,
            postId : postId,
            postcommentId : commentId,
            postcommentreplyId : replyId,
            users : {
                userId : user.id,
                nickname : user.nickname
            }
        })

        return create;
    };


    // 해당 게시글, 댓글의 대댓글 좋아요 삭제
    delete = async (id, postId, commentId, replyId) => {
        const deleteLike = await this.postcommentreplylike.deleteOne({ $and : [{id : +id}, {postId : +postId}, {postcommentId : +commentId}, {postcommentreplyId : +replyId}] });

        return deleteLike;
    };
}