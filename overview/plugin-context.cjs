'use-strict'
const Fastify = require('fastify')
const app = Fastify({logger: { transport: {
    target: 'pino-pretty'
}}})

async function run () {
    
    app.register(function firstP (app, opts, next) {
        next()
    })
    app.register(async function secondP (app) {
    })
    app.register(function thirdP (app, opts, next) {
        next()
    })
    app.get('/', async (req, res) => 'ciao')

    await app.listen({
        port: 8080
    }).then(() => app.log.info('Server Started'))
}
run()