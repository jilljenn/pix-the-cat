const expect = require('chai').expect;
const Answer = require('../../src/models/answer');
const Skill = require('../../src/models/skill');
const Challenge = require('../../src/models/challenge');

describe('Unit | Model | Answer', function() {
  describe('#maxDifficulty()', function() {
    it('should exist', function() {
      // given
      const url1 = new Skill('url', 1);
      const challenge = new Challenge('recXXX', [url1]);
      const answer = new Answer(challenge, 'ko');

      // then
      expect(answer.maxDifficulty).to.exist;
    });

    it('should return the maximal skill difficulty of a challenge', function() {
      // given
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const challenge = new Challenge('recXXX', [url1, web5]);
      const answer = new Answer(challenge, 'ok');

      // when
      const maxDifficulty = answer.maxDifficulty;

      // then
      expect(maxDifficulty).to.equal(5);
    });
  });
});
