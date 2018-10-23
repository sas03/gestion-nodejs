module.exports = (app) => {
    const salarie = require('../controllers/salarie.controller.js');

    // Create a new user
    app.post('/salaries', salarie.create);

    // Retrieve all users
    app.get('/salaries', salarie.findAll);

    // Retrieve a single user with noteId
    app.get('/salaries/:id', salarie.findOne);

    // Update a user with userid
    app.put('/salaries/:id', salarie.update);

    // Delete a user with userid
    app.delete('/salaries/:id', salarie.delete);
}
