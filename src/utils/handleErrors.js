const HttpException = require("../exceptions/httpException");
const handleErrors = (err) => {
  const errors = err.errors;
  if (err instanceof HttpException) {
      return err.toJson();
  } else if (errors) {
    const fields = Object.keys(errors);
    const details = Object.values(errors).map((error) => error.message);
    const error = new HttpException({
      message: "The provided data is not valid",
      details,
      fields,
      status: 400,
    });
    return error.toJson();
  } else {
      console.log(err);
    return {
      status: 500,
      message: "Unknown server error",
    };
  }
};

module.exports = handleErrors;
