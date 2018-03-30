// TODO copy readFile() from exercise
import fs from 'fs'
import path from 'path'

const readFileSync = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, fileName), (err, data) => {
      err ? reject(Error(err)) : resolve(JSON.parse(data))
    })
  })
// TODO copy writeFile() from exercise
const writeFileSync = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(__dirname, fileName),
      JSON.stringify(data),
      err => (err ? reject(Error(err)) : resolve('File save succesfully'))
    )
  })
// TODO copy chooseRandom() from previous assignment
const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array
  }
  const uniqueIndex = (
    res,
    next = Math.floor(Math.random() * array.length)
  ) => {
    return res.includes(next)
      ? uniqueIndex(res, Math.floor(Math.random() * array.length))
      : [...res, next]
  }

  const randomIndices = Array(
    numItems >= 1 && numItems <= array.length
      ? numItems
      : Math.floor(Math.random() * array.length)
  )
    .fill()
    .reduce(uniqueIndex, [])

  return array.filter((value, index) => randomIndices.includes(index))
}
// TODO copy createPrompt() from previous assignment
const createPrompt = (obj = {}) => {
  if (Object.values(obj).length === 0) {
    obj.numQuestions = 1
    obj.numChoices = 2
  }
  let values = Object.values(obj)
  const array = []
  for (let i = 1; i <= values[0]; i++) {
    const firstPart = {
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`
    }
    array.push(firstPart)
    for (let x = 1; x <= values[1]; x++) {
      const secondPart = {
        type: `input`,
        name: `question-${i}-choice-${x}`,
        message: `Enter answer choice ${x} for question ${i}`
      }
      array.push(secondPart)
    }
  }
  return array
}
// TODO implement createQuestions()
const createQuestions = (obj = {}) => {
  /* Had to to fix this in order to actually do anything with the index.js
  portion of the assessment. Once this got fixed, was then able to just focus
  on the index.js and its functions

  Had a little help from google and github sources to find what I was missing
  from the other day.
  */
  const objArray = Object.entries(obj)
  const objArrayLength = objArray.filter(value => !value[0].includes(`choice`))
  const filter = qName => {
    return objArray.filter(value => {
      return value[0].includes(`question-${qName}`)
    })
  }

  let qName = 0
  const questionArray = Array(objArrayLength.length)
    .fill()
    .reduce((res, next) => {
      qName++
      let choice = filter(qName).slice(1)
      let temp = []
      for (let value of choice) {
        temp.push(value[1])
      }
      return [
        ...res,
        {
          type: `list`,
          name: filter(qName)[0][0],
          message: filter(qName)[0][1],
          choices: temp
        }
      ]
    }, [])

  return questionArray
}

// TODO export above functions
export { readFileSync }
export { writeFileSync }
export { chooseRandom }
export { createPrompt }
export { createQuestions }
