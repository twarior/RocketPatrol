//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y ,texture, frame) {
        super(scene, x, y, texture, frame);

        //add an object to the existing scene, dsiplay list and update list
        scene.add.existing(this);

        //track rockets firing status
        this.isFiring = false;
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
            }
            if(keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
            }
        }

        //fire button 
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }

        //if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.y -=2; 
        }

        //reset on miss
        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
    }

}