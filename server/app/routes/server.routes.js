const indexRoutes = require('../index/index.routes');
const categoriesRoutes = require('../categories/categories.routes');


module.exports = (app) => {
    app.use('/api/categories', categoriesRoutes)
    app.use('/*', indexRoutes);
}

