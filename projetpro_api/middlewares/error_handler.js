module.exports = (error, request, response, next) => {
    const { title } = error;
    let { description } = error;
  
    const status = error.status || 500;
    if (status == 500) {
      description = 'Server broke. Please retry in another way.';
    }
  
    response.status(status).json({
      title,
      description,
    });
  };