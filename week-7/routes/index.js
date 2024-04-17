const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const data = {
    layout: "layouts/main",
    req,
  };
  res.render("index", data);
});

module.exports = router;
