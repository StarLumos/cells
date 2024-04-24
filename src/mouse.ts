const mouse = {
    x: 0,
    y: 0,
    click: false
} 

document.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

document.addEventListener('mousedown', () => {
    mouse.click = true
})

document.addEventListener('mouseup', () => {
    mouse.click = false
})

export { mouse }
