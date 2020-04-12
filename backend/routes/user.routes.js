const express = require("express");
const router = express.Router();

router.get("/logged", (req, res) => {
  try {
    if (req.user) {
      res.json({
        userName: req.user.displayName,
        email: req.user.emails[0].value,
        photo: req.user.photos[0].value,
      });
    } else {
      res.json({ userName: null });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

router.get("/no-permission", (req, res) => {
  res.send("noPermission");
});

module.exports = router;
