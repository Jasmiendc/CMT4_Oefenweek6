var express = require("express");
var tentoonstelling = express.Router();

tentoonstelling.get('/items/:id', function(req, res) {
  var tentoonstellingFile = req.app.get('tentoonstellingFile');
  var id = req.params.id;
  var teller = 0;
  var item = "";
  while (teller < tentoonstellingFile.tentoonstelling.length ) {
    if (tentoonstellingFile.tentoonstelling[teller].id == id) {
      item = tentoonstellingFile.tentoonstelling[teller];
    }
    teller++;
  }
  if (item !== "") {
    res.render("tentoonstelling", {
      item: item
    });
  } else {
    res.render("404", {});
  }
});

module.exports = tentoonstelling;
