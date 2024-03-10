import { expect } from "chai";
import TeamGenerator from "../src/teamGenerator.js";
import TournamentGenerator from "../src/tournamentGenerator.js";

  describe("Testing TournamentGenerator functions", () => {
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

    it('2. Simule correctement les matchs de poules et qualifie les équipes pour les phases finales', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur 1', 'Joueur 2', 'Joueur 3'] },
        { name: 'Équipe 2', players: ['Joueur 4', 'Joueur 5', 'Joueur 6'] },
        { name: 'Équipe 3', players: ['Joueur 7', 'Joueur 8', 'Joueur 9'] },
        { name: 'Équipe 4', players: ['Joueur 10', 'Joueur 11', 'Joueur 12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      expect(tournament.finalStages).to.have.lengthOf(1); // Vérifie si une seule phase finale a été générée
      expect(tournament.finalStages[0]).to.have.lengthOf(2); // Vérifie si toutes les équipes qualifiées sont dans la phase finale
    });

    it('3. Génère correctement les phases finales', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur 1', 'Joueur 2', 'Joueur 3'] },
        { name: 'Équipe 2', players: ['Joueur 4', 'Joueur 5', 'Joueur 6'] },
        { name: 'Équipe 3', players: ['Joueur 7', 'Joueur 8', 'Joueur 9'] },
        { name: 'Équipe 4', players: ['Joueur 10', 'Joueur 11', 'Joueur 12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();
      expect(tournament.finalStages).to.have.lengthOf.at.least(1); // Vérifie si au moins une phase finale a été générée
      expect(tournament.finalStages[tournament.finalStages.length - 1]).to.have.lengthOf(1); // Vérifie si la dernière phase finale a été joué
    });
  });

  describe('Testing TeamGenerator functions', () => {
    it('4. Génère correctement les équipes', () => {
      const players = ['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4', 'Joueur 5', 'Joueur 6'];
      const teamGenerator = new TeamGenerator(players);
      teamGenerator.generateTeams();
      expect(teamGenerator.teams).to.have.lengthOf.at.least(1);
      expect(teamGenerator.teams[0].players).to.have.lengthOf(3); // Vérifie si chaque équipe a 3 joueurs
    });

    it('5. Renvoie correctement les équipes', () => {
      const players = ['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4', 'Joueur 5', 'Joueur 6'];
      const teamGenerator = new TeamGenerator(players);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      expect(teams).to.be.an('array');
      expect(teams).to.have.lengthOf.at.least(1);
    });
  });

  describe('calculateFinalStageScores TDD', () => {
    it('6. Calcule correctement le score de chaque équipe dans la phase finale', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur 1', 'Joueur 2', 'Joueur 3'] },
        { name: 'Équipe 2', players: ['Joueur 4', 'Joueur 5', 'Joueur 6'] },
        { name: 'Équipe 3', players: ['Joueur 7', 'Joueur 8', 'Joueur 9'] },
        { name: 'Équipe 4', players: ['Joueur 10', 'Joueur 11', 'Joueur 12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();

      // On suppose que nous avons des résultats de matchs pour chaque équipe dans la phase finale
      const finalStageResults = {
        'Équipe 1': 3,
        'Équipe 2': 1,
        'Équipe 3': 2,
        'Équipe 4': 0
      };

      tournament.calculateFinalStageScores(finalStageResults);

      // Vérifie si chaque équipe a le score calculé correctement
      expect(tournament.finalStageScores['Équipe 1']).to.equal(3);
      expect(tournament.finalStageScores['Équipe 2']).to.equal(1);
      expect(tournament.finalStageScores['Équipe 3']).to.equal(2);
      expect(tournament.finalStageScores['Équipe 4']).to.equal(0);
    });

    it('7. Lève une erreur si des équipes supplémentaires sont incluses dans les résultats de la phase finale', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur 1', 'Joueur 2', 'Joueur 3'] },
        { name: 'Équipe 2', players: ['Joueur 4', 'Joueur 5', 'Joueur 6'] },
        { name: 'Équipe 3', players: ['Joueur 7', 'Joueur 8', 'Joueur 9'] },
        { name: 'Équipe 4', players: ['Joueur 10', 'Joueur 11', 'Joueur 12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();

      // On suppose que nous avons des résultats de matchs pour chaque équipe dans la phase finale
      const finalStageResults = {
        'Équipe 1': 3,
        'Équipe 2': 1,
        'Équipe 3': 2,
        'Équipe 4': 0,
        'Équipe 5': 2 // Équipe supplémentaire non incluse dans les équipes participantes
      };

      // Vérifie si l'appel à calculateFinalStageScores lève une erreur
      expect(() => tournament.calculateFinalStageScores(finalStageResults)).to.throw(Error);
    });
  });
