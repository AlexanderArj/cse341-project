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

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: userId });

    result.toArray().then((contacts) => {

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]);

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getAll,
  getSingle
};