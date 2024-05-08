import { Timer } from "../Timer"

type color = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan' | 'white' | 'black' | `rgb(${number},${number},${number})`

abstract class Simulation {
    cellsize: number
    grid: number[][]
    framerate: number
    pause: boolean
    timer: Timer
    width: number
    height: number
    abstract HTML: { [key: string]: HTMLElement & any }

    constructor(cellsize: number, width: number, height: number, framerate: number) {
        this.cellsize = cellsize
        this.width = width
        this.height = height
        this.grid = []
        this.setup_grid(width, height)
        this.framerate = framerate
        this.pause = false
        this.timer = new Timer(framerate)
    }
    setup_grid(width: number, height: number) {
        for (let y = 0; y < height/this.cellsize; y++) {
            this.grid[y] = []
            for (let x = 0; x < width/this.cellsize; x++)
                this.grid[y][x] = 0
        }
    }
    abstract control(): void
    render(context: CanvasRenderingContext2D, dead: color, alive: color) {
        context.fillStyle = alive
        context.strokeStyle = dead
        this.grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell == 1)
                    context.fillRect(this.cellsize * x, this.cellsize * y, this.cellsize, this.cellsize)
                else if (cell == 0)
                    context.strokeRect(this.cellsize * x, this.cellsize * y, this.cellsize, this.cellsize)
            })
        })
    }
    abstract update(): void
    abstract injectHTML(): void
    abstract hookHTML(): void
}

export { Simulation }
