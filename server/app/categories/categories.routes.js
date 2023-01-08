const router = require('express').Router();
const categoriesController = require('./categories.controller');


router.get('/', categoriesController.getCategories)
router.post('/', categoriesController.addCategory)
router.post('/site', categoriesController.addSite)
router.post('/site/bookmark', categoriesController.addBookmark);
router.delete('/:categoryId/:siteId/:bookmarkId', categoriesController.deleteBookmark);
router.delete('/:categoryId', categoriesController.deleteCategory);


module.exports = router;