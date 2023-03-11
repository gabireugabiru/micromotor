import * as PIXI from "pixi.js"
import { Road } from "./road";

type LastRoad = {
    x: number,
    y: number,
    orientation: string
}

class Game {
    grid: Road[][]
    app: PIXI.Application
    grid_size: number
    grid_overlay?: PIXI.Graphics
    draggin: boolean
    last_road: LastRoad | null
    pos: {
        x: number,
        y: number,
    }
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
        this.last_road = null;
        this.draggin = false;
        this.pos = {
            x: 0,
            y: 0
        }
        for (let i = 0; i < (500 / grid_size); i++) {
            const row = []
            for (let j = 0; j < (500 / grid_size); j++) {
                const road = new Road(i, j, "stand", grid_size);
                road.sprite.interactive = true;
                road.sprite.cursor = "pointer";
                road.sprite.on("pointerdown", ev => {
                    let sprite_real = ev.target;
                    this.draggin = true;
                })
                road.sprite.on("pointerover", (ev) => {
                    if (!ev) return;
                    const { x, y } = this.pos;
                    console.log({ x: x % grid_size, y: y % grid_size, x1: x, y1: y })
                });


                row.push(road);


                this.grid.push(row);
            }

            this.app.stage.on("pointermove", ev => {
                this.pos = ev.data.global
                // if (this.draggin) {

                //     this.updateGrid(x / grid_size, y / grid_size);
                // }
            })

            const putaria = () => {
                this.draggin = false;
                this.last_road = null;
            }
            this.app.stage.on("pointerup", putaria);
            this.app.stage.on("pointerupoutside", putaria);
        }
    }

    updateGrid(x: number, y: number) {
        x = Math.floor(x);
        y = Math.floor(y);
        x = Math.min((500 / this.grid_size) - 1, x);
        y = Math.min((500 / this.grid_size) - 1, y);
        x = Math.max(0, x);
        y = Math.max(0, y);

        type Direction = "LEFT" | "RIGHT" | "BOTTOM" | "TOP" | "NONE";

        let in_relation: Direction = "NONE";
        if (this.last_road) {
            if (this.last_road.x < x) {
                in_relation = "RIGHT"
            }
            if (this.last_road.x > x) {
                in_relation = "LEFT"
            }
            if (this.last_road.y > y) {
                in_relation = "TOP"
            }
            if (this.last_road.y < y) {
                in_relation = "BOTTOM"
            }
        }





        if (this.grid[x][y].is_placed) {
            this.last_road = {
                orientation: this.grid[x][y].orientation,
                x,
                y,
            }
            return
        }

        if (this.last_road) {
            if (this.last_road.orientation == "stand"
                || this.last_road.orientation.includes("row")) {
                console.log(in_relation);
                this.grid[x][y].set_orientation(`row-${in_relation === "LEFT" || in_relation === "RIGHT" ? "h" : "v"}`);
            }
            console.log({
                in_relation, a: this.last_road.orientation
            })
            if (in_relation == "RIGHT" && this.last_road.orientation == "row-v") {
                this.grid[this.last_road.x][this.last_road.y].set_orientation("bottom-right");
                this.grid[this.last_road.x][this.last_road.y].place();
            }
        }

        this.grid[x][y].place();
        this.last_road = {
            orientation: this.grid[x][y].orientation,
            x,
            y,
        }

    }


    drawSprites() {
        for (const row of this.grid) {
            for (const road of row) {
                this.app.stage.addChild(road.sprite);
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
const game = new Game(100);

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