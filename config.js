
const appRootPackage = require('app-root-path');
const path = require('path')

const appRoot = () => appRootPackage.path
const dataRoot = () => process.env['DATA_DIR'] || path.join(appRoot(), 'example', 'data')
const contentRoot = () => process.env['CONTENT_DIR'] || path.join(appRoot(), 'example', 'content')
const logDir = () => process.env['LOG_DIR'] || path.join(appRoot(), 'log')
const siteTitle = () => 'sonniesedge'
const siteDescription = () => 'Charlie Owen and her owned content'
const sitePort = () => process.env['SITE_PORT'] || '3000'
const sitePortExternal = () => process.env['SITE_PORT_EXTERNAL'] || '80'
const siteProtocol = () => `${process.env['SITE_PROTOCOL'] || 'http'}://`
const siteDomain = () => `${process.env['SITE_DOMAIN'] || '127.0.0.1'}`
const siteUrl = () => `${siteProtocol()}${siteDomain()}`
const siteLoginPath = () =>  process.env['SITE_LOGIN_PATH'] || '/login'
const fileDateFormat = () => `yyyyLLdd't'HHmm`


module.exports = {
  appRoot, dataRoot, contentRoot, logDir,
  siteTitle, siteDescription, sitePort, sitePortExternal, 
  siteProtocol, siteDomain, siteUrl, siteLoginPath, fileDateFormat
}
