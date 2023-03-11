import * as PIXI from "pixi.js"


class Game {
    grid: PIXI.Sprite[][]
    app: PIXI.Application
    grid_size: number
    grid_overlay?: PIXI.Graphics
    draggin: boolean

    constructor(grid_size: number) {
        this.grid_size = grid_size;
        this.app = new PIXI.Application({
            width: 500,
            height: 500,
            backgroundColor: 0x80ff80,
            trasparent: false,
            antialias: true
        } as any);
        this.app.renderer.backgroundColor = 0x80ff80;
        document.body.appendChild(this.app.view);
        this.grid = []
        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.screen
        this.draggin = false;

        const a = localStorage.getItem("pau");
        let b: number[][] | null = null;
        try {
            b = JSON.parse(a || "")
        } catch (err) {
            b = null
        }

        for (let i = 0; i < (500 / grid_size); i++) {
            const row = []
            for (let j = 0; j < (500 / grid_size); j++) {
                const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
                sprite.x = i * grid_size;
                sprite.y = j * grid_size;
                sprite.width = grid_size;
                sprite.height = grid_size;
                sprite.interactive = true;
                sprite.cursor = "pointer";
                sprite.on("pointerdown", ev => {
                    let sprite_real = ev.target;
                    this.updateGrid(sprite_real.x / grid_size, sprite_real.y / grid_size);
                    this.draggin = true;
                })

                if ((j + i) % 2 == 0) {
                    sprite.tint = 0xffff87fd;
                } else {
                    sprite.tint = 0xfffff982;
                }

                if (b) {
                    if (b[i][j] === 1) {
                        sprite.tint = 0x0;
                    }
                }

                row.push(sprite);
            }

            this.grid.push(row);
        }

        this.app.stage.on("pointermove", ev => {
            if (this.draggin) {
                let { x, y } = ev.data.global;

                console.log('X', x, 'Y', y);

                this.updateGrid(x / grid_size, y / grid_size);
            }
        })

        const putaria = () => {
            this.draggin = false;
        }
        this.app.stage.on("pointerup", putaria);
        this.app.stage.on("pointerupoutside", putaria);


        console.log(this.grid);
    }

    updateGrid(x: number, y: number) {
        x = Math.floor(x);
        y = Math.floor(y);
        x = Math.min((500 / this.grid_size) - 1, x);
        y = Math.min((500 / this.grid_size) - 1, y);
        x = Math.max(0, x);
        y = Math.max(0, y);

        this.grid[x][y].tint = 0x0000000000000;



        localStorage.setItem("pau", JSON.stringify(this.grid.map(a => {
            return a.map(b => {
                return b.tint === 0x0 ? 1 : 0
            })
        })));
    }


    drawSprites() {
        for (const row of this.grid) {
            for (const sprite of row) {
                this.app.stage.addChild(sprite);
            }
        }
    }

    drawGrid() {

        let myGraph = new PIXI.Graphics();

        myGraph.moveTo(0, 0);
        for (var i = 0; i <= 500; i = i + this.grid_size) {
            myGraph.lineStyle(1, 0x000000);
            myGraph.moveTo(i, 0);
            myGraph.lineTo(i, 500);

            myGraph.moveTo(0, i);
            myGraph.lineTo(500, i);

        }
        this.grid_overlay = myGraph;
        this.app.stage.addChild(this.grid_overlay);
    }

    removeGrid() {
        if (this.grid_overlay) {
            this.app.stage.removeChild(this.grid_overlay);
            this.grid_overlay = undefined;
        }
    }

}



const game = new Game(10);
game.drawSprites();

window.onkeydown = ev => {
    if (ev.key == "g") {
        if (game.grid_overlay) {
            game.removeGrid();
        } else {
            game.drawGrid();
        }
    }
}