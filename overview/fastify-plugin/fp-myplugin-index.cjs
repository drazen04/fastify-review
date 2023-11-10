const Fastify = require('fastify')
const myPlugin = require('./fp-myplugin.cjs')

const app = Fastify({ logger: { transport: { target: 'pino-pretty' } } })

// app.register(myPlugin)
app.decorate('root', 'This is (G)root')
async function newPlugin(app) {
    app.decorate('newPlugin', 'Hi from newPlugin')
}
// newPlugin[Symbol.for('skip-override')] = true
app.register(newPlugin)

app.ready().then(() => {
    console.log('root -- ', app.root)
    // console.log('root -- ', app.myPlugin)
    console.log('root -- ', app.newPlugin)
})