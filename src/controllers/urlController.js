const Url = require("../models/Url");

const createUrl = (req, res) => {
  try{
    const to = request.body.to;
    const newUrl = new Url({to, owner: req.userId});
    const url = await newUrl.save();
    res.status(201).json(url);
  } catch(err){
    res.status(500).json(err);
  }
};

const getUrl = (req, res) => {
    try{
      const id = req.params.id;
      const url = Url.findById(id);
      res.status(200).json(url);
    } catch(err){
      res.status(500).json(err);
    }
  };

module.exports = {
  createUrl,
  getUrl
};
