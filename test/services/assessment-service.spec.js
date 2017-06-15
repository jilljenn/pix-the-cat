const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assessmentService = require('../../src/services/assessment-service');
const Course = require('../../src/models/course');
const Challenge = require('../../src/models/challenge');
const Answer = require('../../src/models/answer');
const Skill = require('../../src/models/skill');
const Assessment = require('../../src/models/assessment');
chai.use(require('sinon-chai'));


describe('Unit | Service | assessmentService', function() {

  describe('#getNextChallenge()', function() {
    it('should exist', function() {
      expect(assessmentService.getNextChallenge).to.exist;
    });

    it.skip('should return the next challenge of the adaptive course', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const url3 = new Skill('url', 3);
      const url4 = new Skill('url', 4);
      const rechInfo5 = new Skill('rechInfo', 5);
      const url6 = new Skill('url', 6);
      const rechInfo7 = new Skill('rechInfo', 7);
      const web8 = new Skill('web', 8);
      const ch1 = new Challenge('recEasy', [web1]);
      const ch2 = new Challenge('rec2', [web2]);
      const ch3 = new Challenge('rec3', [url3]);
      const ch4 = new Challenge('rec4', [url4]);
      const ch5 = new Challenge('rec5', [rechInfo5]);
      const ch6 = new Challenge('rec6', [url6]);
      const ch7 = new Challenge('rec7', [rechInfo7]);
      const course = new Course([ch1, ch2, ch3, ch4, ch5, ch6, ch7]);
      const answer1 = new Answer(ch2, 'ok');
      const answer2 = new Answer(ch4, 'ok');
      const answer3 = new Answer(ch6, 'ko');
      const assessment = new Assessment(course, [answer1, answer2, answer3]);

      // when
      const nextChallenge = assessmentService.getNextChallenge(assessment);

      // then
      expect(nextChallenge).to.equal(ch5);
    });
  });

  describe('#_computeTubesOfCourse()', function() {
    it('should exist', function() {
      expect(assessmentService._computeTubesOfCourse).to.exist;
    });

    it('should return a dictionary of tubes when all challenges require only one skill', function() {
      // given
      const web4 = new Skill('web', 4);
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const ch1 = new Challenge('a', [web4]);
      const ch2 = new Challenge('b', [web5]);
      const ch3 = new Challenge('c', [url1]);
      const challenges = [ch1, ch2, ch3];
      const course = new Course(challenges);

      // when
      const tubes = assessmentService._computeTubesOfCourse(course);      

      // then
      const expectedTubes = {'web': [4, 5], 'url': [1]};
      expect(tubes).to.deep.equal(expectedTubes);
    });

    it('should return a dictionary of tubes when some challenges require multiple skills', function() {
      // given
      const web4 = new Skill('web', 4);
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const url2 = new Skill('url', 2);
      const ch1 = new Challenge('a', [web4, url1]);
      const ch2 = new Challenge('b', [web5]);
      const ch3 = new Challenge('c', [url2]);
      const challenges = [ch1, ch2, ch3];
      const course = new Course(challenges);

      // when
      const tubes = assessmentService._computeTubesOfCourse(course);      

      // then
      const expectedTubes = {'web': [4, 5], 'url': [1, 2]};
      expect(tubes).to.deep.equal(expectedTubes);
    });

    it('should return a dictionary of tubes which difficulties are ordered by value', function() {
      // given
      const web1 = new Skill('web', 1);
      const web4 = new Skill('web', 4);
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const url2 = new Skill('url', 2);
      const ch1 = new Challenge('a', [web5, url2]);
      const ch2 = new Challenge('b', [web4, url1, web1]);
      const challenges = [ch1, ch2];
      const course = new Course(challenges);

      // when
      const tubes = assessmentService._computeTubesOfCourse(course);      

      // then
      const expectedTubes = {'web': [1, 4, 5], 'url': [1, 2]};
      expect(tubes).to.deep.equal(expectedTubes);
    });
  });

  describe('#_filterChallenges()', function() {
    it('should exist', function() {
      expect(assessmentService._filterChallenges).to.exist;
    });

    it('should return challenges that have not been already answered', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const url3 = new Skill('url', 3);
      const ch1 = new Challenge('a', [web1]);
      const ch2 = new Challenge('b', [web2]);
      const ch3 = new Challenge('c', [url3]);
      const answer1 = new Answer(ch2, 'ok');
      const answer2 = new Answer(ch3, 'ok');
      const challenges = [ch1, ch2, ch3];

      // when
      const filteredChallenges = assessmentService._filterChallenges(challenges, [answer1, answer2]);

      // then
      expect(filteredChallenges).to.deep.equal([ch1]);
    });
  });

  describe.skip('#_computeLikelihood()', function() {
    it('should exist', function() {
      expect(assessmentService._computeLikelihood).to.exist;
    });

    it('should return a value', function() {
      // given
      /* const answer1 = new Answer('a', 'ok');
      const answer2 = new Answer('b', 'ko'); */
      const ch1 = new Challenge('a', 'web4');
      const ch2 = new Challenge('b', 'web5');
      const ch3 = new Challenge('c', 'url1');
      const q1 = new Question(4, 1);
      const q2 = new Question(5, 0);
      const history = [q1, q2];
      // console.log(history);
      const challenges = [ch1, ch2, ch3];
      const course = new Course(challenges);

      // when


      // then
      const expectedTubes = {'web': [4, 5], 'url': [1]};
      const likelihoodValues = [3.5, 4.5, 5.5].map(level => assessmentService._computeLikelihood(level, history));
      expect(likelihoodValues).to.deep.equal([1, 2, 3]);
    });
  });
});
