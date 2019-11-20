module.exports = (app) => {
    const promo = require('../controllers/promo.controller.js');

    // Create a new promo
    app.post('/admin/create_promo', promo.create);

    // Retrieve all promo
    app.get('/promo', promo.findAll);

    // Retrieve a single promo with promoId
    app.get('/promo/:promoId', promo.findOne);

    // Update a promo with promoId
    app.put('/admin/update_promo/:promoId', promo.update);

    // Delete a news with newsId
    app.delete('/admin/delete_promo/:promoId', promo.delete);
}