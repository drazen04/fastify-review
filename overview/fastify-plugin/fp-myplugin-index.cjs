const Fastify = require('fastify')
const myPlugin = require('./fp-myplugin.cjs')

const app = Fastify({ logger: { transport: { target: 'pino-pretty' } } })

// Remove comment in line below to register plugin with fastify/plugin
// app.register(myPlugin)
app.decorate('root', 'This is (G)root')
async function newPlugin(app) {
    app.decorate('newPlugin', 'Hi from newPlugin')
}
// Remove comment in line below to unlock plugin context to parent
// newPlugin[Symbol.for('skip-override')] = true
app.register(newPlugin)

app.ready().then(() => {
    console.log('root -- ', app.root)
    // Remove comment in line below to see result of myPlugin
    // console.log('root -- ', app.myPlugin)
    console.log('root -- ', app.newPlugin)
})