const Skill = require('../models/skill');


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

function _filterChallenges(challenges) {
  filteredChallenges = challenges;
  return filteredChallenges;
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
  const filteredChallenges = _filterChallenges();
  const challenge = _findBestChallenge();
  return challenge;
}

module.exports = {
  getNextChallenge,
  _computeTubesOfCourse,
  _filterChallenges,
  _findBestChallenge,
};
