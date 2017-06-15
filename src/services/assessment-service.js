const Skill = require('../models/skill');
const Tube = require('../models/tube');


function _computeTubesOfCourse(course) {
  const tubes = {};
  course.challenges.forEach(challenge => {
    challenge.skills.forEach(skill => {
      const tubeName = skill.tubeName;
      if(tubes[tubeName]) {
        tubes[tubeName].push(skill.difficulty);
      } else {
        tubes[tubeName] = [skill.difficulty];
      }
    });
  });
  Object.keys(tubes).forEach(tubeName => tubes[tubeName].sort());
  return tubes;
}

function _computeSkillsOfChallenge(course) {
  const skillsOfChallenge = {};
  course.challenges.forEach(challenge => {
    skillsOfChallenge[challenge.id] = skill;
  });
  return skillsOfChallenge;
}

function _probaOfCorrectAnswer(level, difficulty) {
  return 1 / (1 + Math.exp(-(level - difficulty)));
}

function _computeHistory(userAnswers, skillsOfChallenge) {
  return userAnswers.map(answer => new Question(skillsOfChallenge[answer.challengeId].difficulty, answer.result == 'ok'));
}

function _computeLikelihood(level, history) {
  return -Math.abs(history.map(question => question.outcome - _probaOfCorrectAnswer(level, question.difficulty)).reduce((a, b) => a + b));
}

function _computeEstimatedLevel(history) {
  let maxLikelihood = 0;
  let level = 0.5;
  let estimatedLevel = 0.5;
  while(level < 8) {
    const likelihood = _computeLikelihood(level, history);
    if(likelihood > maxLikelihood) {
      maxLikelihood = likelihood;
      estimatedLevel = level;
    }
    level += 0.5;
  }
  return estimatedLevel;
}

function _filterChallenges(challenges) {
  return filteredChallenges;
}

function _computeReward(challenge) {
  return reward;
}

function _findBestChallenge(challenges, userAnswers, validatedSkills, failedSkills, estimatedLevel) {
  return challengeId;
}

function getUserPerformance(answers, tubes) {
  return validatedSkills, failedSkills, estimatedLevel;
}

function getNextChallenge(assessment) {
  throw new Error();
}

module.exports = {
    getNextChallenge,
    _computeTubesOfCourse,
    _computeLikelihood
};
