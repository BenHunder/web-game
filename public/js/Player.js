export default class Player{
    constructor(){
        this.health = 100;
        this.score = 0;
        this.weapon = null;
        this.food = null;
    }

    damage(amount){
        this.health -= amount;
    }

    score(amount){
        this.score += amount;
    }
}