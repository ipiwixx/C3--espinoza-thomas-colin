import { expect } from "chai";
import TeamGenerator from "../src/teamGenerator.js";

describe("Fonctions de test du générateur d'équipes", () => {
    it('4. Génère correctement les équipes', () => {
      const players = ['Joueur1', 'Joueur2', 'Joueur3', 'Joueur4', 'Joueur5', 'Joueur6'];
      const teamGenerator = new TeamGenerator(players);
      teamGenerator.generateTeams();
      expect(teamGenerator.teams).to.have.lengthOf.at.least(1);
      expect(teamGenerator.teams[0].players).to.have.lengthOf(3); 
    });

    it('5. Renvoie correctement les équipes', () => {
      const players = ['Joueur1', 'Joueur2', 'Joueur3', 'Joueur4', 'Joueur5', 'Joueur6'];
      const teamGenerator = new TeamGenerator(players);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      expect(teams).to.be.an('array');
      expect(teams).to.have.lengthOf.at.least(1);
    });
});
