const News = require('../models/news.model.js');

// Create and Save a new news
exports.create = (req, res) => {
    // Validate request
    if(!req.body.deskripsi) {
        return res.status(400).send({
            message: "news content can not be empty"
        });
    }

    // Create a news
    const news = new News({
        judul: req.body.judul || "Untitled news",
        subjudul: req.body.subjudul,
        link_gambar: req.body.link_gambar,
        deskripsi: req.body.deskripsi        
    });

    // Save news in the database
    news.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the news."
        });
    });
};

// Retrieve and return all newss from the database.
exports.findAll = (req, res) => {
    News.find()
    .then(newss => {
        res.send(newss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving newss."
        });
    });
};

// Find a single news with a newsId
exports.findOne = (req, res) => {
    News.findById(req.params.newsId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });            
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving news with id " + req.params.newsId
        });
    });
};

// Update a news identified by the newsId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.deskripsi) {
        return res.status(400).send({
            message: "news content can not be empty"
        });
    }

    // Find news and update it with the request body
    News.findByIdAndUpdate(req.params.newsId, {
        judul: req.body.judul || "Untitled news",
        subjudul: req.body.subjudul,
        link_gambar: req.body.link_gambar,
        deskripsi: req.body.deskripsi  
    }, {new: true})
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error updating news with id " + req.params.newsId
        });
    });
};

// Delete a news with the specified newsId in the request
exports.delete = (req, res) => {
    News.findByIdAndRemove(req.params.newsId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });
        }
        res.send({message: "news deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete news with id " + req.params.newsId
        });
    });
};