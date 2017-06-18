class Assessment {
  constructor(course, answers) {
    this.course = course;
    this.answers = answers;
  }

  get validatedSkills() {
    const validated = new Set();
    console.log('tubes', this.course.tubes);
    this.answers.forEach(answer => {
      if(answer.result == 'ok') {
        console.log(answer.challenge.skills);
        answer.challenge.skills.forEach(skill => {
          console.log(skill);
          skill.getEasierWithin(this.course.tubes).forEach(validatedSkill => {
            console.log(validatedSkill, 'yo');
            validated.add(validatedSkill);
          });
        })
      }
    });
    return validated;
  }

  get failedSkills() {
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
