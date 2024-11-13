import mongoose from "mongoose";

const postreplys = new mongoose.Schema({
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
    context : {
        type : String,
        require : false
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        default : new Date()
    },
    deletedAt : {
        type : Date,
        default : null
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
})

export default mongoose.model("postreplys", postreplys);