import getData from './getData.js'

/*
 ** # Part 1
 ** A X : Rock - 1
 ** B Y : Paper - 2
 ** C Z : Scissors - 3
 **
 ** # Part 2
 ** X : Lose
 ** Y : Draw
 ** Z : Win
 */

const outcomes_1 = {
  A: {
    X: 1 + 3,
    Y: 2 + 6,
    Z: 3 + 0,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 1 + 6,
    Y: 2 + 0,
    Z: 3 + 3,
  },
}

const outcomes_2 = {
  A: {
    X: 0 + 3,
    Y: 3 + 1,
    Z: 6 + 2,
  },
  B: {
    X: 0 + 1,
    Y: 3 + 2,
    Z: 6 + 3,
  },
  C: {
    X: 0 + 2,
    Y: 3 + 3,
    Z: 6 + 1,
  },
}

const data = getData('./../assets/day2.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day2 = () => {
  let sum1 = 0,
    sum2 = 0
  data.forEach(el => {
    const [opponent, me] = el.split(' ')
    sum1 += outcomes_1[opponent][me]
    sum2 += outcomes_2[opponent][me]
  })
  result.part1 = sum1
  result.part2 = sum2
  return result
}

console.log(day2())
