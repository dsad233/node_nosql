export class PostCommentLikeService {
    constructor(postCommentLikeRepository){
        this.postCommentLikeRepository = postCommentLikeRepository;
    }

    // 댓글 좋아요 목록 전체 조회
    find = async (postId, commentId) => {
        const findPostOne = await this.postCommentLikeRepository.findPostID(postId);

        if(!findPostOne){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findCommentOne = await this.postCommentLikeRepository.findCommentID(postId, commentId);
        
        if(!findCommentOne){ 
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }


        const find = await this.postCommentLikeRepository.find(postId, commentId);

        if(find && find.length === 0){
            throw new Error("게시글 댓글 좋아요 목록들이 존재하지 않습니다.");
        }
        
        return find;
    };

    // 댓글 좋아요 카운트 조회
    findCount = async (postId, commentId) => {
        const findPostOne = await this.postCommentLikeRepository.findPostID(postId);

        if(!findPostOne){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findCommentOne = await this.postCommentLikeRepository.findCommentID(postId, commentId);

        if(!findCommentOne){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }
        
        const find = await this.postCommentLikeRepository.find(postId, commentId);

        if(find && find.length === 0){
            throw new Error("게시글 댓글 좋아요 목록들이 존재하지 않습니다.");
        }

        const length = find.length;

        return length;
    };

    // 댓글 좋아요 목록 상세 조회
    findOne = async (postId, commentId, id) => {
        const findPostOne = await this.postCommentLikeRepository.findPostID(postId);

        if(!findPostOne){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findCommentOne = await this.postCommentLikeRepository.findCommentID(postId, commentId);

        if(!findCommentOne){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const findOne = await this.postCommentLikeRepository.findOne(postId, commentId, id);

        if(!findOne){
            throw new Error("게시글 댓글 좋아요 목록이 존재하지 않습니다.");
        }

        return findOne;
    };

    // 댓글 좋아요 생성
    create = async (postId, commentId, user) => {
        let count = 0;
        const findPostOne = await this.postCommentLikeRepository.findPostID(postId);

        if(!findPostOne){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findCommentOne = await this.postCommentLikeRepository.findCommentID(postId, commentId);

        if(!findCommentOne){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }
        
        const alreadyData = await this.postCommentLikeRepository.findUserCommentLike(postId, commentId, user);
        
        const findLikeAll = await this.postCommentLikeRepository.findSelectID();
        const maxId = findLikeAll.map((data) => data.id);
        
        
        if (findLikeAll && findLikeAll.length === 0){
            count = 1;
        } else {
            count = Math.max(maxId[maxId.length - 1] + 1);
        }
        
        if(!alreadyData){
            const createData = await this.postCommentLikeRepository.create(count, postId, commentId, user);
    
            return createData;
        } else {
            const deleteData = await this.postCommentLikeRepository.delete(postId, commentId, alreadyData.id);

            return deleteData;
        }
    };
}