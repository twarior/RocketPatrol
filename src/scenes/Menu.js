class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        //display menu text
        this.add.text(20, 20, "This doth be a Rocket Patrol Menu");
        //launches the next scne
        this.scene.start("playScene");
    }
}