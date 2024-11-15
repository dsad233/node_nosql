import mongoose from "mongoose";

const posts = new mongoose.Schema({
    id : {
        type : Number,
        unique : false
    },
    title : {
        type : String,
        require : true,
        unique : false
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
        },
    }
},
{
    versionKey : false
});

export default mongoose.model('posts', posts);