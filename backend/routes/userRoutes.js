const express = require("express");
const authUser = require("../middleware/authUser");

const router = express.Router();

router.get("/profile", authUser, (req, res) => {
  res.json(req.user);
});

module.exports = router;
