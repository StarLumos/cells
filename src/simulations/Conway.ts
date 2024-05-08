import { keyboard } from "../keyboard"
import { mouse } from "../mouse"
import { deepcopy } from "../utilities"
import { Simulation } from "./Simulation"

class Conway extends Simulation {
    HTML: { [key: string]: any } = {}
    
    constructor(cellsize: number, width: number, height: number, framerate: number) {
        super(cellsize, width, height, framerate)
    }
    protected nearby(y: number, x: number) {
        return {
            topleft: this.grid[y - 1]?.[x - 1] ?? 0,
            top: this.grid[y - 1]?.[x] ?? 0,
            topright: this.grid[y-1]?.[x + 1] ?? 0,
            left: this.grid[y]?.[x - 1] ?? 0,
            right: this.grid[y]?.[x + 1] ?? 0,
            bottomleft: this.grid[y + 1]?.[x - 1] ?? 0,
            bottommid: this.grid[y + 1]?.[x] ?? 0,
            bottomright: this.grid[y + 1]?.[x + 1] ?? 0,
        }
    }
    protected mutate(grid: number[][], y: number, x: number, sum: number) {
        const cell = grid[y][x]
        if (cell == 1 && sum < 2)
            grid[y][x] = 0
        else if (cell == 1 && (sum == 2 || sum == 3))
            grid[y][x] = 1
        else if (sum > 3)
            grid[y][x] = 0
        else if (cell == 0 && sum == 3)
            grid[y][x] = 1
    }
    protected iterate(): number[][] {
        let grid0 = deepcopy(this.grid);
        this.grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                const neighbors = this.nearby(y, x)
    
                let sum = 0
                for (const neighbor of Object.values(neighbors))
                    sum += neighbor
    
                this.mutate(grid0, y, x, sum)
            })
        })
        return grid0
    }
    update(): void {
        this.grid = this.iterate()
    }
    injectHTML(): void {
        document.body.insertAdjacentHTML('beforeend', `
        <div class='sliders'>
            <h3>Timer speed</h3>
            <input type='range' min='500' max='10000' value='1' id='time-slider'>
        </div>`);
    }
    hookHTML() {
        this.HTML = {
            time: (document.getElementById('time-slider') as HTMLInputElement),
        }
        this.HTML.time.addEventListener('input', () => {
            this.timer.duration = parseInt(this.HTML.time.value)
            this.timer.restart()
        })
    }
    control() {
        if (keyboard.has('Enter'))
            this.pause = false
        if (mouse.click == true)
            this.pause = true

        const gridx = Math.floor(mouse.x/this.cellsize)
        const gridy = Math.floor(mouse.y/this.cellsize)
        
        if (mouse.click == true) {
            if (this.grid[gridy][gridx] == 0)
                this.grid[gridy][gridx] = 1
            else
                this.grid[gridy][gridx] = 0
            mouse.click = false
        }
    }
}

export { Conway }
