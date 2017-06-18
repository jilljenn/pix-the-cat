const Skill = require('../models/skill');

function _filterChallenges(challenges, answers) {
  const answeredChallenges = answers.map(answer => answer.challenge);
  return challenges.filter(challenge => !answeredChallenges.includes(challenge));
}

function _computeReward(challenge) {
  return reward;
}

function _findBestChallenge(challenges, userAnswers, validatedSkills, failedSkills, estimatedLevel) {
  return challengeId;
}

function getNextChallenge(assessment) {
  // filterChallenges
  // assessment.course
  const tubes = _computeTubesOfCourse(assessment.course);
  /* const validatedSkills = assessment.validatedSkills;
  const failedSkills = assessment.failedSkills;
  const estimatedLevel = assessment.estimatedLevel; */
  const filteredChallenges = _filterChallenges(assessment.course.challenges, assessment.answers);
  const challenge = _findBestChallenge();
  return challenge;
}

module.exports = {
  getNextChallenge,
  _filterChallenges,
  _findBestChallenge,
};
