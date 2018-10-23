module.exports = (app) => {
    const project = require('../controllers/project.controller.js');

    // Create a new user
    app.post('/projects', project.create);

    // Retrieve all users
    app.get('/projects', project.findAll);

    // Retrieve a single user with noteId
    app.get('/projects/:id', project.findOne);

    // Update a user with userid
    app.put('/projects/:id', project.update);

    // Delete a user with userid
    app.delete('/projects/:id', project.delete);
}
