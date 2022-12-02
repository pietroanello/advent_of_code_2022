import getData from './getData.js'

const finalData = [[]]
const data = getData('./assets/day1.txt')

let i = 0
data.forEach(el => {
  if (el === '') {
    i++
    finalData.push([])
  } else {
    finalData[i].push(Number(el))
  }
})

const result = {
  part1: 0,
  part2: 0,
}

const day1 = () => {
  const sumData = finalData.map(el => el.reduce((sum, a) => sum + a, 0))
  sumData.sort((a, b) => b - a)

  result.part1 = sumData[0]
  result.part2 = sumData[0] + sumData[1] + sumData[2]
  return result
}

console.log(day1())
