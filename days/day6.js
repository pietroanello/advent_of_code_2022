import getData from './getData.js'

const data = getData('./../assets/day6.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day6 = () => {
  let count = 4,
    count2 = 14

  const inc = (data, n, part1 = true) => {
    const s = data.slice(0, n)
    if ([...new Set(s)].length < s.length) {
      part1 ? count++ : count2++
      data.shift()
      inc(data, n, part1)
    }
  }

  inc([...data[0]], 4)
  inc([...data[0]], 14, false)

  result.part1 = count
  result.part2 = count2

  return result
}

console.log(day6())
