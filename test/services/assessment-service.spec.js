const expect = require('chai').expect;
const assessmentService = require('../../src/services/assessment-service');
const Course = require('../../src/models/course');
const Challenge = require('../../src/models/challenge');
const Answer = require('../../src/models/answer');
const Skill = require('../../src/models/skill');


describe('Unit | Service | assessmentService', function() {
  describe('#getNextChallenge()', function() {
    it('should exist', function() {
      expect(assessmentService.getNextChallenge).to.exist;
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
