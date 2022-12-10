import getData from './getData.js'

const data = getData('./../assets/day7.txt')

const result = {
  part1: 0,
  part2: 0,
}

const fakeData = ['']

const day7 = () => {
  const fileSystem = {}
  const totalSpace = 70000000
  const freeSpaceNeeded = 30000000

  let currentPath = '/'
  data.forEach(command => {
    const splitted = command.split(' ')

    if (splitted.length === 3) {
      if (splitted[2] === '/') {
      } else if (splitted[2] !== '..') {
        currentPath =
          currentPath === '/' ? currentPath + splitted[2] : currentPath + '/' + splitted[2]
      } else {
        currentPath = currentPath.split('/').slice(0, -1).join('/')
        currentPath = currentPath === '' ? '/' : currentPath
      }
      if (!Object.keys(fileSystem).includes(currentPath)) fileSystem[currentPath] = []
    } else if (splitted[0] !== '$') {
      fileSystem[currentPath].push(
        splitted[0] === 'dir'
          ? currentPath === '/'
            ? currentPath + splitted[1]
            : currentPath + '/' + splitted[1]
          : splitted[0]
      )
    }
  })

  Object.keys(fileSystem).forEach(key => {
    const checkAndReturnSum = arr => {
      return arr.reduce((sum, a) => {
        if (a.match(/[a-z]/)) {
          return Number(sum) + Number(checkAndReturnSum(fileSystem[a]))
        } else {
          return Number(sum) + Number(a)
        }
      }, 0)
    }

    fileSystem[key] = checkAndReturnSum(fileSystem[key])
  })

  result.part1 = Object.values(fileSystem).reduce((sum, a) => {
    return sum + (a <= 100000 ? a : 0)
  }, 0)

  result.part2 = Object.values(fileSystem)
    .sort((b, a) => b - a)
    .find(el => el > freeSpaceNeeded - (totalSpace - fileSystem['/']))

  return result
}

console.log(day7())
