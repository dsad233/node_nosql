export class PostsController {
    constructor (postsService){
        this.postsService = postsService;
    }

    // 삭제 요청된 게시물 전체 조회[어드민만]
    findDeletedPost = async (req, res) => {
        try {
            const DeletedPostAll = await this.postsService.findDeletedPost();

            return res.status(200).json({ message : "삭제 요청된 게시물 전체조회에 성공하였습니다.", data : DeletedPostAll }); 
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "삭제 요청된 게시물 전체조회에 실패하였습니다." });
        }
    };


    // 게시물 생성
    postCreate = async (req, res, next) => {
        try {
            const user = req.user;
            const { title, context } = req.body;

            if(!title){
                return res.status(400).json({ message : "게시물 제목란이 누락되었습니다." });
            }

            if(!context){
                return res.status(400).json({ message : "게시물 내용란이 누락되었습니다." });
            }

            if(title && title.length < 2){
                return res.status(400).json({ message : "게시물 제목란을 2자 이상으로 작성해주세요." });ㄴ
            }
            
            if(context && context.length < 2){
                return res.status(400).json({ message : "게시물 내용란을 2자 이상으로 작성해주세요." });ㄴ
            }

            await this.postsService.createPost(title, context, user);

            return res.status(201).json({ message : "게시물 생성에 성공하였습니다." });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "게시물 생성에 실패하였습니다." });
        }
    };

    // 게시물 전체 조회
    find = async (req, res) => {
        try {
            const findAll = await this.postsService.findPostAll();

            return res.status(200).json({ message : "게시물 전체 조회에 성공하였습니다.", data : findAll });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "게시물 전체 조회에 실패하였습니다." });
        }
    };

    // 게시글 상세 조회
    findOne = async (req, res) => {
        try {
            const { id } = req.params;
            const findOne = await this.postsService.findPostOne(id);

            return res.status(200).json({ message : "게시물 상세 조회에 성공하였습니다.", data : findOne });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "게시물 상세 조회에 실패하였습니다." });
        }
    };

    // 내가 작성한 게시글 조회
    findMyPost = async (req, res) => {
        try {
            const userId = req.user.id;
            const myPost = await this.postsService.findMyPost(userId);

            return res.status(200).json({ message : "내가 작성한 게시물 조회에 성공하였습니다.", data : myPost });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "내가 작성한 게시물 조회에 실패하였습니다." });
        }
    };

    // 게시글 수정
    postUpdate = async (req, res, next) => {
        try {
            const user = req.user;
            const { id } = req.params;
            const { title, context } = req.body;

            if(!title){
                return res.status(400).json({ message : "게시물 제목란이 누락되었습니다." });
            }

            if(!context){
                return res.status(400).json({ message : "게시물 내용란이 누락되었습니다." });
            }

            if(title && title.length < 2){
                return res.status(400).json({ message : "게시물 제목란을 2자 이상으로 작성해주세요." });
            }
            
            if(context && context.length < 2){
                return res.status(400).json({ message : "게시물 내용란을 2자 이상으로 작성해주세요." });
            }

            await this.postsService.updatePost(id, title, context, user);

            return res.status(201).json({ message : "게시물 수정에 성공하였습니다." });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "게시물 수정에 실패하였습니다." });
        }
    };

    // 게시글 삭제
    postDelete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.postsService.deletePost(id);

            return res.status(201).json({ message : "게시물 삭제에 성공하였습니다." });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "게시물 삭제에 실패하였습니다." });
        }
    };
    
    // 임시 게시글 삭제
    tbDeletePost = async (req, res, next) => {
        try {
            const { id } = req.params;

            await this.postsService.tbDeletePost(id);
            
            return res.status(201).json({ message : "게시물 삭제에 성공하였습니다." });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message : "게시물 삭제에 실패하였습니다." });
        }
    };

}