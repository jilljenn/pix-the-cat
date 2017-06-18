const expect = require('chai').expect;
const Course = require('../../src/models/course');
const Assessment = require('../../src/models/assessment');
const Answer = require('../../src/models/answer');
const Challenge = require('../../src/models/challenge');
const Skill = require('../../src/models/skill');

describe('Unit | Model | Assessment', function() {
  
  describe('#_probaOfCorrectAnswer()', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment._probaOfCorrectAnswer).to.exist;
    });

    it('should return 1/2 if difficulty equals level', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // when
      const proba = assessment._probaOfCorrectAnswer(3, 3);

      // then
      expect(proba).to.equal(0.5);
    });

    it('should return something lesser than 1/2 if difficulty is higher than level', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // when
      const proba = assessment._probaOfCorrectAnswer(3, 4);

      // then
      expect(proba).to.be.below(0.5);
    });
  });

  describe('#_computeLikelihood()', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then      
      expect(assessment._computeLikelihood).to.exist;
    });

    it('should return likelihood values for different levels', function() {
      // given
      const web4 = new Skill('web', 4);
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const ch1 = new Challenge('a', [web4]);
      const ch2 = new Challenge('b', [web5]);
      const ch3 = new Challenge('c', [url1]);
      const challenges = [ch1, ch2, ch3];
      const answer1 = new Answer(ch1, 'ok');
      const answer2 = new Answer(ch2, 'ko');
      const answers = [answer1, answer2];
      const course = new Course(challenges);
      const assessment = new Assessment(course);

      // when
      const likelihoodValues = [3.5, 4.5, 5.5].map(level => assessment._computeLikelihood(level, answers));      

      // then
      expect(likelihoodValues).to.deep.equal([-0.44003380739549824, -0, -0.44003380739549824]);
    });

    it('should return negative values every time', function() {
      // given
      const web4 = new Skill('web', 4);
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const ch1 = new Challenge('a', [web4]);
      const ch2 = new Challenge('b', [web5]);
      const ch3 = new Challenge('c', [url1]);
      const challenges = [ch1, ch2, ch3];
      const answer1 = new Answer(ch1, 'ok');
      const answer2 = new Answer(ch2, 'ko');
      const answers = [answer1, answer2];
      const course = new Course(challenges);
      const assessment = new Assessment(course);

      // when
      const likelihoodValues = [1.2, 3.4, 5.6].map(level => assessment._computeLikelihood(level, answers));

      // then
      likelihoodValues.forEach(likelihoodValue => expect(likelihoodValue).to.be.below(0));
    });
  });
});
