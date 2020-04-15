let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],

};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    altSpaceshipSpeed: 5,
    gameTimer: 60000    
}

//reserve some keyboard variabled
let keyF, keyLEFT, keyRIGHT;