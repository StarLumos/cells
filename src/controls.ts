import { Timer } from "./Timer"

const html = {
    time: (document.getElementById('time-slider') as HTMLInputElement),
}

const timer = new Timer(parseInt(html.time.value))

html.time.addEventListener('input', () => {
    timer.duration = parseInt(html.time.value)
    timer.restart()
})

export { timer, html }
