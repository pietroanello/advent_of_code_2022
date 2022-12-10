import getData from './getData.js'

const data = getData('./../assets/day4.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day4 = () => {
  data.forEach(pair => {
    const [pair_a, pair_b] = pair.split(',')
    const [a_first, a_second] = pair_a.split('-').map(e => Number(e))
    const [b_first, b_second] = pair_b.split('-').map(e => Number(e))

    ;((a_first >= b_first && a_second <= b_second) ||
      (b_first >= a_first && b_second <= a_second)) &&
      result.part1++

    !(a_second < b_first || a_first > b_second) && result.part2++
  })
  return result
}

console.log(day4())
