import { Timer } from "./Timer"
import { keyboard } from "./keyboard"
import { mouse } from "./mouse"
import { resize, canvas, context } from "./graphics"
import { deepcopy } from "./utilities"

resize(canvas)

const size = 50
let grid: number[][] = [ ]

for (let y = 0; y < canvas.height/size; y++) {
    grid[y] = []
    for (let x = 0; x < canvas.width/size; x++)
        grid[y][x] = 0
}

var pause = true

const timer = new Timer(1000)

let previous = Date.now()
let current = Date.now()

function frameloop() {
    const delta = current - previous
    previous = current
    timer.count += delta

    if (keyboard.has('Enter'))
        pause = false
    if (mouse.click == true)
        pause = true

    context.clearRect(0, 0, canvas.width, canvas.height)

    const gridx = Math.floor(mouse.x/size)
    const gridy = Math.floor(mouse.y/size)

    if (mouse.click == true) {
        if (grid[gridy][gridx] == 0)
            grid[gridy][gridx] = 1
        else
            grid[gridy][gridx] = 0
        mouse.click = false
    }

    if (timer.count >= timer.duration) {
        timer.restart()
        if (pause == false) { 
            const grid0 = deepcopy(grid);
            grid.forEach((row, y) => {
                row.forEach((cell, x) => {
                    const neighbors = {
                        topleft: grid[y - 1]?.[x - 1] ?? 0,
                        top: grid[y - 1]?.[x] ?? 0,
                        topright: grid[y-1]?.[x + 1] ?? 0,
                        left: grid[y]?.[x - 1] ?? 0,
                        right: grid[y]?.[x + 1] ?? 0,
                        bottomleft: grid[y + 1]?.[x - 1] ?? 0,
                        bottommid: grid[y + 1]?.[x] ?? 0,
                        bottomright: grid[y + 1]?.[x + 1] ?? 0,
                    }
                    let sum = 0

                    for (const neighbor of Object.values(neighbors))
                        sum += neighbor

                    if (cell == 1 && sum < 2)
                        grid0[y][x] = 0
                    else if (cell == 1 && (sum == 2 || sum == 3))
                        grid0[y][x] = 1
                    else if (sum > 3)
                        grid0[y][x] = 0
                    else if (cell == 0 && sum == 3)
                        grid0[y][x] = 1
                })
            })
            grid = grid0
        }
    }
    
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell == 1)
                context.fillRect(size * x, size * y, size, size)
            else if (cell == 0)
                context.strokeRect(size * x, size * y, size, size)
        })
    })

    current = Date.now()
    requestAnimationFrame(frameloop)
}

frameloop()
