const Fastify = require('fastify')
const app = Fastify()

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
    })
}
run()