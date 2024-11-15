export class PostCommentService {
    constructor(postCommentRepository){
        this.postCommentRepository = postCommentRepository;
    }

    // 댓글 생성
    addComment = async (user, postId, context) => {
        const findComments = await this.postCommentRepository.findAll();

        const maxId = findComments.map((data) => data.id);
        let count = 0;
        const findPostId = await this.postCommentRepository.findPostId(postId);

        if(!findPostId){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        if(findComments && findComments.length === 0){
            count = 1;
        } else {
            count = Math.max(maxId[maxId.length - 1]) + 1;
        }


        const create = await this.postCommentRepository.createComment(user, postId, count, context);

        return create;
    };

    
    // 댓글 전체 조회
    findAll = async (postId) => {
        const findPostId = await this.postCommentRepository.findPostId(postId);

        if(!findPostId){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const allComments = await this.postCommentRepository.findAllComment(postId);

        if(allComments && allComments.length === 0){
            throw new Error("게시글에 댓글이 존재하지 않습니다.");
        }

        return { findPostId, allComments };
    };

    // 해당 게시글의 댓글 목록 전체 조회
    findCommentAll = async (postId) => {
        const findComment = await this.postCommentRepository.findAllComment(postId);

        if(findComment && findComment.length === 0){
            throw new Error("해당 게시글 댓글 목록들이 존재하지 않습니다.");
        }

        return findComment;
    };

    // 임시 댓글 삭제 목록 전체 조회 [어드민만]
    findDeletedList = async () => {
        const Deleted = await this.postCommentRepository.findDeleteList();

        if(Deleted && Deleted.length === 0){
            throw new Error("게시글 댓글 삭제 리스트 목록들이 존재하지 않습니다.");
        }

        return Deleted;
    };


    // 유저가 작성한 댓글 게시글 총 목록 조회
    findUserAllComment = async (user) => {
        let newArray = [];
        const findComment = await this.postCommentRepository.findUserCommentAll(user);

        if(findComment && findComment.length === 0){
            throw new Error("게시글 댓글 목록들이 존재하지 않습니다.");
        }

        const findPostAll = await this.postCommentRepository.findPostAll();

        if(findPostAll && findPostAll.length === 0){
            throw new Error("게시글 목록들이 존재하지 않습니다.");
        }

        for(let i = 0; i < findComment.length; i++){
            for(let j = 0; j < findPostAll.length; j++){
                if(findComment[i].postId === findPostAll[j].id){
                    if (!newArray.some(post => post.id === findPostAll[j].id)) {
                        newArray.push(findPostAll[j]);
                    }
                }
            }
        }

        return newArray;
    };

    // 해당 게시글의 댓글 갯수 카운트 조회
    findCommentAllCount = async (postId) => {
        const allComments = await this.postCommentRepository.findAllComment(postId);

        if(allComments && allComments.length === 0){
            throw new Error("해당 게시글 댓글 목록들이 존재하지 않습니다.");
        }

        const length = allComments.length;

        return length;
    };

    // 댓글 상세 조회
    findOne = async (postId, id) => {
        const findPostId = await this.postCommentRepository.findPostId(postId);

        if(!findPostId){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const oneComment = await this.postCommentRepository.findOneComment(postId, id);

        if(!oneComment){
            throw new Error("조회하시는 댓글이 존재하지 않습니다.");
        }

        return oneComment;
    };


    // 댓글 수정
    updateComment = async (postId, id, context) => {
        const findPostId = await this.postCommentRepository.findPostId(postId);

        if(!findPostId){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const findId = await this.postCommentRepository.findById(id);

        if(!findId){
            throw new Error("조회하시는 댓글이 존재하지 않습니다.");
        }

        const update = await this.postCommentRepository.editComment(postId, id, context);
        
        return update;
    };

    // 댓글 삭제
    deleteComment = async (postId, id) => {
        const findPostId = await this.postCommentRepository.findPostId(postId);

        if(!findPostId){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const findId = await this.postCommentRepository.findById(id);

        if(!findId){
            throw new Error("조회하시는 댓글이 존재하지 않습니다.");
        }

        const delComment = await this.postCommentRepository.deleteComment(postId, id);

        return delComment;
    };

    // 임시 댓글 삭제
    tbdeleteComment = async (postId, id) => {
        const findPostId = await this.postCommentRepository.findPostId(postId);

        if(!findPostId){
            throw new Error("게시글이 존재하지 않습니다.");
        }

        const findId = await this.postCommentRepository.findById(id);

        if(!findId){
            throw new Error("조회하시는 댓글이 존재하지 않습니다.");
        } 

        const tbdelete = await this.postCommentRepository.tbCommentdelete(postId, id);

        return tbdelete;
    };
}