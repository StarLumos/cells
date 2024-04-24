class Timer {
    duration: number
    count: number

    constructor(duration: number) {
        this.duration = duration
        this.count = 0
    }
    restart() {
        this.count = 0
    }
}

export { Timer }
