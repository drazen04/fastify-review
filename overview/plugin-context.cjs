'use-strict'
const Fastify = require('fastify')
const app = Fastify({logger: { transport: {
    target: 'pino-pretty'
}}})

async function run () {
    
    app.register(function firstP (app, opts, next) {
        
        app.register(async function innerPlugin (app, opts) {

        })
        next()
    })
    app.register(function secondP (app, opts, next) {
        next()
    })
    app.register(function thirdP (app, opts, next) {
        next()
    })

    await app.listen({
        port: 8080
    }).then(() => console.log(app.printPlugins()))
}
run()