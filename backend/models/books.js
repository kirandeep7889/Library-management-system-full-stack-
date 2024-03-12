const mongoose = require("mongoose");

const bookSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    available: {
        type: Boolean,
        default: true
    }
})

const Book=mongoose.model("Book",bookSchema);

module.exports=Book