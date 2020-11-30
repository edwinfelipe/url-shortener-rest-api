const Url = require("../models/Url");

const createUrl = async (req, res) => {
  try {
    const to = req.body.to;
    const newUrl = new Url({ to, owner: req.userId });
    const url = await newUrl.save();
    res.status(201).json(url);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const url = await Url.findById(id);
    res.status(200).json(url);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ owner: req.userId });
    res.status(200).json(urls);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  createUrl,
  getUrl,
  getUrls,
};
