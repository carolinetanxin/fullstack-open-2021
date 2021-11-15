const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    title: { type: String, require: true },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)
