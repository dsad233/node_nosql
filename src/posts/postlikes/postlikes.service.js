export class PostLikeService {
    constructor(postLikeRepository){
        this.postLikeRepository = postLikeRepository;
    }

    // 해당 게시글 좋아요 전체 조회
    findLike = async (postId) => {
        const find = await this.postLikeRepository.findLikeAll(postId);

        if(find && find.length === 0){
            throw new Error("게시글들이 존재하지 않습니다.");
        }

        return find;
    };

    // 해당 게시글 좋아요 전체 조회 (length)
    findPostLikeLength = async (postId) => {
        const findPost = await this.postLikeRepository.findPostOne(postId);

        if(findPost == null){
            throw new Error("게시글이 존재하지 않습니다.");
        }
        
        const find = await this.postLikeRepository.findLikeAll(postId);
        const liked = find.length;

        return { findPost, liked };
    };

    // 해당 게시글 좋아요 count 수만 조회
    findLikeLength = async (postId) => {
        const findCount = await this.postLikeRepository.findLikeAll(postId);

        if(findCount && findCount.length === 0){
            throw new Error("게시글 좋아요들이 존재하지 않습니다.");
        }

        const lengtCount = findCount.length;

        return lengtCount
    };

    
    // 유저가 누른 좋아요 Post 목록들 전체 조회
    findUserAllLiked = async (user) => {
        let newArray = [];

        const findPostLiked = await this.postLikeRepository.findUserPostLikedAll(user);

        if(findPostLiked && findPostLiked.length === 0){
            throw new Error("유저가 누른 좋아요 목록들이 존재하지 않습니다.");
        }
        
        const findPost = await this.postLikeRepository.findPostAll();

        if(findPost && findPost.length === 0){
            throw new Error("게시글들이 존재하지 않습니다.");
        }
        
        for(let i = 0; i < findPostLiked.length; i++){
            for(let j = 0; j < findPost.length; j++){
                if(findPostLiked[i].postId === findPost[j].id){
                    newArray.push(findPost[j]);
                }
            }
        }

        return newArray;
    };

    // 해당 게시글 좋아요 상세 ID 조회
    findOneLike = async (postId, id) => {
        const findPost = await this.postLikeRepository.findPostOne(postId);

        if(!findPost){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const findOne = await this.postLikeRepository.findLikeOne(postId, id);

        if(!findOne){
            throw new Error("게시글 좋아요가 존재하지 않습니다.");
        }

        return findOne;
    };

    // 게시글 좋아요 생성 및 좋아요 삭제
    create = async (user, postId) => {
        let count = 0;
        const findPost = await this.postLikeRepository.findPostOne(postId);

        if(!findPost){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const findLikeOne = await this.postLikeRepository.findUserLikeOne(user, postId);

        const findLikeAll = await this.postLikeRepository.findLikeIdAll();
        const maxId = findLikeAll.map((data) => data.id);

        if(findLikeAll && findLikeAll.length === 0){
            count = 1;
        } else {
            count = Math.max(maxId[maxId.length - 1] + 1);
        }

        if(!findLikeOne){
            const createPostLike = await this.postLikeRepository.likeCreate(count, user, postId);
            return createPostLike;
        } else {
            // 이미 유저가 좋아요를 누른 경우, 좋아요를 삭제
            const deletePostLike = await this.postLikeRepository.likeDelete(postId, findLikeOne.id);
            return deletePostLike;
        }
    };
}