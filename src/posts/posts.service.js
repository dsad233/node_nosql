export class PostsService {
    constructor (postsRepository){
        this.postsRepository = postsRepository;
    }

    // 삭제 요청된 게시물 전체 조회[어드민만]
    findDeletedPost = async () => {
        const findDeleted = await this.postsRepository.findDeletedPost();

        if(findDeleted.length === 0){
            throw new Error("게시물이 존재하지 않습니다.");
        };

        return findDeleted;
    };

    // 게시물 생성
    createPost = async (title, context, user) => {
        let countId = 0;
        const allPost = await this.postsRepository.findPost();
        const maxId = allPost.map((data) => data.id);
        
        if(allPost && allPost.length === 0){
            countId = 1;
        } else {
            countId = Math.max(maxId[maxId.length - 1]) + 1;
        }

        const createPost = await this.postsRepository.createPost(countId, title, context, user);

        return createPost;
    };

    // 게시물 전체 조회
    findPostAll = async () => {
        const postFind = await this.postsRepository.findPost();

        if(postFind && postFind.length === 0){
            throw new Error("게시물이 존재하지 않습니다.");
        };

        return postFind;
    };

    // 게시글 상세 조회
    findPostOne = async (id) => {
        const postOne = await this.postsRepository.findById(id);

        if(postOne === null){
            throw new Error("게시물이 존재하지 않습니다.");
        };
        
        return postOne;
    };

    // 내가 작성한 게시글 조회
    findMyPost = async (userId) => {
        const myPost = await this.postsRepository.findById(userId);

        if(!myPost){
            throw new Error("게시물이 존재하지 않습니다.");
        };

        return myPost;
    };

    // 게시글 수정
    updatePost = async (id, title, context) => {
        const findId = await this.postsRepository.findById(id);

        if(!findId){
            throw new Error("게시물이 존재하지 않습니다.");
        };
        
        const postUpdate = await this.postsRepository.editPost(id, title, context);

        return postUpdate;
    };

    // 게시글 삭제
    deletePost = async (id) => {
        const findId = await this.postsRepository.findById(id);

        if(!findId){
            throw new Error("게시물이 존재하지 않습니다.");
        };

        const postDelete = await this.postsRepository.deletePost(id);

        return postDelete;
    };

    // 임시 게시글 삭제
    tbDeletePost = async (id) => {
        const tbDeleted = await this.postsRepository.tbDeletePost(id);
        
        if(!tbDeleted){
            throw new Error("게시물이 존재하지 않습니다.");
        };
        
        return tbDeleted;
    };
}