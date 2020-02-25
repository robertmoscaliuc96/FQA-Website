const mongoose= require("mongoose");
const Schema = mongoose.Schema


const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    text:{
        type: String,
        required: true,
    },
    name : {
        type: String,    
    },
    avatar:{
        type: String
    },
    data: {
        type: Date,
        default: Date.now
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            text:{
                type: String,
                required: true,
            },
            name : {
                type: String,    
            },
            avatar:{
                type: String
            },
            data: {
                type: Date,
                default: Date.now
            },
        }
    ]
});

module.exports = User = mongoose.model("user", PostSchema);