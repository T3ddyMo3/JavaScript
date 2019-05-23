exports.show = (req, res) => {
    // check if our path is the root or a page
    const path = (req.path === '/') ? `/home` : req.path;

    //render that path
    res.render(`pages${path}`); //VIEWS/PAGES/ABOUT

};