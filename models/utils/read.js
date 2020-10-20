const debug = require('debug')('sonniesedge:models:utils:read')
const is = require('is_js')
const {markdown} = require('../../drivers')
const matter = require('gray-matter')
const md = require('../../utilities/markdown-it')

const modelRead = async (dir, cache, id) => {
  try {
    if (!dir || !id || !cache) throw new Error('You must supply all params')
    if (!id) throw new Error('id must be supplied')
    if (!dir) throw new Error('dir must be supplied')
    if (!cache) throw new Error('cache must be supplied')
    if (is.not.string(id)) throw new Error('The file ID must be a string')

    // Item is present in the model cache
    if (cache.has(id)) {
      debug(`Calling ${id} from ${dir} cache`)
      return cache.get(id)
    }

    // The item is present in cache. Read from filesystem
    let result = await markdown.read(dir, id)
    let resultObject = matter(result)

    if (resultObject && resultObject.content) {
      resultObject.rendered = md.render(resultObject.content)
    }

    if (resultObject && resultObject.data && resultObject.data.sections) {
      resultObject.sections = []
      for (let i = 0; i < resultObject.data.sections.length; i++) {
        let sectionData = matter(await markdown.readSection(dir, id, resultObject.data.sections[i]))
        sectionData.rendered = md.render(sectionData.content)
        resultObject.sections.push(sectionData)
      }
    }

    resultObject.id = id
    resultObject.storage = dir

    let cachingActionResult = cache.set(id, resultObject)
    if (is.falsy(cachingActionResult)) { debug(`Did not store ${id} in ${dir} cache!`) }
    
    return resultObject
  } catch (error) {
    // TODO Add to error log
    debug(error)
    throw error
  }
}

module.exports = modelRead