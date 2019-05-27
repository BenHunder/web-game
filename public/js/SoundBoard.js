export default class SoundBoard{
    constructor(sounds){
        this.sounds = new Map();
    } 

    define(name, audio){
        this.sounds.set(name, audio);
    }

    play(name){
        this.sounds.get(name).play();
    }

    getSound(name){
        return this.sounds.get(name);
    }
}