//SoundBoard is a map that associates a name with an array that contains n copys of the same sound. n is defined in loaders.js and passed in the constructor
export default class SoundBoard{
    constructor(n){
        this.n = n;
        this.sounds = new Map();

        //used to store the index of the audio element that should be played next
        this.playIndexes = new Map();
    } 

    //if a sound is pushed with the same name, it adds to the array, otherwise it adds a new entry
    define(name, audio){
        if(this.sounds.has(name)){
            this.sounds.get(name).push(audio);
        }else{
            this.sounds.set(name, [audio]);
            this.playIndexes.set(name, 0);
        }
    }   

    //plays the sound at the playIndex'th spot in the array and updates playIndex
    play(name){
        const soundArray = this.sounds.get(name);
        const i = this.playIndexes.get(name);

        soundArray[i].play();

        this.playIndexes.set(name, (i+1)%this.n);
    }

    getSound(name){
        return this.sounds.get(name);
    }
}