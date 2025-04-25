/**
 * Removes undefined keys from an object.
 * @param {*} obj object to remove undefined keys from
 * @returns {Promise} object without undefined keys
 */
const removeUndefinedKeys = async (obj) => {
  try {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === '-1' || obj[key] === -1) {
        obj[key] = null
      } else if (obj[key] === undefined || obj[key] === '' || obj[key] === null) {
        delete obj[key]
      }
    })

    return obj
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  removeUndefinedKeys
}
