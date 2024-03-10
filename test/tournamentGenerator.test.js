import { expect } from "chai";
import TournamentGenerator from "../src/tournamentGenerator.js";

describe("Fonctions de test du générateur de tournoi", () => {
    it("1. Génère correctement les poules", () => {
      const teams = [
        { name: "Équipe 1", players: ["Joueur1", "Joueur2", "Joueur3"] },
        { name: "Équipe 2", players: ["Joueur4", "Joueur5", "Joueur6"] },
        { name: "Équipe 3", players: ["Joueur7", "Joueur8", "Joueur9"] },
        { name: "Équipe 4", players: ["Joueur10", "Joueur11", "Joueur12"] },
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      expect(tournament.poules).to.have.lengthOf.at.least(1);
      expect(tournament.poules[0]).to.have.lengthOf(4); 
    });

    it('2. Simule correctement les matchs de poules et qualifie les équipes pour les phases finales', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur1', 'Joueur2', 'Joueur3'] },
        { name: 'Équipe 2', players: ['Joueur4', 'Joueur5', 'Joueur6'] },
        { name: 'Équipe 3', players: ['Joueur7', 'Joueur8', 'Joueur9'] },
        { name: 'Équipe 4', players: ['Joueur10', 'Joueur11', 'Joueur12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      expect(tournament.finalStages).to.have.lengthOf(1); 
      expect(tournament.finalStages[0]).to.have.lengthOf(2); 
    });

    it('3. Génère correctement les phases finales', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur1', 'Joueur2', 'Joueur3'] },
        { name: 'Équipe 2', players: ['Joueur4', 'Joueur5', 'Joueur6'] },
        { name: 'Équipe 3', players: ['Joueur7', 'Joueur8', 'Joueur9'] },
        { name: 'Équipe 4', players: ['Joueur10', 'Joueur11', 'Joueur12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();
      expect(tournament.finalStages).to.have.lengthOf.at.least(1); 
      expect(tournament.finalStages[tournament.finalStages.length - 1]).to.have.lengthOf(1); 
    });
});

describe("Test de développement piloté par les tests pour calculateFinalStageScores", () => {
    it('6. Calcule correctement le score de chaque équipe dans la phase finale', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur1', 'Joueur2', 'Joueur3'] },
        { name: 'Équipe 2', players: ['Joueur4', 'Joueur5', 'Joueur6'] },
        { name: 'Équipe 3', players: ['Joueur7', 'Joueur8', 'Joueur9'] },
        { name: 'Équipe 4', players: ['Joueur10', 'Joueur11', 'Joueur12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();

      const finalStageResults = {
        'Équipe 1': 3,
        'Équipe 2': 1,
        'Équipe 3': 2,
        'Équipe 4': 0
      };

      tournament.calculateFinalStageScores(finalStageResults);

      expect(tournament.finalStageScores['Équipe 1']).to.equal(3);
      expect(tournament.finalStageScores['Équipe 2']).to.equal(1);
      expect(tournament.finalStageScores['Équipe 3']).to.equal(2);
      expect(tournament.finalStageScores['Équipe 4']).to.equal(0);
    });

    it('7. Lève une erreur si des équipes supplémentaires sont incluses dans les résultats de la phase finale', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur1', 'Joueur2', 'Joueur3'] },
        { name: 'Équipe 2', players: ['Joueur4', 'Joueur5', 'Joueur6'] },
        { name: 'Équipe 3', players: ['Joueur7', 'Joueur8', 'Joueur9'] },
        { name: 'Équipe 4', players: ['Joueur10', 'Joueur11', 'Joueur12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();

      const finalStageResults = {
        'Équipe 1': 3,
        'Équipe 2': 1,
        'Équipe 3': 2,
        'Équipe 4': 0,
        'Équipe 5': 2
      };

      expect(() => tournament.calculateFinalStageScores(finalStageResults)).to.throw(Error);
    });

    it('8. Gère correctement le cas où les résultats de la phase finale sont vides', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur1', 'Joueur2', 'Joueur3'] },
        { name: 'Équipe 2', players: ['Joueur4', 'Joueur5', 'Joueur6'] },
        { name: 'Équipe 3', players: ['Joueur7', 'Joueur8', 'Joueur9'] },
        { name: 'Équipe 4', players: ['Joueur10', 'Joueur11', 'Joueur12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();

      const finalStageResults = {};

      tournament.calculateFinalStageScores(finalStageResults);

      for (const teamName in tournament.finalStageScores) {
        expect(tournament.finalStageScores[teamName]).to.equal(0);
      }
    });

    it('9. Calcule correctement le score total de la phase finale', () => {
      const teams = [
        { name: 'Équipe 1', players: ['Joueur1', 'Joueur2', 'Joueur3'] },
        { name: 'Équipe 2', players: ['Joueur4', 'Joueur5', 'Joueur6'] },
        { name: 'Équipe 3', players: ['Joueur7', 'Joueur8', 'Joueur9'] },
        { name: 'Équipe 4', players: ['Joueur10', 'Joueur11', 'Joueur12'] }
      ];
      const tournament = new TournamentGenerator(teams);
      tournament.generatePoules();
      tournament.simulatePoulesMatches();
      tournament.generateFinalStages();

      const finalStageResults = {
        'Équipe 1': 3,
        'Équipe 2': 1,
        'Équipe 3': 2,
        'Équipe 4': 0
      };

      tournament.calculateFinalStageScores(finalStageResults);

      const totalScore = Object.values(finalStageResults).reduce((total, score) => total + score, 0);

      expect(tournament.calculateTotalFinalStageScore()).to.equal(totalScore);
    });
});
