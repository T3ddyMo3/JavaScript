const Blog = require('../models/blog');

exports.index = ( req,res ) => {
    Blog.find()
    .then(blogs => {
        res.render('blogs/index', {
            blogs: blogs,
            title: 'Archive'
        });
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
};

exports.show = ( req,res ) => {
    Blog.findById(req.params.id)
    .then(blog => {
        res.render('blogs/show',{
            blog: blog,
            title: blog.title
        });
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
};

exports.published = ( req,res ) => {};

exports.new = ( req,res ) => {};

exports.drafts = ( req,res ) => {};

exports.create = ( req,res ) => {
 Blog.create(req.body.blog)
 .then(() => {
    res.redirect('/blogs');
 })
 .catch(err => {
     console.error(`Error: ${err}`);
 });
};

exports.edit = ( req,res ) => {
    Blog.findById(req.params.id)
    .then(blog => {
        res.render('blogs/edit',{
            blog: blog,
            title: blog.title
        });
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
};

exports.update = ( req,res ) => {
    Blog.updateOne({
        _id: req.body.id
    },req.body.blog, {
        runValidators: true
    })
    .then(()=> {
        res.redirect(`/blogs/${req.body.id}`);
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};

exports.new = ( req,res ) => {
    res.render('blogs/new', {
        title: 'New Blog Post'
    });
};

exports.destroy = ( req,res ) => {
    Blog.deleteOne({
        _id: req.body.id
    })
    .then(() => {
        res.redirect('/blogs');
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};
