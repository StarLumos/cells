const canvas = document.querySelector('canvas') as HTMLCanvasElement

if (canvas == null)
  throw new Error('Could not find canvas element.')

function resize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight 
}

window.addEventListener('resize', () => { resize(canvas) }) 

const context = canvas.getContext('2d') as CanvasRenderingContext2D

export { canvas, resize, context }
