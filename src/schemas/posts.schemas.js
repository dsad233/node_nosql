import mongoose from "mongoose";

const posts = new mongoose.Schema({
    id : {
        type : Number,
        required: false,
        unique : false
    },
    title : {
        type : String,
        require : true,
        unique : false
    },
    content : {
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
            required : true
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

export default mongoose.model('posts', posts);