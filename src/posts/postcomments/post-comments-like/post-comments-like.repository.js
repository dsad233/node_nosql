export class PostCommentLikeRepository {
    constructor(posts, postcomments, postcommentlike) {
        this.posts = posts;
        this.postcomments = postcomments;
        this.postcommentlike = postcommentlike;
    }

    // 해당 게시글 ID 조회
    findPostID = async (postId) => {
        const findOne = await this.posts.findOne({ $and : [{id : +postId}, {deletedAt : null}] }, {
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

    // 댓글 좋아요 목록 전체 조회
    find = async (postId, commentId) => {
        const find = await this.postcommentlike.find({ $and : [{postId : +postId}, {postcsmmentId : +commentId}, {deletedAt : null}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            createdAt : true,
            users : true
        });

        return find;
    };

    // 댓글 좋아요 목록 ID 전체 조회 (ID만)
    findSelectID = async () => {
        const find = await this.postcommentlike.find({ deletedAt : null }, {
            _id : false,
            id : true
        });

        return find;
    };

    // 댓글 좋아요 목록 상세 조회
    findOne = async (postId, commentId, id) => {
        const findOne = await this.postcommentlike.findOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +id}, {deletedAt : null}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            createdAt : true,
            users : true
        });

        return findOne;
    };

    // 유저가 누른 좋아요 기록 조회
    findUserCommentLike = async (postId, commentId, user) => {
        const findUserData = await this.postcommentlike.findOne({ $and : [{users : { userId : user.id, nickname : user.nickname }}, {postId : +postId}, {postcommentId : +commentId}, {deletedAt : null}] }, {
            _id : false,
            id : true,
            postId : true,
            postcommentId : true,
            users : true
        });

        return findUserData;
    };
    
    // 댓글 좋아요 생성
    create = async (count, postId, commentId, user) => {
        const create = await this.postcommentlike.create({
            id : count,
            postId : postId,
            postcommentId : commentId,
            users : true
        });

        return create;
    };

    
    // 댓글 좋아요 삭제
    delete = async (postId, commentId, id) => {
        const deleteLike = await this.postcommentlike.deleteOne({ $and : [{postId : +postId}, {postcommentId : +commentId}, {id : +id}, {deletedAt : null}] });

        return deleteLike;
    }
}