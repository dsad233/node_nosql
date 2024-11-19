export class PostCommentController {
    constructor (postCommentService) {
        this.postCommentService = postCommentService;
    }

    // 댓글 생성
    create = async (req, res, next) => {
        try {
            const user = req.user;
            const { postId } = req.params;

            const { context } = req.body;

            if(!context){
                return res.status(400).json({ message : "댓글 내용란이 누락되었습니다." });
            }

            if(context && context.length < 2){
                return res.status(400).json({ message : "댓글 작성란을 2자 이상으로 작성해주세요." });
            }

            const addComment = await this.postCommentService.addComment(user, postId, context);

            return res.status(201).json({ message : "댓글이 정상적으로 생성되었습니다.", data : addComment });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 생성에 오류가 발생하였습니다." });
        }
    };

    // 댓글 전체 조회
    find = async (req, res) => {
        try {
            const{ postId } = req.params;
            const find = await this.postCommentService.findAll(postId);

            return res.status(200).json({ message : "댓글 전체 조회가 완료되었습니다.", data : find }); 
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 전체 조회에 오류가 발생하였습니다." });
        }
    };

    // 해당 게시글의 댓글 목록 전체 조회
    findCommentAll = async (req, res) => {
        try {
            const { postId } = req.params;
            const findCommentAll = await this.postCommentService.findCommentAll(postId);

            return res.status(200).json({ message : "해당 게시글의 댓글 전체 조회가 완료되었습니다.", data : findCommentAll }); 
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "해당 게시글의 댓글 전체 조회가 실패하였습니다." });
        }
    };

    // 댓글 삭제리스트 전체 조회 [어드민만]
    findDeleted = async (req, res) => {
        try {
            const findDeleted = await this.postCommentService.findDeletedList();

            return res.status(200).json({ message : "댓글 삭제리스트 전체 조회가 완료되었습니다.", data : findDeleted }); 
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 삭제리스트 전체 조회에 오류가 발생하였습니다." });
        }
    };

    // 유저가 작성한 댓글 게시글 총 목록 조회
    findUserAllComment = async (req, res) => {
        try{
            const user = req.user;

            const findAllComment = await this.postCommentService.findUserAllComment(user);

            return res.status(200).json({ message : "유저가 작성한 댓글에 대한 게시글 전체 조회가 완료되었습니다.", data : findAllComment });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "유저가 작성한 댓글에 대한 게시글 전체 조회에 오류가 발생하였습니다." });
        }
    };

    // 유저가 작성한 댓글 게시글 총 목록 조회
    findCommentAllCount = async (req, res) => {
        try{
            const { postId } = req.params;

            const commentAllCount = await this.postCommentService.findCommentAllCount(postId);

            return res.status(200).json({ message : "해당 게시글에 대한 댓글 카운트 조회가 완료되었습니다.", count : commentAllCount });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글에 대한 댓글 카운트 조회가 실패하였습니다." });
        }
    };
    
    // 댓글 상세 조회
    findOne = async (req, res) => {
        try {
            const { postId, id } = req.params;

            const findOne = await this.postCommentService.findOne(postId, id);
            return res.status(200).json({ message : "댓글 상세 조회가 완료되었습니다.", data : findOne });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 상세 조회에 오류가 발생하였습니다." }); 
        }
    };

    // 댓글 수정
    update = async (req, res, next) => {
        try {
            const { postId, id } = req.params;
            const { context } = req.body;

            if(!context){
                return res.status(400).json({ message : "댓글 작성란이 누락되었습니다." });
            }

            if(context && context.length < 2){
                return res.status(400).json({ message : "댓글 작성란을 2자 이상으로 작성해주세요." });
            }
            await this.postCommentService.updateComment(postId, id, context);

            return res.status(201).json({ message : "댓글이 정상적으로 수정 완료되었습니다." });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 수정에 오류가 발생하였습니다." });
        }
    };

    // 댓글 삭제
    delete = async (req, res, next) => {
        try {
            const { postId, id } = req.params;

            await this.postCommentService.deleteComment(postId, id);

            return res.status(201).json({ message : "댓글이 정상적으로 삭제 완료되었습니다." });
        } catch(error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 삭제에 오류가 발생하였습니다." });
        }
    };

    // 임시 댓글 삭제
    tbdelete = async (req, res, next) => {
        try {
            const { postId, id } = req.params;

            await this.postCommentService.tbdeleteComment(postId, id);

            return res.status(201).json({ message : "댓글이 정상적으로 삭제 완료되었습니다." });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message : "댓글 삭제에 오류가 발생하였습니다." });
        }
    };
}