export class PostCommentReplyController {
    constructor(postCommentReplyService){
        this.postCommentReplyService = postCommentReplyService;
    }
    
    // 해당 게시글의 대댓글 전체 조회
    find = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;

            const data = await this.postCommentReplyService.find(postId, commentId);

            return res.status(200).json({ message : "해당 게시글의 대댓글 전체 조회를 완료하였습니다.", data : data });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 전체 조회에 실패하였습니다." });
        }
    };

    // 해당 게시글의 대댓글 상세 조회
    findOne = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;
            const { id } = req.params;

            const data = await this.postCommentReplyService.findOne(postId, commentId, id);

            return res.status(200).json({ message : "해당 게시글의 대댓글 상세 조회를 완료하였습니다.", data : data });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 상세 조회에 실패하였습니다." });
        }
    };

    // 삭제된 대댓글 리스트 전체 조회
    findDeleted = async (req, res) => {
        try {

            const deletedlist = await this.postCommentReplyService.findDeletedlist();

            return res.status(200).json({ message : "해당 게시글의 대댓글 삭제 리스트 목록 조회를 완료하였습니다.", data : deletedlist });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 삭제 리스트 목록 조회에 실패하였습니다." });
        }
    };

    // 대댓글 생성
    create = async (req, res) => {
        try {
            const user = req.user;
            const { postId } = req.params;
            const { commentId } = req.params;
            const { context } = req.body;

            if(!context){
                return res.status(400).json({ message : "대댓글 내용란이 누락되었습니다." });
            }

            if(context && context.length < 2){
                return res.status(400).json({ message : "대댓글 작성란을 2자 이상으로 작성해주세요." });
            }

            await this.postCommentReplyService.create(postId, commentId, context, user);

            return res.status(201).json({ message : "해당 게시글의 대댓글 생성을 완료하였습니다." });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 생성에 실패하였습니다." });
        }
    };


    // 대댓글 업데이트
    update = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;
            const { id } = req.params;
            const { context } = req.body;

            if(context && context.length < 2){
                return res.status(400).json({ message : "대댓글 작성란을 2자 이상으로 작성해주세요." });
            }

            await this.postCommentReplyService.update(postId, commentId, id, context);

            return res.status(201).json({ message : "해당 게시글의 대댓글 업데이트를 완료하였습니다." });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 업데이트에 실패하였습니다." });
        }
    };


    // 대댓글 삭제
    delete = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;
            const { id } = req.params;

            await this.postCommentReplyService.delete(postId, commentId, id);

            return res.status(201).json({ message : "해당 게시글의 대댓글 삭제를 완료하였습니다." });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 삭제에 실패하였습니다." });
        }
    };


    // 대댓글 임시 삭제 (softdelete)
    softdelete = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;
            const { id } = req.params;

            await this.postCommentReplyService.softdelete(postId, commentId, id);

            return res.status(201).json({ message : "해당 게시글의 대댓글 삭제를 완료하였습니다." });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 대댓글 삭제에 실패하였습니다." });
        }
    };
}