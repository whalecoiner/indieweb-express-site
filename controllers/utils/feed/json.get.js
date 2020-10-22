const debug = require('debug')('sonniesedge:controllers:utils:content:rssGet')
const asyncHandler = require('express-async-handler')
const generateBaseFeed = require('./feed.global')

const jsonGet = (model, options) => {
  options || (options = {});
  return asyncHandler(async (req, res, next) => {
    try {
      let results = await generateBaseFeed(model)
      res.contentType('application/json')
      res.send(results.json1())
    } catch (error) {
      debug(error)
      throw new ErrorHandler('404', error)
    }
  })
}

module.exports = jsonGet
