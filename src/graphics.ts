let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
let selection: HTMLSelectElement

function resize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight 
}

function initializeHTML(choice: 'conway' | 'wolfram') {
    document.body.innerHTML = `
        <canvas></canvas>
        <label for="simulation">simulation:</label>
        <select name="simulations" id="simulations">
        ${
            choice == 'conway' ?
            `<option value="conway" selected>Conway's Game of Life</option>
            <option value="wolfram">Wolfram's Elementary Cellular Automata</option>`
            :
            `<option value="conway">Conway's Game of Life</option>
            <option value="wolfram" selected>Wolfram's Elementary Cellular Automata</option>`
        }
        </select>`
  
    canvas = document.querySelector('canvas') as HTMLCanvasElement
    if (canvas == null)
        throw new Error('Could not find canvas element.')
    resize(canvas)
    context = canvas.getContext('2d') as CanvasRenderingContext2D
    selection = document.getElementById('simulations') as HTMLSelectElement
}

initializeHTML('conway')

window.addEventListener('resize', () => { resize(canvas) }) 

export { selection, canvas, resize, context, initializeHTML }
