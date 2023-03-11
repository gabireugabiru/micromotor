/*
"use strict";
class Game {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 5; i++) {
            let putaria = [];
            for (let i = 0; i < 5; i++) {
                putaria.push(new PIXI.Sprite(PIXI.Texture.WHITE));
            }
            this.grid.push(putaria);
        }
        this.app = new PIXI.Application({ width: 500, height: 500 });
        document.querySelector("body").appendChild(this.app.view);
    }
    run() {
        // const a = new PIXI.Sprite(PIXI.Texture.WHITE);
        // this.app.stage.addChild(a);
        // this.app.ticker.add(delta => {
        let x = 0;
        let y = 0;
        for (const array of this.grid) {
            x = 0;
            for (let sprite of array) {
                sprite.x = x * 100;
                sprite.y = y * 100;
                sprite.width = 100;
                sprite.height = 100;
                sprite.border;
                sprite.tint = 0x80ff80;
                console.log(x);
                this.app.stage.addChild(sprite);
                x += 1;
            }
            y += 1;
        }
        // });
    }
}
const game = new Game();
game.run();
*/










const Application = PIXI.Application;

const app = new Application({
    width: 505,
    height: 505,
    backgroundColor: 0x80ff80,
    trasparent: false,
    antialias: true
});

app.renderer.backgroundColor = 0x80ff80;

//app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);

let myGraph = new PIXI.Graphics();

for (var i = 5; i < 500; i = i + 6) {
    myGraph.moveto(i, 5);
    myGraph.lineto(i, 500);

    myGraph.moveto(5, i);
    myGraph.lineto(500, i);

    myGraph.strokestyle = "0xffffff";
    myGraph.stroke();
}
/*
const container = new PIXI.Container();
var grid = 25;
let selected = []
let selectedColor = 1;
//let hoverColor = 0.2;
//let mapColor = 0.1;
app.stage.addChild(container);
for (let i = 0; i < (500 / grid); i++) {
    for (var j = 0; j < (500 / grid); j++) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xffb0b0b0);
        graphics.drawRect(5 + (grid * j), 5 + (grid * i), 20, 20);
        container.addChild(graphics);
    }
}
*/
