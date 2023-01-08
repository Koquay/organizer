require('./categories.model');
require('../sites/sites.model');

var fetchFavicon = require('@meltwater/fetch-favicon').fetchFavicon
const Categories = require('mongoose').model('Categories');
const Sites = require('mongoose').model('Sites');

var mongoose = require('mongoose');

exports.getCategories = async (req, res) => {
    console.log('CategoriesService.getCategories')
    getAllCategories(req, res);
}

const getAllCategories = async (req, res) => {
    console.log('CategoriesService.getAllCategories')

    try {
        const categories = await Categories.find()
        .populate({
            path: 'sites.site',
            model: 'Sites'
        })
        .sort({name: 1});
        return res.status(200).json(categories);
    } catch(error) {
        return res.status(500).send('Error getting categories')    
    }
}

exports.addCategory = async (req, res) => {
    const {categoryName} = req.body;
    console.log('CategoriesService.categoryName', categoryName)

    try {

        const category = await Categories.findOne({name: categoryName});

        console.log('CATEGORY', category)

        if(category) {
            return res.status(422).send(`${categoryName} already exists.`)
        }

        const link = 'tab-' + categoryName.toLowerCase();

        await Categories.create({name: categoryName, link});

        getAllCategories(req, res);

    } catch(error) {
        console.error(error);
        return res.status(500).send('Error adding category.')    
    }
}

exports.deleteCategory = async (req, res) => {
    console.log('CategoriesService.deleteCategory')
    const {categoryId} = req.params;

    console.log('categoryId', categoryId)

    try {
        try {
            await Sites.deleteMany({categoryId});
        } catch(error) {
            // rollback sites delete
            console.log(error)
        }
        
         await Categories.deleteOne({_id: categoryId})

        getAllCategories(req, res);
    } catch(error) {
        console.error(error);
        // rollback sites and category delete
        return res.status(500).send('Error adding bookmark.')    
    }
}

exports.addSite = async (req, res) => {
    const {categoryId, siteUrl} = req.body;
    console.log('categoryId, siteUrl', categoryId, siteUrl)

    try {

        let  site = await Sites.findOne({url: siteUrl, categoryId});

        console.log('site', site)

        if(site) {
            return res.status(422).send(`${siteUrl} already exists.`)
        }

        let img = null;

        try {
            img = await fetchFavicon('https://' + siteUrl)
        } catch(error) {
            console.log('error', error)
            img = 'dummy.png';
        }
        

        console.log('img', img)

        site = await Sites.create({url: siteUrl, categoryId, img});
  
         const category = await Categories.findOneAndUpdate({
            _id: categoryId
        }, 
        {
            $addToSet: {
                sites: {site: site._id}
            }
        }, 
        {
            new: true
        }).populate({
            path: 'sites.site',
            model: 'Sites'
        })

        console.log('category', category)

        getAllCategories(req, res);

        // res.status(201).json(category);
    } catch(error) {
        //Rollback site
        console.error(error);
        return res.status(500).send('Error adding category.')    
    }
}

exports.addBookmark = async (req, res) => {
    const {categoryId, siteId, bookmarkLink, bookmarkTitle} = req.body;
    console.log('categoryId, siteId, bookmarkLink, bookmarkTitle', categoryId, siteId, 
        bookmarkLink, bookmarkTitle)

    try {
        const bookmark = {link: bookmarkLink, title: bookmarkTitle}

        const site = await Sites.findOneAndUpdate({
            _id: siteId,
            categoryId
        }, 
        {
            $addToSet: {
                bookmarks: bookmark
            }
        }, 
        {
            new: true
        })

         console.log('site', site)

         getAllCategories(req, res);

        // res.status(201).json(site);
    } catch(error) {
        console.error(error);
        return res.status(500).send('Error adding bookmark.')    
    }
}

exports.deleteBookmark = async (req, res) => {
    console.log('CategoriesController.deleteBookmark')
    const {categoryId, siteId, bookmarkId} = req.params;

    console.log('categoryId, siteId, bookmarkId', categoryId, siteId, bookmarkId)

    try {
         const site = await Sites.findOneAndUpdate({
            _id: siteId,
            categoryId
        }, 
        {
            $pull: {
                bookmarks: {
                    _id: bookmarkId
                }
            }
        },
        {
            new: true
        })

         console.log('site', site)

         getAllCategories(req, res);

        // res.status(201).json(site);
    } catch(error) {
        console.error(error);
        return res.status(500).send('Error adding bookmark.')    
    }
}