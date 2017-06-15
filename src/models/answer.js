class Answer {
    constructor(challenge, result) {
        this.challenge = challenge;
        this.result = result;
    }

    get maxDifficulty() {
        const difficulties = this.challenge.skills.map(skill => skill.difficulty);
        return Math.max(...difficulties);
    }
}

module.exports = Answer;
