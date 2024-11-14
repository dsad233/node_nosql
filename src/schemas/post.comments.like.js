import mongoose from "mongoose";


const postcommentlike = new mongoose.Schema({
    id : {
        type : Number, 
        unique : false
    },
    postId : {
        type : Number,
        ref : 'posts',
        require : true
    },
    postcommentId : {
        type : Number,
        ref : 'postcomments',
        require : true
    },
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


export default mongoose.model('postcommentlike', postcommentlike);