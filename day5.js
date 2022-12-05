import getData from './getData.js'

const data = getData('./assets/day5.txt')

const result = {
  part1: 0,
  part2: 0,
}

function prepend(value, array) {
  var newArray = array.slice()
  newArray.unshift(value)
  return newArray
}

const day5 = () => {
  const splittedIndex = data.indexOf('')
  const startCrates = data.slice(0, splittedIndex)
  const movements = data.slice(splittedIndex + 1)
  const activeIndexes = []

  const orderedCrates = []
  const orderedCrates2 = []

  // Store the indexes of the crates from the 1,2,3,4... line
  startCrates[startCrates.length - 1]
    .split('')
    .forEach((el, index) => el !== ' ' && activeIndexes.push(index))

  // Data from vertical to horizontal
  activeIndexes.forEach((el_index, index) => {
    orderedCrates[index] = []
    orderedCrates2[index] = []
    startCrates.slice(0, startCrates.length - 1).forEach(row => {
      if (row.split('')[el_index] !== ' ') {
        orderedCrates[index].push(row.split('')[el_index])
        orderedCrates2[index].push(row.split('')[el_index])
      }
    })
  })

  // Do things every move
  movements.forEach(move => {
    const [howMuch, from, to] = move.split(' ').filter(Number).map(Number)
    // One by one
    for (let i = 0; i < howMuch; i++) {
      orderedCrates[to - 1] = prepend(orderedCrates[from - 1].shift(), orderedCrates[to - 1])
    }
    // All togheter
    orderedCrates2[to - 1] = prepend(
      orderedCrates2[from - 1].splice(0, howMuch),
      orderedCrates2[to - 1]
    ).flat()
  })

  result.part1 = orderedCrates.map(el => el[0] || '').join('')
  result.part2 = orderedCrates2.map(el => el[0] || '').join('')

  return result
}

console.log(day5())
