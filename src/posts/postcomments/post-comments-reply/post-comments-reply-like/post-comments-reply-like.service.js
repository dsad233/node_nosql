export class PostCommentReplyLikeService {
    constructor (postCommentReplyLikeRepository) {
        this.postCommentReplyLikeRepository = postCommentReplyLikeRepository;
    }

    // 해당 게시글, 댓글의 대댓글 좋아요 전체 조회
    find = async (postId, commentId, replyId) => {
        const findPostID = await this.postCommentReplyLikeRepository.findPostID(postId);

        if(!findPostID){
            throw new Error("해당 게시글이 존재하지 않습니다.");
        }


        const findCommentID = await this.postCommentReplyLikeRepository.findCommentID(postId, commentId);

        if(!findCommentID){
            throw new Error("해당 게시글의 댓글이 존재하지 않습니다.");
        }


        const findReplyID = await this.postCommentReplyLikeRepository.findReplyID(postId, commentId, replyId);

        if(!findReplyID){
            throw new Error("해당 게시글의 대댓글이 존재하지 않습니다.");
        }


        const find = await this.postCommentReplyLikeRepository.find(postId, commentId, replyId);

        if(find && find.length === 0){
            throw new Error("해당 게시글 댓글의 대댓글 좋아요 목록들이 존재하지 않습니다.")
        }

        return find;
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 상세 조회
    findOne = async (id, postId, commentId, replyId) => {
        const findPostID = await this.postCommentReplyLikeRepository.findPostID(postId);

        if(!findPostID){
            throw new Error("해당 게시글이 존재하지 않습니다.");
        }

        const findCommentID = await this.postCommentReplyLikeRepository.findCommentID(postId, commentId);

        if(!findCommentID){
            throw new Error("해당 게시글의 댓글이 존재하지 않습니다.");
        }

        const findReplyID = await this.postCommentReplyLikeRepository.findReplyID(postId, commentId, replyId);

        if(!findReplyID){
            throw new Error("해당 게시글의 대댓글이 존재하지 않습니다.");
        }

        const findOne = await this.postCommentReplyLikeRepository.findOne(id, postId, commentId, replyId);

        if(!findOne){
            throw new Error("해당 게시글 댓글의 대댓글 좋아요 목록이 존재하지 않습니다.");
        }

        return findOne;
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 카운트 조회
    findCount = async (postId, commentId, replyId) => {
        const findPostID = await this.postCommentReplyLikeRepository.findPostID(postId);

        if(!findPostID){
            throw new Error("해당 게시글이 존재하지 않습니다.");
        }

        const findCommentID = await this.postCommentReplyLikeRepository.findCommentID(postId, commentId);

        if(!findCommentID){
            throw new Error("해당 게시글의 댓글이 존재하지 않습니다.");
        }

        const findReplyID = await this.postCommentReplyLikeRepository.findReplyID(postId, commentId, replyId);

        if(!findReplyID){
            throw new Error("해당 게시글의 대댓글이 존재하지 않습니다.");
        }

        const findAll = await this.postCommentReplyLikeRepository.find(postId, commentId, replyId);

        if(findAll && findAll.length === 0){
            throw new Error("해당 게시글 댓글의 대댓글 좋아요 목록들이 존재하지 않습니다.")
        }

        const length = findAll.length;

        return length;
    };
    

    // 해당 게시글, 댓글의 대댓글 좋아요 생성
    create = async (postId, commentId, replyId, user) => {
        let count = 0;
        const findPostID = await this.postCommentReplyLikeRepository.findPostID(postId);

        if(!findPostID){
            throw new Error("해당 게시글이 존재하지 않습니다.");
        }

        const findCommentID = await this.postCommentReplyLikeRepository.findCommentID(postId, commentId);

        if(!findCommentID){
            throw new Error("해당 게시글의 댓글이 존재하지 않습니다.");
        }

        const findReplyID = await this.postCommentReplyLikeRepository.findReplyID(postId, commentId, replyId);

        if(!findReplyID){
            throw new Error("해당 게시글의 대댓글이 존재하지 않습니다.");
        }

        const findReplyLikeAll = await this.postCommentReplyLikeRepository.findSelectID();
        const maxId = findReplyLikeAll.map((data) => data.id);

        if(findReplyLikeAll && findReplyLikeAll.length === 0){
            count = 1;
        } else {
            count = Math.max(maxId[maxId.length - 1] + 1);
        }

        const findUserLikeOne = await this.postCommentReplyLikeRepository.findReplyUserLike(postId, commentId, replyId, user);

        if(!findUserLikeOne){
            const likeCreate = await this.postCommentReplyLikeRepository.create(count, postId, commentId, replyId, user);
            return likeCreate;
        } else {
            const likeDelete = await this.postCommentReplyLikeRepository.delete(findUserLikeOne.id, postId, commentId, replyId);
            return likeDelete;
        }
    };
} 