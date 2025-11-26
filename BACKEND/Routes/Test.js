const express = require("express");
const router = express.Router();
const auth = require("../Middleware/Auth");
router.get("/protected", auth, (req, res) => {
  res.json({
    msg: "Access Granted ✅ You are Logged In!",
    userId: req.user
  });
});
module.exports = router;