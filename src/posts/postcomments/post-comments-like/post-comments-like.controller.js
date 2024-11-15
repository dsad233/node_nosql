export class PostCommentLikeController {
    constructor(postCommentLikeService) {
        this.postCommentLikeService = postCommentLikeService;
    }

    // 해당 게시글의 댓글 좋아요 목록 전체 조회
    find = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;

            const data = await this.postCommentLikeService.find(postId, commentId);
            return res.status(200).json({ message : "해당 게시글의 좋아요 전체 조회가 완료되었습니다.", data : data }); 
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 좋아요 전체 조회에 실패하였습니다." });
        }
    };

    // 해당 게시글의 댓글 좋아요 카운트 조회
    findCount = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;

            const count = await this.postCommentLikeService.findCount(postId, commentId);

            return res.status(200).json({ message : "해당 게시글의 좋아요 카운트 조회가 완료되었습니다.", count : count });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 좋아요 카운트 조회에 실패하였습니다." });
        }
    };

    
    // 해당 게시글의 댓글 좋아요 목록 상세 조회
    findOne = async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentId } = req.params;
            const { id } = req.params;

            const data = await this.postCommentLikeService.findOne(postId, commentId, id);

            return res.status(200).json({ message : "해당 게시글의 좋아요 상세 조회가 완료되었습니다.", data : data });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 좋아요 상세 조회에 실패하였습니다." });
        }
    };

    
    // 해당 게시글의 댓글 좋아요 생성
    create = async (req, res, next) => {
        try {
            const user = req.user;
            const { postId } = req.params;
            const { commentId } = req.params;

            await this.postCommentLikeService.create(postId, commentId, user);

            return res.status(200).json({ message : "해당 게시글의 좋아요 정보가 반영 완료되었습니다." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message : "해당 게시글의 좋아요 생성이 실패하였습니다." });
        }
    }
}