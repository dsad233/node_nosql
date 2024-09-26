import mongoose from "mongoose";

const postcomments = new mongoose.Schema({
    id : {
        type : Number,
        require : true
    },
    content : {
        type : String,
        require : true
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
    posts : {
        postId : {
            type : Number,
            ref : 'posts',
            require : true
        },
        title : {
            type : String,
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
        },
        users : {
            userId : {
                type : Number,
                ref : 'users',
                require : true,
            },
            nickname : {
                type : String,
                ref : 'users',
                require : true
            }
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


export default mongoose.model('postcomments', postcomments);