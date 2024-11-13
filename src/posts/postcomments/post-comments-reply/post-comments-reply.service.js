export class PostCommentReplyService {
    constructor(postCommentReplyRepository){
        this.postCommentReplyRepository = postCommentReplyRepository;
    }

    // 해당 게시글의 대댓글 전체 조회 
    find = async (postId, commentId) => {
        const findPost = await this.postCommentReplyRepository.findPostID(postId);

        if(!findPost){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findComment = await this.postCommentReplyRepository.findCommentID(postId, commentId);

        if(!findComment){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const getReply = await this.postCommentReplyRepository.find(postId, commentId);

        if(getReply && getReply.length === 0){
            throw new Error("대댓글 목록들이 존재하지 않습니다.");
        }

        return getReply;
    }

    // 해당 게시글의 대댓글 카운트
    findCount = async (postId, commentId) => {
        const findPost = await this.postCommentReplyRepository.findPostID(postId);

        if(!findPost){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findComment = await this.postCommentReplyRepository.findCommentID(postId, commentId);

        if(!findComment){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const findReply = await this.postCommentReplyRepository.find(postId, commentId);
        const length = findReply.length;
        
        return length;
    };

    // 해당 게시글의 대댓글 상세 조회
    findOne = async (postId, commentId, id) => {
        const getOne = await this.postCommentReplyRepository.findOne(postId, commentId, id);

        if(!getOne){
            throw new Error("대댓글 목록이 존재하지 않습니다.");
        }

        return getOne;
    };

    // 삭제된 대댓글 리스트 전체 조회
    findDeletedlist = async () => {
        const findDeleted = await this.postCommentReplyRepository.findDeletedList();

        if(findDeleted && findDeleted.length === 0){
            throw new Error("대댓글 삭제리스트 목록들이 존재하지 않습니다.");
        }

        return findDeleted;
    };

    // 대댓글 생성
    create = async (postId, commentId, context, user) => {
        let count = 0;
        const findPost = await this.postCommentReplyRepository.findPostID(postId);

        if(!findPost){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findComment = await this.postCommentReplyRepository.findCommentID(postId, commentId);

        if(!findComment){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const findSelect = await this.postCommentReplyRepository.findSelectID();
        const maxId = findSelect.map((data) => data.id);

        if(findSelect && findSelect.length === 0){
            count = 1;
        } else {
            count = Math.max(maxId[maxId.length - 1] + 1);
        }

        const create = await this.postCommentReplyRepository.create(count, postId, commentId, context, user);

        return create;
    }

    // 대댓글 업데이트
    update = async (postId, commentId, id, context) => {
        const findPost = await this.postCommentReplyRepository.findPostID(postId);

        if(!findPost){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findComment = await this.postCommentReplyRepository.findCommentID(postId, commentId);

        if(!findComment){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const update = await this.postCommentReplyRepository.update(postId, commentId, id, context);

        return update;
    };

    // 대댓글 삭제
    delete = async (postId, commentId, id) => {
        const findPost = await this.postCommentReplyRepository.findPostID(postId);

        if(!findPost){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findComment = await this.postCommentReplyRepository.findCommentID(postId, commentId);

        if(!findComment){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const deleteOne = await this.postCommentReplyRepository.delete(postId, commentId, id); 

        return deleteOne;
    };

    
    // 대댓글 임시 삭제 (softdelete)
    softdelete = async (postId, commentId, id) => {
        const findPost = await this.postCommentReplyRepository.findPostID(postId);

        if(!findPost){
            throw new Error("게시글 목록이 존재하지 않습니다.");
        }

        const findComment = await this.postCommentReplyRepository.findCommentID(postId, commentId);

        if(!findComment){
            throw new Error("게시글 댓글 목록이 존재하지 않습니다.");
        }

        const softdeleteOne = await this.postCommentReplyRepository.softdelete(postId, commentId, id);

        return softdeleteOne;
    };
}