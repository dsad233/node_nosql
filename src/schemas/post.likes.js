import mongoose from "mongoose";

const postLikes = new mongoose.Schema({
    id : {
        type : Number,
        require : true
    },
    likeCount : {
        type : Number,
        default : 0
    },
    posts : {
        postId : {
            type : Number,
            ref : 'posts',
            require : true
        },
        content : {
            type : String,
            ref : 'posts',
            require : true
        }, 
        createdAt : {
            type : Date,
            ref : 'posts',
            require : true
        }
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