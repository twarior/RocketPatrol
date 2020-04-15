class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images and teh tile sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('altSpaceship', './assets/altSpaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //white rectangle boarders
        this.add.rectangle(5, 5, 630, 32, 0xAA00AA).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xAA00AA).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xAA00AA).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xAA00AA).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0,0);

        //add rocket (p1)
        //constructor(scene, x, y ,texture, frame) [what we need here]
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(.8, .8).setOrigin(0,0);

        //spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);
        
        //altSpaceship 
        //this.altSpaceship = new AltSpaceship(this, game.config.width, 233, 'altSpaceship', 0, 50).setOrigin(0,0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //time remaining display
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let timeRemaining = game.settings.gameTimer/1000;
        this.timeLeft = this.add.text(219, 54, timeRemaining, timeConfig);
        //for(let i = 0; i < game.settings.gameTimer/1000; i++){

        //}


        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ⟵ for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //at half time, increase the speed of the rockets
        if(game.settings.gameDifficulty == 'Easy'){
            this.clock = this.time.delayedCall(game.settings.gameTimer/2, () => {
            game.settings.spaceshipSpeed += 2;}, null, this);
            console.log("eas")
        }
        if(game.settings.gameDifficulty == 'Hard'){
            this.clock = this.time.delayedCall(game.settings.gameTimer/2, () => {
            game.settings.spaceshipSpeed += 3;}, null, this)
            console.log("hgard");
        }
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        //scroll starfield
        this.starfield.tilePositionX -= 4;
        
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.time.delayedCall(1000, () => {this.timeRemaining -= 1}, null, this);
        this.timeLeft.text = this.timeRemaining;
        //console.log(this.timeRemaining);
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.y < ship.y + ship.width && 
            rocket.y + rocket.width > ship.y && 
            rocket.x < ship.x + ship.height &&
            rocket.height + rocket.x > ship. x) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        }); 
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion');        
    }
}