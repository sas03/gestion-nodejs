module.exports = (app) => {
    const client = require('../controllers/client.controller.js');

    // Create a new user
    app.post('/clients', client.create);

    // Retrieve all users
    app.get('/clients', client.findAll);

    // Retrieve a single user with noteId
    app.get('/clients/:id', client.findOne);

    // Update a user with userid
    app.put('/clients/:id', client.update);

    // Delete a user with userid
    app.delete('/clients/:id', client.delete);
}
