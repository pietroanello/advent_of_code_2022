import getData from './getData.js'

const data = getData('./../assets/day3.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day3 = () => {
  const letterVal = letter => letter.charCodeAt(0) - (/[a-z]/.test(letter) ? 96 : 38)

  data.forEach(el => {
    const len = el.length
    const start = el.slice(0, len / 2)
    const end = el.slice(len / 2, len)

    const letter = start.split('').filter(a => end.split('').includes(a))[0]

    result.part1 += letterVal(letter)
  })

  for (let i = 0; i < data.length; i += 3) {
    const [a, b, c] = data.slice(i, i + 3)
    const letter = a
      .split('')
      .filter(l => b.split('').includes(l))
      .filter(l => c.split('').includes(l))[0]

    result.part2 += letterVal(letter)
  }

  return result
}

console.log(day3())
