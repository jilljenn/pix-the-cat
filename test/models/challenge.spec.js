const expect = require('chai').expect;
const Challenge = require('../../src/models/challenge');
const Skill = require('../../src/models/skill');

describe('Unit | Model | Challenge', function() {

  describe('#hardestSkill', function() {
    it('should exist', function() {
      // given
      const url1 = new Skill('url', 1);
      const challenge = new Challenge('recXXX', [url1]);

      // then
      expect(challenge.hardestSkill).to.exist;
    });

    it('should be web5 if challenge requires url1 and web5', function() {
      // given
      const web5 = new Skill('web', 5);
      const url1 = new Skill('url', 1);
      const challenge = new Challenge('recXXX', [url1, web5]);

      // then
      expect(challenge.hardestSkill).to.equal(web5);
    });
  });
});
