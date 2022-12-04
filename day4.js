import getData from './getData.js'

const data = getData('./assets/day4.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day4 = () => {
  data.forEach(pair => {
    const [pair_a, pair_b] = pair.split(',')
    const [a_first, a_second] = pair_a.split('-').map(e => Number(e))
    const [b_first, b_second] = pair_b.split('-').map(e => Number(e))

    ;((Number(a_first) >= Number(b_first) && Number(a_second) <= Number(b_second)) ||
      (Number(b_first) >= Number(a_first) && Number(b_second) <= Number(a_second))) &&
      result.part1++

    !(Number(a_second) < Number(b_first) || Number(a_first) > Number(b_second)) && result.part2++
  })
  return result
}

console.log(day4())
