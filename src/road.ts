import * as PIXI from "pixi.js";


const sprites = {
    "stand": () => PIXI.Texture.from("assets/4entAllS.png"),
    "row-v": () => PIXI.Texture.from("assets/2entTD.png"),
    "row-h": () => PIXI.Texture.from("assets/2entRL.png"),
    "bottom-right": (sprite: PIXI.Sprite) => {
        let texture = PIXI.Texture.from("assets/2entDiag.png");
        sprite.scale.x *= -1;
        sprite.anchor.set(1, 0);
        return texture;
    }

}

export class Road {
    x: number
    y: number
    orientation: string
    is_placed: boolean
    sprite: PIXI.Sprite
    posX: number
    posY: number
    constructor(x: number, y: number, orientation: string, grid_size: number) {
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.is_placed = false;
        this.sprite = new PIXI.Sprite();
        this.posX = x * grid_size;
        this.posY = y * grid_size;
        this.sprite.x = this.posX;
        this.sprite.y = this.posY;
        this.sprite.width = grid_size;
        this.sprite.height = grid_size;

    }
    place() {
        this.is_placed = true;
        console.log(this.orientation);
        this.sprite.texture = (sprites as any)[this.orientation](this.sprite);
    }
    set_orientation(orientation: string) {
        this.orientation = orientation;
    }
}