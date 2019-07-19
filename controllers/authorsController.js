const Author = require('../models/author');

exports.create = (req, res) => {
  Author.create(req.body.author)
    .then(() => res.status(202).send({success:"author was created"}))
    .catch(err => res.status(400).send(err));
}; 