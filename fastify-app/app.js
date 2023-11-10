'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastifyOverview = require('fastify-overview')
const fastifyOverviewUI = require('fastify-overview-ui')
const { options } = require('./config/server-option')

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'schemas'),
    indexPattern: /^loader.js$/i
  })

  fastify.register(fastifyOverview, { exposeRoute: true })
  fastify.register(fastifyOverviewUI)

  await fastify.register(require('./configs/config'))
  fastify.log.info('Configs correctly loaded %o', fastify.config)

  // Do not touch the following lines
  
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: fastify.config,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
