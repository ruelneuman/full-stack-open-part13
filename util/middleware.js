const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    const messages = [];

    error.errors.forEach((validationErrors) => {
      messages.push(validationErrors.message);
    });

    response.status(400).json({ error: messages });
  }

  next(error);
};

module.exports = {
  errorHandler,
};
