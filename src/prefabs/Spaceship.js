//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y ,texture, frame, pointValue, spaceshipSpeed) {
        super(scene, x, y, texture, frame);

        //add an object to the existing scene, dsiplay list and update list
        scene.add.existing(this);
        this.points = pointValue;
        this.speed = spaceshipSpeed;

    }

    update() {
        //move spaceship left
        this.x -= this.speed;
        //wrap around screen bounds
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }

}