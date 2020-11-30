const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose.connect(
    uri || "mongodb://localhost/url-shortener",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log(err || "Successfully connected to database");
    }
  );
};

module.exports = connect;
