import mongoose from "mongoose";

const users = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        unique: false
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : false
    },
    nickname : {
        type : String,
        require : true,
        unique : true
    },
    provider : {
        type : String,
        require : false,
        default : null
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
},
{
    versionKey : false,
});


export default mongoose.model('users', users);