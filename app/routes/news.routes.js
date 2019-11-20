module.exports = (app) => {
    const news = require('../controllers/news.controller.js');

    // Create a new news
    app.post('/admin/create_news', news.create);

    // Retrieve all newss
    app.get('/news', news.findAll);

    // Retrieve a single news with newsId
    app.get('/news/:newsId', news.findOne);

    // Update a news with newsId
    app.put('/admin/update_news/:newsId', news.update);

    // Delete a news with newsId
    app.delete('/admin/delete_news/:newsId', news.delete);
}