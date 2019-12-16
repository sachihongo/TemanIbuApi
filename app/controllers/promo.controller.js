const Promo = require('../models/promo.model.js');

// Create and Save a new promo
exports.create = (req, res) => {
    // Validate request
    if(!req.body.deskripsi) {
        return res.status(400).send({
            message: "promo content can not be empty"
        });
    }

    // Create a promo
    const promo = new Promo({
        judul: req.body.judul || "Untitled promo",
        link_gambar: req.body.link_gambar,
        deskripsi: req.body.deskripsi,
        kode_promo: req.body.kode_promo,
        diskon: req.body.diskon
    });

    // Save promo in the database
    promo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the promo."
        });
    });
};

// Retrieve and return all promos from the database.
exports.findAll = (req, res) => {
    Promo.find()
    .then(promos => {
        res.send(promos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving promos."
        });
    });
};

// Find a single promo with a promoId
exports.findOne = (req, res) => {
    Promo.findById(req.params.promoId)
    .then(promo => {
        if(!promo) {
            return res.status(404).send({
                message: "promo not found with id " + req.params.promoId
            });            
        }
        res.send(promo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "promo not found with id " + req.params.promoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving promo with id " + req.params.promoId
        });
    });
};

// Update a promo identified by the promoId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.deskripsi) {
        return res.status(400).send({
            message: "promo content can not be empty"
        });
    }

    // Find promo and update it with the request body
    Promo.findByIdAndUpdate(req.params.promoId, {
        judul: req.body.judul || "Untitled promo",
        link_gambar: req.body.link_gambar,
        deskripsi: req.body.deskripsi,
        kode_promo: req.body.kode_promo,
        diskon: req.body.diskon
    }, {new: true})
    .then(promo => {
        if(!promo) {
            return res.status(404).send({
                message: "promo not found with id " + req.params.promoId
            });
        }
        res.send(promo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "promo not found with id " + req.params.promoId
            });                
        }
        return res.status(500).send({
            message: "Error updating promo with id " + req.params.promoId
        });
    });
};

// Delete a promo with the specified promoId in the request
exports.delete = (req, res) => {
    Promo.findByIdAndRemove(req.params.promoId)
    .then(promo => {
        if(!promo) {
            return res.status(404).send({
                message: "promo not found with id " + req.params.promoId
            });
        }
        res.send({message: "promo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "promo not found with id " + req.params.promoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete promo with id " + req.params.promoId
        });
    });
};