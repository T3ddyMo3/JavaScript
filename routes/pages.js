const router = require('express').Router();

//controller
const PagesController = require('../controllers/pagesController');
router.get('/', PagesController.show);
router.get('/about', PagesController.show);
router.get('/content', PagesController.show);

module.exports = router;