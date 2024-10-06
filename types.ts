export interface KaartDetails {
  nummer: string;
  vervaldatum: string;
}

export interface Betaalmethode {
  methode: string;
  kaartDetails?: KaartDetails; // Optioneel veld, alleen aanwezig bij Creditcard
  bankRekeningNummer?: string; // Optioneel veld, alleen aanwezig bij Bankoverschrijving
}

export interface Uitgave {
  id: number;
  beschrijving: string;
  bedrag: number;
  datum: string;
  valuta: string;
  betaalmethode: Betaalmethode;
  inkomend: boolean;
  categorie: string;
  tags: string[];
  betaald: boolean;
}

export interface Gebruiker {
  id: number;
  name: string;
  email: string;
  uitgaven: Uitgave[];
  budget: {
    maandlimiet: number;
    notificatieDrempel: number;
    actief: boolean;
  };
}
