import readlineSync from "readline-sync";
import fs from "fs";
import { Betaalmethode, Gebruiker, Uitgave } from "./types";

function voegUitgaveToe(gebruikerId: number) {
  const beschrijving = readlineSync.question(
    "Geef een beschrijving van de uitgave: "
  );
  const bedrag = readlineSync.questionFloat("Hoeveel heeft het gekost? ");
  const valuta = readlineSync.question(
    "Welke valuta gebruik je? (bijv. EUR, USD): "
  );
  const methode = readlineSync.question(
    "Wat is de betaalmethode? (Creditcard, Bankoverschrijving, Contant, etc.): "
  );

  let betaalmethode: Betaalmethode = { methode };

  if (methode === "Creditcard") {
    const kaartNummer = readlineSync.question(
      "Geef de laatste 4 cijfers van je creditcardnummer: "
    );
    const vervaldatum = readlineSync.question(
      "Wat is de vervaldatum van de kaart? (bijv. 12/25): "
    );
    betaalmethode.kaartDetails = {
      nummer: `**** **** **** ${kaartNummer}`,
      vervaldatum,
    };
  } else if (methode === "Bankoverschrijving") {
    const rekeningnummer = readlineSync.question(
      "Geef je bankrekeningnummer (alleen de laatste 4 cijfers): "
    );
    betaalmethode.bankRekeningNummer = `**** **** **** ${rekeningnummer}`;
  }

  const inkomend = readlineSync.keyInYN(
    "Is dit een inkomende betaling (bijv. salaris, verkoop)? "
  )
    ? true
    : false;
  const categorie = readlineSync.question(
    "Wat is de categorie van de uitgave? (bijv. eten, huur, inkomen): "
  );
  const tags = readlineSync
    .question(
      'Voeg tags toe (gescheiden door een komma, bijv. "maandelijks, supermarkt"): '
    )
    .split(",");
  const betaald = readlineSync.keyInYN("Is deze uitgave betaald? ")
    ? true
    : false;

  const nieuweUitgave: Uitgave = {
    id: Math.floor(Math.random() * 10000),
    beschrijving,
    bedrag,
    datum: new Date().toISOString(),
    valuta,
    betaalmethode,
    inkomend,
    categorie,
    tags,
    betaald,
  };

  let gebruikers: Gebruiker[] = JSON.parse(
    fs.readFileSync("gebruikers.json", "utf8")
  );
  let gebruiker = gebruikers.find((g) => g.id === gebruikerId);
  if (gebruiker) {
    gebruiker.uitgaven.push(nieuweUitgave);
    fs.writeFileSync("gebruikers.json", JSON.stringify(gebruikers, null, 2));
    console.log("Uitgave succesvol toegevoegd!");
  } else {
    console.log("Gebruiker niet gevonden!");
  }
}

function bekijkUitgaven(gebruikerId: number) {
  let gebruikers: Gebruiker[] = JSON.parse(
    fs.readFileSync("gebruikers.json", "utf8")
  );
  let gebruiker = gebruikers.find((g) => g.id === gebruikerId);

  if (gebruiker) {
    gebruiker.uitgaven.forEach((uitgave, index) => {
      console.log(
        `${index + 1}. Beschrijving: ${uitgave.beschrijving}, Bedrag: ${
          uitgave.bedrag
        } ${uitgave.valuta}, Datum: ${uitgave.datum}`
      );
    });
  } else {
    console.log("Gebruiker niet gevonden!");
  }
}

function startApp() {
  const actie = readlineSync
    .question(
      "Wil je een uitgave toevoegen of bekijken? (toevoegen/bekijken): "
    )
    .toLowerCase();

  if (actie === "toevoegen") {
    const gebruikerId = readlineSync.questionInt("Geef je gebruikers-ID: ");
    voegUitgaveToe(gebruikerId);
  } else if (actie === "bekijken") {
    const gebruikerId = readlineSync.questionInt("Geef je gebruikers-ID: ");
    bekijkUitgaven(gebruikerId);
  } else {
    console.log("Ongeldige keuze. Probeer opnieuw.");
    startApp(); // Herstart de app bij een ongeldige keuze
  }
}

startApp(); // Start de applicatie
