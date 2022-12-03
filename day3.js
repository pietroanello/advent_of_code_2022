import getData from './getData.js'

const data = getData('./assets/day3.txt')

const result = {
  part1: 0,
  part2: 0,
}

const day3 = () => {
  function sliceIntoChunks(arr, chunkSize) {
    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize)
      res.push(chunk)
    }
    return res
  }

  data.forEach(el => {
    const len = el.length
    const start = el.slice(0, len / 2)
    const end = el.slice(len / 2, len)

    const letter = start.split('').filter(a => end.split('').includes(a))[0]

    result.part1 += letter.charCodeAt(0) - (/[a-z]/.test(letter) ? 96 : 38)
  })

  const sliced = sliceIntoChunks(data, 3)
  sliced.forEach(slice => {
    const [a, b, c] = slice
    const common = a
      .split('')
      .filter(l => b.split('').includes(l))
      .filter(l => c.split('').includes(l))[0]

    result.part2 += common.charCodeAt(0) - (/[a-z]/.test(common) ? 96 : 38)
  })

  return result
}

console.log(day3())
