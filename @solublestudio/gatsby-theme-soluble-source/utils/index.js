const path = require(`path`)
const fs = require(`fs`)

const asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const getTemplate = (pathTemplate) => {
  let template = path.resolve(`${__dirname}/src/templates/index.js`)

  try {
    if (fs.existsSync(pathTemplate)) {
      template = pathTemplate
    }
  } catch (error) {
    console.log("Error Template => ", error)
  }

  return template
}

module.exports = {
  asyncForEach,
  getTemplate,
}
