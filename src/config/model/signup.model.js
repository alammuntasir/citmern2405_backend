const { default: mongoose } = require("mongoose");

const signupSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: Number,

    },
    image: {
        type: String
    },
    role: {
        enum: ["user", "admin"],
        default: "user"
    }, 
    
    
}, {timestamps:true})