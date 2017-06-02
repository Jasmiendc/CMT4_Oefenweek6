var express = require("express");
var path = require("path");
var app = express();

app.set('nieuwsFile', require('./config/nieuws.json'));
app.set('categorieenFile', require('./config/categorieen.json'));


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.use(require("./routes/root_router"));
app.use(require("./routes/nieuws_router"));
app.use(require("./routes/categorieen_router"));

// Weergeven van een "new entry"- pagina om een boodschap toe te voegen aan het gastenboek
app.get("/nieuwe-boodschap", function(request, response) {
    response.render("nieuwe-boodschap");
});

// Maakt een route aan die het posten van een form (vandaar app.post) behandelt
app.post("/nieuwe-boodschap", function(request, response) {
    // als een lege form wordt doorgestuurd de app laten reageren met een foutmelding 400
    if (!request.body.titel || !request.body.boodschap) {
        response.status(400).send("Bijdrages moeten een titel en een boodschap hebben.");
        return;
    }
    // voegt een nieuwe boodschap toe aan de bijdrages array
    bijdrages.push({
      titel: request.body.titel,
      boodschap: request.body.boodschap,
      geplaatst: new Date()
    });
    // Doorverwijzen naar de startpagina om dan de nieuwe boodschap te zien
    response.redirect("/");
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
