
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        require: true,
    },
    intro: {
        type: String,
        require: true,
    }

}, { timestamps: true })

const blog = mongoose.model('blog', blogSchema)
module.exports = blog;
