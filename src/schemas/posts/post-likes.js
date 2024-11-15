import mongoose from "mongoose";

const postLikes = new mongoose.Schema({
    id : {
        type : Number,
        unique : false
    },
    postId : {
        type : Number,
        ref : 'posts',
        require : true
    },
    // likeCount : {
    //     type : Number,
    //     default : 0
    // },
    createdAt : {
        type : Date,
        default : Date.now()  
    },
    users : {
        userId : {
            type : Number,
            ref : 'users',
            require : true
        },
        nickname : {
            type : String,
            ref : 'users',
            require : true
        }
    }
},
{
    versionKey : false
});


export default mongoose.model('postlikes', postLikes);