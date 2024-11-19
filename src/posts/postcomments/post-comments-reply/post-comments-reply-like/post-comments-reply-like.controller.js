export class PostCommentReplyLikeController {
    constructor (postCommentReplyLikeService) {
        this.postCommentReplyLikeService = postCommentReplyLikeService;
    }

    // 해당 게시글, 댓글의 대댓글 좋아요 전체 조회
    find = async (req, res) => {
        try {
            const { postId, commentId, replyId } = req.params;
            
            const findAll = await this.postCommentReplyLikeService.find(postId, commentId, replyId);

            return res.status(200).json({ message : "해당 게시글 댓글의 대댓글 좋아요 전체 조회를 완료하였습니다.", data : findAll });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글 댓글의 대댓글 좋아요 전체 조회에 실패하였습니다." });
        }
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 상세 조회
    findOne = async (req, res) => {
        try {
            const { postId, commentId, replyId, id } = req.params;
            
            const findOne = await this.postCommentReplyLikeService.findOne(id, postId, commentId, replyId);

            return res.status(200).json({ message : "해당 게시글 댓글의 대댓글 좋아요 상세 조회를 완료하였습니다.", data : findOne });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글 댓글의 대댓글 좋아요 상세 조회에 실패하였습니다." });
        }
    };

    // 해당 게시글, 댓글의 대댓글 좋아요 카운트 조회
    findCount = async (req, res) => {
        try {
            const { postId, commentId, replyId } = req.params;
            
            const findCount = await this.postCommentReplyLikeService.findCount(postId, commentId, replyId);

            return res.status(200).json({ message : "해당 게시글 댓글의 대댓글 좋아요 카운트 조회를 완료하였습니다.", count : findCount });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글 댓글의 대댓글 좋아요 카운트 조회에 실패하였습니다." });
        }
    };

     // 해당 게시글, 댓글의 대댓글 좋아요 생성
     create = async (req, res, next) => {
        try {
            const user = req.user;
            const { postId, commentId, replyId } = req.params;
            
            await this.postCommentReplyLikeService.create(postId, commentId, replyId, user);

            return res.status(201).json({ message : "해당 게시글 댓글의 대댓글 좋아요 정보를 반영 완료하였습니다." });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글 댓글의 대댓글 좋아요 정보 반영에 실패하였습니다." });
        }
    };
}