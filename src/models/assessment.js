class Assessment {
  constructor(course, answers) {
    this.course = course;
    this.answers = answers;
  }

  get validatedSkills() {
    const validated = new Set();
    this.answers.forEach(answer => {
      if(answer.result === 'ok') {
        answer.challenge.skills.forEach(skill => {
          skill.getEasierWithin(this.course.tubes).forEach(validatedSkill => {
            validated.add(validatedSkill);
          });
        })
      }
    });
    return validated;
  }

  get failedSkills() {
    const failed = new Set();
    this.answers.forEach(answer => {
      if(answer.result !== 'ok') {
        answer.challenge.hardestSkill.getHarderWithin(this.course.tubes).forEach(validatedSkill => {
          failed.add(validatedSkill);
        });
      }
    });
    return failed;
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
