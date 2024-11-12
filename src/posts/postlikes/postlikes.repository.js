export class PostLikeRepository {
    constructor(posts, postLikes) {
        this.posts = posts;
        this.postLikes = postLikes;
    }

    // 게시글 전체 조회
    findPostAll = async () => {
        const findPost = await this.posts.find({ deletedAt : null }, {
            _id : false,
            id : true,
            title : true,
            createdAt : true
        })  

        return findPost;
    };

    // 해당 게시글 ID 조회
    findPostOne = async (postId) => {
        const findPostId = await this.posts.findOne({ $and : [{ id : +postId }, { deletedAt : null }] },
            {
                _id : false,
                id : true,
                title : true,
                context : true,
                createdAt : true
            }
        );

        return findPostId;
    };

    // 해당 게시글 ID 간단 정보만 조회 (title, createdAt 만 조회)  
    findLikedPost = async (postId) => {
        const findPostId = await this.posts.findOne({ $and : [{ id : +postId }, { deletedAt : null }] },
            {
                _id : false,
                id : true,
                title : true,
                createdAt : true
            }
        );

        return findPostId;
    };

    // 해당 게시글 좋아요 전체 조회
    findLikeAll = async (postId) => {
        const find = await this.postLikes.find({ $and : [{ postId : +postId }, { deletedAt : null }] },
            {
                _id : false,
                id : true,
                postId : true,
                users : {
                    userId : true,
                    nickname : true
                }
            }
        );

        return find;
    };

    // 유저가 누른 좋아요 총 목록 (자기 회원만 접근 가능)
    findUserPostLikedAll = async (user) => {
        const findUserLiked = await this.postLikes.find({ $and : [{users : { userId : user.id, nickname : user.nickname }}, { deletedAt : null }]},{
            _id : false,
            id : true,
            postId : true
        })

        return findUserLiked;
    };

    // 게시글 좋아요 ID만 전체 조회
    findLikeIdAll = async () => {
        const findLikeAll = await this.postLikes.find({ deletedAt : null }, {
            _id : false,
            id : true,
        });
        
        return findLikeAll;
    };

    // 해당 게시글에 유저가 누른 좋아요 목록 전체 조회
    findUserLikeAll = async (user, postId) => {
        const findLikeAll = await this.postLikes.find({ $and : [{users : { userId : user.id, nickname : user.nickname }},{postId : +postId}, {deletedAt : null}]}, {
            _id : false,
            id : true,
            postId : true
        })
        
        return findLikeAll;
    };

    // 해당 게시글에 유저가 누른 좋아요 상세 목록 조회 (service create 좋아요 조회에 사용)
    findUserLikeOne = async (user, postId) => {
        const findUserLike = await this.postLikes.findOne({ $and : [{users : { userId : user.id, nickname : user.nickname }},{postId : +postId}, {deletedAt : null}] },
            {
                _id : false,
                id : true,
                postId : true,
                users : true
            }
        )

        return findUserLike;
    };

    // 해당 게시글 좋아요 상세 ID 조회
    findLikeOne = async (postId, id) => {
        const findOne = await this.postLikes.findOne({ $and : [{ postId : +postId }, { id : +id }, { deletedAt : null }] },
            {
                _id : false,
                id : true,
                postId : true,
                createdAt : true,
                users : {
                    userId : true,
                    nickname : true
                }
            }
        );

        return findOne;
    }

    // 게시글에 좋아요 생성
    likeCreate = async (count, user, postId) => {
        const create = await this.postLikes.create(
            {
                id : count,
                postId : postId,
                users : {
                    userId : user.id,
                    nickname : user.nickname
                }
            }
        );

        return create;
    };

    // 게시글 좋아요 삭제
    likeDelete = async (postId, id) => {
        const deleteLike = await this.postLikes.deleteOne({ $and : [{ postId : +postId }, { id : +id }] });

        return deleteLike;
    };

}