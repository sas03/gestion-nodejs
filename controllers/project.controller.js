const Project = require('../models/project.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    // Create a user
    const project = new Project({
        name: req.body.name || "Untitled Client",
        description: req.body.description,
        status:req.body.status
    });
    // Save user in the database
    project.save()
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

    Project.find()
    .then(projects => {
        res.send(projects);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userid
exports.findOne = (req, res) => {
    Project.findById(req.params.id)
   .then(project => {
       if(!project) {
           return res.status(404).send({
               message: "user not found with id " + req.params.id
           });
       }
       res.send(project);
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
    Project.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Untitled User",
        description: req.body.description,
        status:req.body.status
    }, {new: true})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(project);
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
    Project.findByIdAndRemove(req.params.id)
    .then(project => {
        if(!project) {
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
