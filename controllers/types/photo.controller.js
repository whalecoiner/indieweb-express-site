const debug = require('debug')('sonniesedge:controller:photo')
// 🏃‍♀️💨 Express
const express = require('express')
const router = express.Router()

// 💅 Models
const model = require('../../models/types/photo.model')
const static = require('../../models/types/static.model')

// 🖕 Middleware
const {controllerFileHelper, controllerContentHelper} = require('../utils')
const checkAuthentication = require('../../middleware/check-authentication')



// 🔐 Protected routes 
router.get(`/${model.modelDir}/create`, [], controllerContentHelper.createGet(model))
router.post(`/${model.modelDir}/create`, [], controllerContentHelper.createPost(model))
router.get(`/${model.modelDir}/:id/edit`, [], controllerContentHelper.updateGet(model))
router.post(`/${model.modelDir}/:id/edit`, [], controllerContentHelper.updatePost(model))
router.get(`/${model.modelDir}/:id/delete`, [], controllerContentHelper.deleteGet(model))
router.post(`/${model.modelDir}/:id/delete`, [], controllerContentHelper.deletePost(model))

// 🔓 Public routes 
router.get(`/${model.modelDir}`, controllerContentHelper.readGet(static, {
  id: model.modelDir, 
  index: true, 
  children: model.recent, 
  template: 'index'
}));
router.get(`/${model.modelDir}/:id`, controllerContentHelper.readGet(model))
router.get(`/${model.modelDir}/:id/:file`, [], controllerFileHelper.readGet(model))
router.get(`/${model.modelDir}/:id/:file/:size`, [], controllerFileHelper.readGet(model))

module.exports = router;
