const debug = require('debug')('sonniesedge:controller:bookmark')
// 🏃‍♀️💨 Express
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

// 💅 Models
const model = require('../../models/types/bookmark.model')
const page = require('../../models/types/page.model')
const renderNav = require('../../middleware/render-nav')

// 🖕 Middleware
const {controllerFileHelper, controllerContentHelper, controllerFeedHelper} = require('../../controllers/utils')
const checkAuthentication = require('../../middleware/check-authentication')

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const createValidators = require('../../controllers/validators')
const createSanitizers = require('../../controllers/sanitizers')
const localValidators = [
  body('title').notEmpty().withMessage(`You need to supply a title`),
  body('bookmark_of').notEmpty().withMessage(`You need to supply a bookmark URL`)
]


// 🔐 Protected routes 
router.get(`/${model.modelDir}/create`, [renderNav, checkAuthentication], controllerContentHelper.createGet(model))
router.post(`/${model.modelDir}/create`, [renderNav, urlencodedParser, checkAuthentication, createValidators, localValidators, createSanitizers], controllerContentHelper.createPost(model))
router.get(`/${model.modelDir}/:id/edit`, [renderNav, checkAuthentication], controllerContentHelper.updateGet(model))
router.post(`/${model.modelDir}/:id/edit`, [renderNav, urlencodedParser, checkAuthentication, createValidators, localValidators, createSanitizers], controllerContentHelper.updatePost(model))
// router.get(`/${model.modelDir}/:id/delete`, [renderNav, checkAuthentication], controllerContentHelper.deleteGet(model))
// router.post(`/${model.modelDir}/:id/delete`, [renderNav, urlencodedParser, checkAuthentication], controllerContentHelper.deletePost(model))

// 🗼 Syndication routes
router.get(`/${model.modelDir}/rss`, controllerFeedHelper.rssGet(model))
router.get(`/${model.modelDir}/json`, controllerFeedHelper.jsonGet(model))
router.get(`/${model.modelDir}/atom`, controllerFeedHelper.atomGet(model))

// 🔓 Public routes 
router.get(`/${model.modelDir}`, [renderNav], controllerContentHelper.readGet(page, {
  id: model.modelDir, 
  index: true, 
  children: model.recentIndex, 
  template: 'content-public/index'
}));
router.get(`/${model.modelDir}/:id`, [renderNav], controllerContentHelper.readGet(model, {template: `content-public/types/${model.id}`}))
router.get(`/${model.modelDir}/:id/:file`, [], controllerFileHelper.readGet(model))
router.get(`/${model.modelDir}/:id/:file/:size`, [], controllerFileHelper.readGet(model))

module.exports = router;