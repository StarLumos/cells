const keyboard = new Set<string>()
document.addEventListener('keydown', (event) => {
    keyboard.add(event.key)
})

document.addEventListener('keyup', (event) => {
    keyboard.delete(event.key)
})

export { keyboard }
