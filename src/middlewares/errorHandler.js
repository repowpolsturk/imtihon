const logger = require('../config/winston');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;