const mongoose = require('mongoose');

//our schema
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        requrie: true
    },
    content: {
        type: String
    },
    status: {
        type: String,
        enum:['DRAFT', 'PUBLISHED'],
        default:'DRAFT'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);