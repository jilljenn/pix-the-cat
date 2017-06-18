class Challenge {
  constructor(id, skills) {
    this.id = id;
    this.skills = skills;
  }

  get hardestSkill() {
    return this.skills.sort((s1, s2) => s1.difficulty - s2.difficulty).slice(-1)[0];
  }
}

module.exports = Challenge;
