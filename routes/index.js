const routes = require('express').Router();
const contacts = require('./contacts');

routes.use('/', require('./swagger'));
routes.use('/contacts', contacts);

routes.get('/', (req, res) => {
    res.send('Hello World')
});

module.exports = routes;