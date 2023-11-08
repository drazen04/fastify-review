const Fastify = require('fastify')
const myPlugin = require('./fp-myplugin.cjs')

const app = Fastify({ logger: { transport: { target: 'pino-pretty' } } })

app.register(myPlugin)
app.decorate('root', 'This is (G)root')

app.ready().then(() => {
    console.log('root -- ', app.root)
    console.log('root -- ', app.myPlugin)
})