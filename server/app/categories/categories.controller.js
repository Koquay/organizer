const categoriesService = require('./categories.service');

exports.getCategories = (req, res) => {
    console.log('CategoriesController.getCategories')
    categoriesService.getCategories(req, res);
}

exports.addCategory = (req, res) => {
    console.log('CategoriesController.addCategory')
    categoriesService.addCategory(req, res);
}

exports.deleteCategory = (req, res) => {
    console.log('CategoriesController.deleteCategory')
    categoriesService.deleteCategory(req, res);
}

exports.addSite = (req, res) => {
    console.log('CategoriesController.addSite')
    categoriesService.addSite(req, res);
}


exports.addBookmark = (req, res) => {
    console.log('CategoriesController.addBookmark')
    categoriesService.addBookmark(req, res);
}

exports.deleteBookmark = (req, res) => {
    console.log('CategoriesController.deleteBookmark')
    categoriesService.deleteBookmark(req, res);
}