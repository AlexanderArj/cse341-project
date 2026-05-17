const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();

    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getSingle = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid contact ID'
      });

    }

    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDb().collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });

    }
    
    res.status(200).json(contact);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const createContact = async (req, res) => {

  try {

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('contacts').insertOne(contact);

    if (response.acknowledged) {

      res.status(201).json({
        message: 'Contact created successfully',
        id: response.insertedId
      });

    } else {

      res.status(500).json({
        message: 'Some error occurred while creating the contact'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateContact = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid contact ID'
      });

    }

    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('contacts').replaceOne({ _id: contactId }, contact);

    if (response.matchedCount === 0) {

      return res.status(404).json({
        message: 'Contact not found'
      });

    }

    if (response.modifiedCount > 0) {

      res.status(200).json({
        message: 'Contact updated successfully'
      });

    } else {

      res.status(200).json({
        message: 'No changes were made'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const deleteContact = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid contact ID'
      });

    }

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {

      res.status(200).json({
        message: 'Contact deleted successfully'
      });

    } else {

      res.status(404).json({
        message: 'Contact not found'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getAll,
  getSingle,
  createContact,
  deleteContact,
  updateContact
};