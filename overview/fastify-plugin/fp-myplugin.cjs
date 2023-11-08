const fp = require('fastify-plugin')
async function myPlugin(fastify, _options) {
    console.log('My plugin decorate the parent instance')
    fastify.decorate('myPlugin', 'hello from myPlugin')
}

module.exports = fp(myPlugin, {
    name: 'myPlugin',
    fastify: '4.x',
    decorators: { fastify: ['root'] }
})