var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {
    tentoonstelling: req.app.get('tentoonstellingFile').tentoonstelling,
    categorieen: req.app.get('categorieenFile').categorieen,
  });
});

module.exports = root;
