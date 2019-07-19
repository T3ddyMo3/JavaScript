const express = require('express');
const app = express();

// import our routes
const blogsRoutes = require('./routes/blogs');
const authorsRoutes = require('./routes/authors');
const sessionsRoutes = require('./routes/sessions');


app.use ('/blogs', blogsRoutes);
app.use('/authors', authorsRoutes);
app.use('/', sessionsRoutes);

//export the changes
module.exports = app;