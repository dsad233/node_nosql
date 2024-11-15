export class PostLikeController {
    constructor(postLikeService){
        this.postLikeService = postLikeService;
    }

    // 게시글 좋아요 생성
    create = async (req, res, next) => {
        try {
            const user = req.user;
            const { postId } = req.params;

            await this.postLikeService.create(user, postId);

            return res.status(201).json({ message : "정상적으로 좋아요 정보가 적용되었습니다." });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "서버 오류가 발생하였습니다." });
        }
    };

    // 해당 게시글 좋아요수 전체 count 조회
    findPostLikeCount = async (req, res) => {
        try{
            const { postId } = req.params;

            const postLikedCount = await this.postLikeService.findPostLikeLength(postId);

            return res.status(201).json({ message : "정상적으로 게시글 좋아요 카운트가 되었습니다.", data : postLikedCount });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "서버 오류가 발생하였습니다." });
        }
    };

    // 해당 게시글 좋아요수 전체 count 조회
    findLikeCount = async (req, res) => {
        try{
            const { postId } = req.params;

            const likedCount = await this.postLikeService.findLikeLength(postId);

            return res.status(201).json({ message : "정상적으로 좋아요가 카운트 되었습니다.", count : likedCount });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "서버 오류가 발생하였습니다." });
        }
    };

    // 해당 게시글 좋아요를 누른 유저들 전체 조회
    findLikeUser = async (req, res) => {
        try{
            const { postId } = req.params;

            const likedAllUser = await this.postLikeService.findLike(postId);

            return res.status(201).json({ message : "정상적으로 좋아요가 카운트 되었습니다.", data : likedAllUser });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "서버 오류가 발생하였습니다." });
        }
    };


    // 유저가 누른 게시글 좋아요 총 목록 조회
    findUserLikedAll = async (req, res) => {
        try{
            const user = req.user;
            const userPostLiked = await this.postLikeService.findUserAllLiked(user);

            return res.status(201).json({ message : "정상적으로 좋아요 총 목록 조회가 되었습니다.", data : userPostLiked });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "서버 오류가 발생하였습니다." });
        }
    };

    // 해당 게시글 좋아요 상세 조회
    findOne = async (req, res) => {
        try{
            const { postId } = req.params;
            const { likeId } = req.params;

            const likedOne = await this.postLikeService.findOneLike(postId, likeId);

            return res.status(201).json({ message : "정상적으로 좋아요 상세 조회 되었습니다.", data : likedOne });
        } catch (error){
            console.log(error);
            return res.status(500).json({ message : "서버 오류가 발생하였습니다." });
        }
    };
}