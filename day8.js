import getData from './getData.js'

const data = getData('./assets/day8.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day8 = () => {
  const rows = data.length
  const cols = data[0].length

  let visible = (cols + rows) * 2 - 4

  const lookLeftRight = (point, left) => {
    const [row, col] = point
    let isTaller = true
    for (let i = left ? 0 : col + 1; i < (left ? col : cols); i++) {
      const tree = data[row][i]
      isTaller = tree >= data[row][col] ? false : isTaller
    }
    return isTaller
  }

  const lookTopDown = (point, top) => {
    const [row, col] = point
    let isTaller = true
    for (let i = top ? 0 : row + 1; i < (top ? row : rows); i++) {
      const tree = data[i][col]
      isTaller = tree >= data[row][col] ? false : isTaller
    }
    return isTaller
  }

  const part1 = () => {
    for (let col = 1; col < cols - 1; col++) {
      for (let row = 1; row < rows - 1; row++) {
        const point = [col, row]
        const isTallerFromLeft = lookLeftRight(point, true)
        const isTallerFromRight = lookLeftRight(point, false)
        const isTallerFromTop = lookTopDown(point, true)
        const isTallerFromBottom = lookTopDown(point, false)

        const isVisible =
          isTallerFromLeft || isTallerFromRight || isTallerFromBottom || isTallerFromTop

        isVisible && visible++
      }
    }
    return visible
  }

  const lookLeftRightFromPoint = (point, left) => {
    const [row, col] = point
    let howManyScore = 0
    for (let i = left ? col - 1 : col + 1; left ? i >= 0 : i < cols; left ? i-- : i++) {
      const tree = data[row][i]
      if (tree === data[row][col]) {
        return howManyScore + 1
      } else if (i === (left ? 0 : cols - 1)) {
        return howManyScore + 1
      } else {
        howManyScore += tree < data[row][col] ? 1 : 0
      }
    }
  }

  const lookTopDownFromPoint = (point, top) => {
    const [row, col] = point
    let howManyScore = 0
    for (let i = top ? row - 1 : row + 1; top ? i >= 0 : i < rows; top ? i-- : i++) {
      const tree = data[i][col]
      if (tree === data[row][col]) {
        return howManyScore + 1
      } else if (i === (top ? 0 : rows - 1)) {
        return howManyScore + 1
      } else {
        howManyScore += tree < data[row][col] ? 1 : 0
      }
    }
  }

  const part2 = () => {
    let maxScore = 0
    for (let col = 1; col < cols - 1; col++) {
      for (let row = 1; row < rows - 1; row++) {
        const point = [col, row]

        const scoreLeft = lookLeftRightFromPoint(point, true)
        const scoreRight = lookLeftRightFromPoint(point, false)
        const scoreTop = lookTopDownFromPoint(point, true)
        const scoreBottom = lookTopDownFromPoint(point, false)

        const treeScore = scoreLeft * scoreRight * scoreTop * scoreBottom
        maxScore = treeScore > maxScore ? treeScore : maxScore
      }
    }

    return maxScore
  }

  result.part1 = part1()
  result.part2 = part2()

  return result
}

console.log(day8())
