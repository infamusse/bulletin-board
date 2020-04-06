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

exports.post = async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location
    } = req.body;
    console.log("req.body", req.body);
    const newPost = new Posts({
      author: author,
      created: created,
      updated: updated,
      status: status,
      title: title,
      text: text,
      photo: photo,
      price: price,
      phone: phone,
      location: location
    });
    await newPost.save();
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messeage: err });
  }
};
