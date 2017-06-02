var logger = require("morgan");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var app = express();

app.set('tentoonstellingFile', require('./config/tentoonstelling.json'));
app.set('categorieenFile', require('./config/categorieen.json'));


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.use(require("./routes/root_router"));
app.use(require("./routes/tentoonstelling_router"));
app.use(require("./routes/categorieen_router"));

app.get("/zoeken", function(request, response) {
    response.render("zoeken");
});



// Express vertellen dat je views zich in een folder views bevinden
app.set("views", path.resolve(__dirname, "views"));
// Express vertellen dat je de EJS templating gaat gebruiken
app.set("view engine", "ejs");

// Een global array aanmaken om alle bijdrages aan het gastenboek in op te slaan
var bijdrages = [];
// Deze array beschikbaar maken in alle views
app.locals.bijdrages = bijdrages;

// De Morgan module gebruiken om elk request te loggen
// https://www.npmjs.com/package/morgan
// https://github.com/expressjs/morgan
app.use(logger("dev"));

// Maakt een variabele req.body aan. Is nodig indien de gebruiker een form submit. Ook de optie extended is verplicht te gebruiken.
app.use(bodyParser.urlencoded({ extended: false }));

// When visiting the site root, renders the homepage (at views/index.ejs)
app.get("/", function(request, response) {
    response.render("index");
});

// Weergeven van een "new entry"- pagina om een boodschap toe te voegen aan het gastenboek
app.get("/nieuwe-boodschap", function(request, response) {
    response.render("nieuwe-boodschap");
});

// Maakt een route aan die het posten van een form (vandaar app.post) behandelt
app.post("/nieuwe-boodschap", function(request, response) {
    // als een lege form wordt doorgestuurd de app laten reageren met een foutmelding 400
    if (!request.body.titel || !request.body.boodschap) {
        response.status(400).send("Geef je comment een titel en een boodschap.");
        return;
    }
    // voegt een nieuwe boodschap toe aan de bijdrages array
    bijdrages.push({
      titel: request.body.titel,
      boodschap: request.body.boodschap,
      geplaatst: new Date()
    });
});

// Aanmaken van een 404 pagina wanneer een niet-bestaande toepassing wordt opgevraagd.
app.use(function(request, response) {
    response.status(404).render("404");
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
