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
      const assessment = new Assessment(course, answers);

      // when
      const likelihoodValues = [3.5, 4.5, 5.5].map(level => assessment._computeLikelihood(level, assessment.answers));      

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
      const assessment = new Assessment(course, answers);

      // when
      const likelihoodValues = [1.2, 3.4, 5.6].map(level => assessment._computeLikelihood(level, assessment.answers));

      // then
      likelihoodValues.forEach(likelihoodValue => expect(likelihoodValue).to.be.below(0));
    });
  });

  describe('#estimatedLevel', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then      
      expect(assessment.estimatedLevel).to.exist;
    });

    it('should return 2 if user did not provide any answers so far', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then      
      expect(assessment.estimatedLevel).to.be.equal(2);
    });

    it('should return 4.5 if user answered correctly a question of maxDifficulty 4 but failed at 5', function() {
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
      const assessment = new Assessment(course, answers);

      // when
      const estimatedLevel = assessment.estimatedLevel;

      // then
      expect(estimatedLevel).to.equal(4.5);
    });
  });

  describe('#validatedSkills', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then      
      expect(assessment.validatedSkills).to.exist;
    });

    it('should return [web1, web3] if the user answered correctly a question that requires web3', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const web3 = new Skill('web', 3);
      const url3 = new Skill('url', 3);
      const url4 = new Skill('url', 4);
      const url5 = new Skill('url', 5);
      const url6 = new Skill('url', 6);
      const ch1 = new Challenge('a', [web3]);
      const ch2 = new Challenge('b', [web1, web3, url3, url4, url5, url6]);
      const course = new Course([ch1, ch2]);
      const answer = new Answer(ch1, 'ok');
      const assessment = new Assessment(course, [answer]);

      // then      
      expect([...assessment.validatedSkills]).to.be.deep.equal([web1, web3]);
    });
  });

  describe('#failedSkills', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then      
      expect(assessment.failedSkills).to.exist;
    });

    it('should return [url5, url6, url8] if the user fails a question that requires web1 and url5', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const web3 = new Skill('web', 3);
      const url3 = new Skill('url', 3);
      const url4 = new Skill('url', 4);
      const url5 = new Skill('url', 5);
      const url6 = new Skill('url', 6);
      const url8 = new Skill('url', 8);
      const ch1 = new Challenge('a', [web1, url5]);
      const ch2 = new Challenge('b', [web2, web3, url3, url4, url6, url8]);
      const course = new Course([ch1, ch2]);
      const answer = new Answer(ch1, 'ko');
      const assessment = new Assessment(course, [answer]);

      // then      
      expect([...assessment.failedSkills]).to.be.deep.equal([url5, url6, url8]);
    });
  });

  describe('#filteredChallenges', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment.filteredChallenges).to.exist;
    });

    it('should return challenges that have not been already answered', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const url3 = new Skill('url', 3);
      const ch1 = new Challenge('a', [web1]);
      const ch2 = new Challenge('b', [web2]);
      const ch3 = new Challenge('c', [url3]);
      const answerCh2 = new Answer(ch2, 'ok');
      const answerCh3 = new Answer(ch3, 'ok');
      const challenges = [ch1, ch2, ch3];
      const course = new Course(challenges);
      const assessment = new Assessment(course, [answerCh2, answerCh3]);

      // then
      expect(assessment.filteredChallenges).to.deep.equal([ch1]);
    });

    it('should return an empty array when all challenges have been answered', function() {
      // given
      const web1 = new Skill('web', 1);
      const ch1 = new Challenge('a', [web1]);
      const answerCh1 = new Answer(ch1, 'ok');
      const course = new Course([ch1]);
      const assessment = new Assessment(course, [answerCh1]);

      // then
      expect(assessment.filteredChallenges).to.deep.equal([]);
    });
  });

  describe('#_computeReward()', function() {
    it('should exist', function() {
      // given
      const course = new Course([]);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment._computeReward).to.exist;
    });

    it('should be 2 if challenge requires web2 within web1-2-3 and no answer has been given yet', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const web3 = new Skill('web', 3);
      const ch1 = new Challenge('recXXX', [web2]);
      const ch2 = new Challenge('recYYY', [web1, web3]);
      const course = new Course([ch1, ch2]);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment._computeReward(ch1)).to.equal(2);
    });

    it('should be 2.73 if challenge requires url3 within url2-3-4-5 and no answer has been given yet', function() {
      // given
      const url2 = new Skill('url', 2);
      const url3 = new Skill('url', 3);
      const url4 = new Skill('url', 4);
      const url5 = new Skill('url', 5);
      const ch1 = new Challenge('recXXX', [url3]);
      const ch2 = new Challenge('recYYY', [url2, url4, url5]);
      const course = new Course([ch1, ch2]);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment._computeReward(ch1)).to.equal(2.7310585786300052);
    });
  });

  describe('#nextChallenge', function() {
    it('should exist', function() {
      // given
      const web1 = new Skill('web', 1);
      const challenge = new Challenge('recXXX', [web1]);
      const course = new Course([challenge]);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment.nextChallenge).to.exist;
    });

    it('should return a challenge that requires web2 if web1-2-3 is the tube and no answer has been given so far', function() {
      // given
      const web1 = new Skill('web', 1);
      const web2 = new Skill('web', 2);
      const web3 = new Skill('web', 3);
      const ch1 = new Challenge('a', [web1]);
      const ch2 = new Challenge('b', [web2]);
      const ch3 = new Challenge('c', [web3]);
      const answerCh2 = new Answer(ch2, 'ok');
      const answerCh3 = new Answer(ch3, 'ok');
      const challenges = [ch1, ch2, ch3];
      const course = new Course(challenges);
      const assessment = new Assessment(course, []);

      // then
      expect(assessment.nextChallenge).to.equal(ch2);
    });

    it('should return a challenge of level 5 if user got levels 2-4 ok but level 6 ko', function() {
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

      // then
      expect(assessment.nextChallenge).to.equal(ch5);
    });
  });
});
