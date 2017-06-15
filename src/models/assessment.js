function _probaOfCorrectAnswer(level, difficulty) {
  return 1 / (1 + Math.exp(-(level - difficulty)));
}

function _computeLikelihood(level, history) {
  return -Math.abs(history.map(question => question.outcome - _probaOfCorrectAnswer(level, question.difficulty)).reduce((a, b) => a + b));
}

function _computeEstimatedLevel(history) {
  return 1;
  // let maxLikelihood = 0;
  // let level = 0.5;
  // let estimatedLevel = 0.5;
  // while(level < 8) {
  //   const likelihood = _computeLikelihood(level, history);
  //   if(likelihood > maxLikelihood) {
  //     maxLikelihood = likelihood;
  //     estimatedLevel = level;
  //   }
  //   level += 0.5;
  // }
  // return estimatedLevel;
}

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
        return;
    }
}

module.exports = Assessment;
