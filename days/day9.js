import getData from './../getData.js'

const data = getData('./assets/day9.txt')

const result = {
  part1: 0,
  part2: 0,
}

// Sperando che H e T partano dallo stesso punto:
// 1. Per ogni movimento di H controllo
//    se T si trova in uno dei suoi vicini -> 4.
// 2. Se T non si trova in uno dei vicini:
//    - Se è nella stessa riga/colonna
//      a dx/sx/up/down lo sposto a sx/dx/down/up
//    - Se NON è nella stessa riga/colonna
//      a dxDown/sxDown/dxUp/sxUp lo sposto a sxUp/dxUp/sxDown/dxDown
// 3. Salvo la nuova posizione se non è già salvata
// 4. Vado alla prossima mossa

const nextMove = (prevCell, move) => {
  const [row, col] = prevCell
  switch (move) {
    case 'R':
      return [row, col + 1]
    case 'L':
      return [row, col - 1]
    case 'U':
      return [row - 1, col]
    case 'D':
      return [row + 1, col]
  }
}

const returnNeighbours = cell => {
  const [row, col] = cell
  return [
    [row, col].toString(),
    [row, col + 1].toString(),
    [row, col - 1].toString(),
    [row + 1, col].toString(),
    [row - 1, col].toString(),
    [row + 1, col + 1].toString(),
    [row + 1, col - 1].toString(),
    [row - 1, col + 1].toString(),
    [row - 1, col - 1].toString(),
  ]
}

const moveT = (TPos, HPos) => {
  const [Trow, Tcol] = TPos
  const [Hrow, Hcol] = HPos

  // T dxDown
  if (Trow > Hrow && Tcol > Hcol) return [Trow - 1, Tcol - 1]
  // T sxDown
  if (Trow > Hrow && Tcol < Hcol) return [Trow - 1, Tcol + 1]
  // T dxUp
  if (Trow < Hrow && Tcol > Hcol) return [Trow + 1, Tcol - 1]
  // T sxUp
  if (Trow < Hrow && Tcol < Hcol) return [Trow + 1, Tcol + 1]
  // T dx
  if (Tcol > Hcol) return [Trow, Tcol - 1]
  // T sx
  if (Tcol < Hcol) return [Trow, Tcol + 1]
  // T up
  if (Trow < Hrow) return [Trow + 1, Tcol]
  // T down
  if (Trow > Hrow) return [Trow - 1, Tcol]
}

const day9 = () => {
  const allTPos_1 = [[1000, 1000].toString()]
  const allTPos_2 = [[1000, 1000].toString()]

  let HPos_1 = [1000, 1000]
  let TPos_1 = [1000, 1000]

  data.forEach(move => {
    const [direction, count] = move.split(' ')
    for (let i = 0; i < count; i++) {
      HPos_1 = nextMove(HPos_1, direction)
      if (!returnNeighbours(HPos_1).includes(TPos_1.toString())) {
        TPos_1 = moveT(TPos_1, HPos_1)
        !allTPos_1.includes(TPos_1.toString()) && allTPos_1.push(TPos_1.toString())
      }
    }
  })

  let HPos_2 = [
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
    [1000, 1000],
  ]

  data.forEach(move => {
    const [direction, count] = move.split(' ')
    for (let i = 0; i < count; i++) {
      HPos_2[0] = nextMove(HPos_2[0], direction)
      for (let i = 1; i < HPos_2.length; i++) {
        if (!returnNeighbours(HPos_2[i - 1]).includes(HPos_2[i].toString())) {
          HPos_2[i] = moveT(HPos_2[i], HPos_2[i - 1])
        }
      }
      !allTPos_2.includes(HPos_2[9].toString()) && allTPos_2.push(HPos_2[9].toString())
    }
  })

  result.part1 = allTPos_1.length
  result.part2 = allTPos_2.length

  return result
}

console.log(day9())
