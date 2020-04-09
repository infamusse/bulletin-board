const express = require("express");
const router = express.Router();

router.get("/logged", (req, res) => {
  try {
    if (req.user) {
      res.json({
        userName: req.user.displayName
      });
    } else {
      res.json({ message: "Access denided" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/no-permission", (req, res) => {
  res.send("noPermission");
});

module.exports = router;
