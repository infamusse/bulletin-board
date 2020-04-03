const Posts = require("../models/post.model");
// const sanitize = require("mongo-sanitize");

exports.getAll = async (req, res) => {
  try {
    res.json(await Posts.find());
  } catch (err) {
    res.status(500).json({ messeage: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json(await Posts.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ messeage: err });
  }
};
