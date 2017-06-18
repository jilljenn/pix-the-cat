class Assessment {
  constructor(course, answers) {
    this.course = course;
    this.answers = answers;
  }

  get validatedSkills() {
    return;
  }

  get acquiredSkills() {
    return;
  }

  get estimatedLevel() {
    if(this.answers.length === 0) {
      return 2;
    }
    let maxLikelihood = -Infinity;
    let level = 0.5;
    let estimatedLevel = 0.5;
    while(level < 8) {
      const likelihood = this._computeLikelihood(level, this.answers);
      if(likelihood > maxLikelihood) {
        maxLikelihood = likelihood;
        estimatedLevel = level;
      }
      level += 0.5;
    }
    return estimatedLevel;
  }

  _probaOfCorrectAnswer(level, difficulty) {
    return 1 / (1 + Math.exp(-(level - difficulty)));
  }

  _computeLikelihood(level, answers) {
    return -Math.abs(answers.map(answer => answer.binaryOutcome - this._probaOfCorrectAnswer(level, answer.maxDifficulty)).reduce((a, b) => a + b));
  }
}

module.exports = Assessment;
