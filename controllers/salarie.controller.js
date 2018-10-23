const Salarie = require('../models/salarie.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    // Create a user
    const salarie = new Salarie({
        name: req.body.name || "Untitled Client",
        username: req.body.username,
        address:req.body.address,
        telephone:req.body.telephone,
        email:req.body.email,
        position:req.body.position
    });
    // Save user in the database
    salarie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {

    Salarie.find()
    .then(salaries => {
        res.send(salaries);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userid
exports.findOne = (req, res) => {
    Salarie.findById(req.params.id)
   .then(salarie => {
       if(!salarie) {
           return res.status(404).send({
               message: "user not found with id " + req.params.id
           });
       }
       res.send(salarie);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "User not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving user with id " + req.params.id
       });
   });
};

// Update a user identified by the userid in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    Salarie.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Untitled User",
        username: req.body.username,
        address:req.body.address,
        telephone:req.body.telephone,
        email:req.body.email,
        position:req.body.position
    }, {new: true})
    .then(salarie => {
        if(!salarie) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(salarie);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
    Salarie.findByIdAndRemove(req.params.id)
    .then(salarie => {
        if(!salarie) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });

};
