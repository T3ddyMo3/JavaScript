const Blog = require('../models/blog');


exports.index = (req, res) => {
  Blog.find()
    .published()
    .populate('author')
    .then(blogs => res.json(blogs))
    .catch(err => res.status(404).send(err));
};


exports.show = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

  Blog.findOne({
      _id: req.params.id,
    })
    .published()
    .then(blog => res.json(blog))
    .catch(err => res.status(401).send(err));
};

//old code
// exports.drafts = (req, res) => {
//   if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

//   Blog.find({
//       author: req.session.userId
//     }).drafts()
//     .then(drafts => {
//       res.render('blogs/index', {
//         blogs: drafts,
//         title: 'Drafts'
//       });
//     })
//     .catch(err => {
//       req.flash('error', `ERROR: ${err}`);
//       res.redirect('/blogs/new');
//     });
// };

//old code
// exports.published = (req, res) => {
//   if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

//   Blog.find({
//       author: req.session.userId
//     }).published()
//     .then(published => {
//       res.render('blogs/index', {
//         blogs: published,
//         title: 'Published'
//       });
//     })
//     .catch(err => {
//       req.flash('error', `ERROR: ${err}`);
//       res.redirect('/blogs/new');
//     });
// };

//old code
// exports.new = (req, res) => {
//   if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

//   res.render('blogs/new', {
//     title: `New Blog Post`
//   });
// };


exports.create = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

  // Add the current author to the blog
  req.body.blog.author = req.session.userId;

  Blog.create(req.body.blog)
    .then(() => res.status(201).send({success: "blog was made"}))
    .catch(err => res.status(400).send(err));
};


exports.edit = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

  Blog.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(blog => res.json(blog))
    .catch(err => res.status(404).send(err));
};


exports.update = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

  Blog.updateOne({
      _id: req.body.id,
      author: req.session.userId
    }, req.body.blog, {
      runValidators: true
    })
    .then(() => res.status(202).send({success: "your blog was successfuly updated"}))
    .catch(err => res.status(400).send(err));
};


exports.destroy = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({error: "sign in idget"});

  Blog.deleteOne({
      _id: req.body.id,
      author: req.session.userId
    })
    .then(() => res.status(202).send({success: "your blog was killed thanks."}))
    .catch(err => res.status(401).send(err));
};