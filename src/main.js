//Tennessee Phillips Ward 
//
//Starting Tier: Implement Speed increase after half time (10),
//Allow the player to control the Rocket after it's fired (10).
//Novice Tier: Display the remaining time in seconds (15), 
//Implement parallax scrolling (15).
//Intermediate Tier: Create a new spaceship type with new artwork... (25), 
//Create new in-game assets (rocket, spaceships, explosion) (25)
//
//Starting Rocket Patrol Code from Nathan Altice. 

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