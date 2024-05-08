import { Simulation } from "./Simulation"

type Rule = [ 1 | 0, 1 | 0, 1 | 0]
type Activation = 1 | 0

type Ancestors = { topleft: number, topmiddle: number, topright: number}

class Wolfram extends Simulation {
    rules: Array<[Rule, Activation]> = [
        [ [1, 1, 1], 0 ], 
        [ [1, 1, 0], 0 ],
        [ [1, 0, 1], 0 ],
        [ [1, 0, 0], 0 ],
        [ [0, 1, 1], 0 ],
        [ [0, 1, 0], 0 ],
        [ [0, 0, 1], 0 ],
        [ [0, 0, 0], 0 ]
    ]
    HTML: { [key: string]: any } = {}
    line: number
    
    constructor(cellsize: number, width: number, height: number, framerate: number) { 
        super(cellsize, width, height, framerate)
        this.line = 0
        this.grid[0][Math.floor(this.grid[0].length/2)] = 1
    }
    nearby(generation: number[], i: number): Ancestors {
        return {
            topleft: generation[i-1],
            topmiddle: generation[i],
            topright: generation[i+1],
        }
    }
    mutate(generation: number[], i: number, ancestors: Ancestors): void {
        for (const rule of this.rules) {
            if (rule[1] == 0)
                continue
            
            if (ancestors.topleft == rule[0][0] && 
                ancestors.topmiddle == rule[0][1] && 
                ancestors.topright == rule[0][2]) {
                    generation[i] = 1
                }
        }
    }
    iterate() {
        let previous_gen = this.grid[this.line]
        let new_gen = this.grid[this.line + 1]

        for (let i = 1; i < this.grid[0].length-1; i++) {
            const ancestors = this.nearby(previous_gen, i)
            this.mutate(new_gen, i, ancestors)
        }
        this.grid[this.line+1] = new_gen
        this.line++
    }
    update(): void {
        if (this.line >= this.grid.length - 1)
            return
        this.iterate()
    }
    injectHTML(): void {
        document.body.insertAdjacentHTML('beforeend', HTML)
    }
    hookHTML(): void {
        const rules_html = document.querySelectorAll(".rule")

        for (let i = 0; i < rules_html.length; i++) {
            const rule = rules_html[i]
            rule.addEventListener('click', () => {
                const activation = rule.children[1].children[0]
        
                if (activation.classList.contains('on')) {
                    activation.classList.remove("on")
                    activation.classList.add("off")
                    this.rules[i][1] = 0
                } 
                else {
                    activation.classList.remove("off")
                    activation.classList.add("on")
                    this.rules[i][1] = 1
                }
                
                this.line = 0
                this.setup_grid(this.width, this.height)
                this.grid[0][Math.floor(this.grid[0].length/2)] = 1
            })
        }
    }
    control() {
    }
}

const HTML = `
<div class='rules'>
        <div class='rule'>
            <div class='definition'>
                <div class='on'></div>
                <div class='on'></div>
                <div class='on'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='on'></div>
                <div class='on'></div>
                <div class='off'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='on'></div>
                <div class='off'></div>
                <div class='on'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='on'></div>
                <div class='off'></div>
                <div class='off'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='off'></div>
                <div class='on'></div>
                <div class='on'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='off'></div>
                <div class='on'></div>
                <div class='off'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='off'></div>
                <div class='off'></div>
                <div class='on'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
        <div class='rule'>
            <div class='definition'>
                <div class='off'></div>
                <div class='off'></div>
                <div class='off'></div>
            </div>
            <div class='activation'>
                <div class='off'></div>
            </div>
        </div>
    </div>`

export { Wolfram }
