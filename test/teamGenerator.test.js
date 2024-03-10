import { expect } from "chai";
import TeamGenerator from "../src/teamGenerator.js";
import TournamentGenerator from "../src/tournamentGenerator.js";

  describe("Testing TournamentGenerator", () => {
    it("1. Génère correctement les poules", () => {
      const teams = [
        { name: "Équipe 1", players: ["Joueur 1", "Joueur 2", "Joueur 3"] },
        { name: "Équipe 2", players: ["Joueur 4", "Joueur 5", "Joueur 6"] },
        { name: "Équipe 3", players: ["Joueur 7", "Joueur 8", "Joueur 9"] },
        { name: "Équipe 4", players: ["Joueur 10", "Joueur 11", "Joueur 12"] },
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      expect(tournament.poules).to.have.lengthOf.at.least(1);
      expect(tournament.poules[0]).to.have.lengthOf(4); // Vérifie si chaque poule a 4 équipes
    });
  });
