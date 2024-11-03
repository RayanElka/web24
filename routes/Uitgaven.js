// routes/uitgavenRoutes.js
import express from "express";
import fs from "fs";
const router = express.Router();

// Functie om gebruikersdata in te laden
function laadGebruikers() {
  return JSON.parse(fs.readFileSync("json/gebruikers.json", "utf8"));
}

// Functie om gebruikersdata op te slaan
function slaGebruikersOp(data) {
  fs.writeFileSync("json/gebruikers.json", JSON.stringify(data, null, 2));
}

// Route om de uitgavenpagina weer te geven
router.get("/", (req, res) => {
  const gebruikers = laadGebruikers();
  res.render("index", { gebruikers });
});

// Route om een nieuwe uitgave toe te voegen
router.post("/uitgaven/toevoegen", (req, res) => {
  const {
    gebruikerId,
    beschrijving,
    bedrag,
    valuta,
    methode,
    categorie,
    tags,
  } = req.body;
  const nieuweUitgave = {
    id: Math.floor(Math.random() * 10000),
    beschrijving,
    bedrag: parseFloat(bedrag),
    datum: new Date().toISOString(),
    valuta,
    betaalmethode: { methode },
    categorie,
    tags: tags.split(","),
    betaald: req.body.betaald === "on",
  };

  const gebruikers = laadGebruikers();
  const gebruiker = gebruikers.find((g) => g.id === parseInt(gebruikerId));
  if (gebruiker) {
    gebruiker.uitgaven.push(nieuweUitgave);
    slaGebruikersOp(gebruikers);
    res.redirect("/");
  } else {
    res.send("Gebruiker niet gevonden.");
  }
});

export default router;
