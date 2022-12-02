import fs from 'fs'

const getData = path => {
  const data = fs.readFileSync(path, { encoding: 'utf8' })

  return data.split(/\r?\n/)
}

export default getData
