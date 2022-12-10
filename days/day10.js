import getData from './../getData.js'

const data = getData('./assets/day10.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day10 = () => {
  const newData = data.map(line => (line.match(/add+/) ? ['noop', line] : 'noop 0')).flat()
  const results = [20, 60, 100, 140, 180, 220]
  const results_2 = [40, 80, 120, 160, 200, 240]
  const values = []
  const values_2 = [[], [], [], [], [], []]
  let X = 1
  let line = 0

  for (let i = 1; i <= newData.length; i++) {
    const [operation, value] = newData[i - 1].split(' ')
    results.includes(i) && values.push(X * i)

    const CRTDraws = i - 1 - 40 * line
    values_2[line].push(CRTDraws >= X - 1 && CRTDraws <= X + 1 ? '#' : '.')

    X += operation.match(/add+/) ? Number(value) : 0
    line += results_2.includes(i) ? 1 : 0
  }

  result.part1 = values.reduce((sum, a) => sum + a, 0)
  result.part2 = values_2.map(el => el.join(''))

  return result
}

console.log(day10())
