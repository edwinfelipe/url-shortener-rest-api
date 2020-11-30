class HttpException extends Error {
  constructor({ message, status, fields, details }) {
    super(message);
    this.status = status;
    this.fields = fields;
    this.details = details;
  }

  toJson() {
    return {
      message: this.message,
      status: this.status,
      fields: this.fields,
      detaild: this.details,
    };
  }
}

module.exports = HttpException;
