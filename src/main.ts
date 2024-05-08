import { selection, canvas, context, initializeHTML } from "./graphics"
import { Simulation } from "./simulations/Simulation"
import { Conway } from "./simulations/Conway"
import { Wolfram } from "./simulations/Wolfram"

let previous = Date.now()
let current = Date.now()

function tick(): number {
    current = Date.now()
    const delta = current - previous
    previous = current
    return delta
}

let simulation: Simulation

const simulations = {
    conway: new Conway(50, canvas.width, canvas.height, 3),
    wolfram: new Wolfram(50, canvas.width, canvas.height, 3)
}

function selected_simulation() {
    selection?.removeEventListener('change', selected_simulation)
    if (selection.value == 'conway')
        simulation = simulations.conway
    else
        simulation = simulations.wolfram
    initializeHTML(selection.value as 'conway' | 'wolfram')
    simulation.injectHTML()
    simulation.hookHTML()
    selection?.addEventListener('change', selected_simulation)
}

selected_simulation()

function frameloop() {
    const delta = tick()
    simulation.timer.count += delta

    simulation.control()

    context.clearRect(0, 0, canvas.width, canvas.height)

    if (simulation.timer.count >= simulation.timer.duration) {
        simulation.timer.restart()
        if (simulation.pause == false)
            simulation.update()
    }

    simulation.render(context, "rgb(242, 241, 241)", "black")

    requestAnimationFrame(frameloop)
}

frameloop()
