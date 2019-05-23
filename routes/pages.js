const router = require('express').Router();

//controller
const PagesController = require('../controllers/pagesController');
router.get('/', PagesController.show);
router.get('/about', PagesController.show);
router.get('/contact', PagesController.show);

module.exports = router;