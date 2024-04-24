function deepcopy(original: number[][]): number[][] {
    const copy: number[][] = []
    for (const row of original) {
        copy.push([])
        for (const cell of row) 
            copy[copy.length - 1].push(cell)
    }
    return copy
}

export { deepcopy }
