const express = require("express");

const createServer = () => {
  const app = express();
  app.set('port', process.env.PORT || 3000);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app;
};

module.exports = createServer;
