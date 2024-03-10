class TournamentGenerator {
  constructor(teams) {
    this.teams = teams; // Chaque équipe est un objet { name: string, players: array }
    this.poules = [];
    this.finalStages = []; // Les phases finales
    this.finalStageScores = {}; // Nouvelle propriété pour stocker les scores de la phase finale
  }

  generatePoules() {
    let shuffledTeams = [...this.teams].sort(() => 0.5 - Math.random());
    const nbPoules = Math.floor(shuffledTeams.length / 4);
    for (let i = 0; i < nbPoules; i++) {
      this.poules.push(shuffledTeams.splice(0, 4));
    }
    console.log("Poules générées :", this.poules);
  }

  simulatePoulesMatches() {
    let qualifiedTeams = [];
    this.poules.forEach((poule) => {
      qualifiedTeams.push(...poule.slice(0, 2));
    });
    this.finalStages.push(qualifiedTeams);
    console.log(
      "Équipes qualifiées pour les phases finales :",
      this.finalStages[0]
    );
  }

  generateFinalStages() {
    let currentStage = this.finalStages[0];
    while (currentStage.length > 1) {
      let nextStage = [];
      for (let i = 0; i < currentStage.length; i += 2) {
        let winner = currentStage[i + (Math.random() > 0.5 ? 0 : 1)];
        nextStage.push(winner);
      }
      this.finalStages.push(nextStage);
      currentStage = nextStage;
    }
    console.log("Phases finales :", this.finalStages);
  }

  generateTournament() {
    this.generatePoules();
    this.simulatePoulesMatches();
    this.generateFinalStages();
    return this.finalStages;
  }

  calculateFinalStageScores(finalStageResults) {
    // Vérifie si des équipes supplémentaires sont incluses dans les résultats
    const extraTeams = Object.keys(finalStageResults).filter(teamName => !this.teams.find(team => team.name === teamName));
    if (extraTeams.length > 0) {
        throw new Error('Des équipes supplémentaires ont été incluses dans les résultats de la phase finale.');
    }

    // Met à jour les scores de la phase finale
    for (const teamName in finalStageResults) {
        if (finalStageResults.hasOwnProperty(teamName)) {
            this.finalStageScores[teamName] = finalStageResults[teamName];
        }
    }
  }

  calculateTotalFinalStageScore() {
    let totalScore = 0;
    for (const teamName in this.finalStageScores) {
        if (this.finalStageScores.hasOwnProperty(teamName)) {
            totalScore += this.finalStageScores[teamName];
        }
    }
    return totalScore;
  }
}

export default TournamentGenerator;
