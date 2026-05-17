const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

// Add the PUT, POST, and DELETE routes

router.put('/:id', contactsController.updateContact);

router.post('/', contactsController.createContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;