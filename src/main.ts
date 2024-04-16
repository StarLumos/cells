const canvas = document.querySelector('canvas')

if (canvas == null)
  throw new Error('Could not find canvas element.')

function resize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight 
}

resize(canvas)
window.addEventListener('resize', () => { resize(canvas) }) 

const context = canvas.getContext('2d') as CanvasRenderingContext2D

context.translate(canvas.width / 2, canvas.height / 2)
context.scale(1, -1)

context.fillStyle = 'red'
context.fillRect(0, 0, 100, 100)
