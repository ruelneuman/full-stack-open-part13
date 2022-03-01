const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { BlacklistedJwt } = require('../models');

const tokenValidator = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' });
  }

  const decodedToken = jwt.verify(authorization.substring(7), SECRET);

  const blacklistedJwt = await BlacklistedJwt.findByPk(decodedToken.jti);

  if (blacklistedJwt) {
    return res.status(401).json({ error: 'invalid token' });
  }

  req.decodedToken = decodedToken;

  next();
};

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    const messages = [];

    error.errors.forEach((validationErrors) => {
      messages.push(validationErrors.message);
    });

    res.status(400).json({ error: messages });
  }

  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' });
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json({ error: 'token expired' });
  }

  next(error);
};

module.exports = {
  tokenExtractor: tokenValidator,
  errorHandler,
};
