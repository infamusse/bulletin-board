const Posts = require("../models/post.model");
// const sanitize = require("mongo-sanitize");

const getDate = () => {
  const today = new Date();
  return today.toISOString();
};

exports.getAll = async (req, res) => {
  try {
    res.json(await Posts.find({ status: { $eq: "published" } }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json(await Posts.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getUserPosts = async (req, res) => {
  console.log("getUserPosts", req.params.user);
  try {
    res.json(await Posts.find({ author: { $eq: req.params.user } }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const {
      author,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;
    const newPost = new Posts({
      author: author,
      created: getDate(),
      updated: getDate(),
      status: status,
      title: title,
      text: text,
      photo: photo,
      price: price,
      phone: phone,
      location: location,
    });
    await newPost.save();
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const {
      author,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;

    const postToUpdate = await Posts.findById(req.params.id);
    postToUpdate.updated = getDate();
    postToUpdate.author = author;
    postToUpdate.status = status;
    postToUpdate.title = title;
    postToUpdate.text = text;
    postToUpdate.photo = photo;
    postToUpdate.price = price;
    postToUpdate.phone = phone;
    postToUpdate.location = location;

    await postToUpdate.save();
    res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  console.log("delete post", req);
  try {
    const postToDelete = await Posts.findById(req.params.id);

    if (postToDelete) {
      await Posts.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
