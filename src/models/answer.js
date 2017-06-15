class Answer {
    constructor(challenge, result) {
        this.challenge = challenge;
        this.result = result;
    }

    get difficulty() {
        return new Skill(this.challenge.skill).difficulty
    }
}

module.exports = Answer;
