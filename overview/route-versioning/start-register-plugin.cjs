'use-strict'
const Fastify = require('fastify')
const usersRouter = require('./user-router.cjs')

const app = Fastify({logger: { transport: {
    target: 'pino-pretty'
}}})

app.decorate('users', [
    {
        id: 1,
        name: 'Marco'
    },
    {
        id: 2,
        name: 'Raf'
    }
])


app.register(usersRouter, { prefix: 'v1' })
app.register(
    async function usersRouterV2(fastify, opts) {
        fastify.register(usersRouter)
        fastify.delete('/users/:userId', (req, reply) => {
            const userId = req.params.userId
            const index = fastify.users.findIndex(user => user.id === userId)
            fastify.users.splice(index, 1)
            reply.send()
        })
    }
    , {
        prefix: 'v2'
    }
)

// callback style
app.register(function(fastify, opts, done) {
    fastify.log.info('Register my first plugin with callback style')
    done()
})

// async/await style 
app.register(async function(fastify, opts) {
    fastify.log.info('Register my second plugin with async/await style')
})

// adding options
app.register(async function pluginCustom(fastify, opts) {
    fastify.log.info(`Register plugin with ${opts.pluginCustom.first}`)
}, {
    // useful for route declaration
    prefix: 'v1',
    // It's strongly recommended to create an unique namespace to avoid collision
    pluginCustom: {
        first: 'my first custom option'
    }
})

function options(parent) {
    return ({
        prefix: 'v1',
        global: {
            first: 'first global option'
        }
    })
}

// adding options as function
app.register(async function(fastify, opts) {
    fastify.log.info(`Register plugin with parent option: ${opts.global.first}`)
}, options)

// callback example with error handling
// app.register(function (fastify, opts, done) {
//     fastify.log.info('Registering my second plugin')

//     try {
//         throw new Error('Something bad happen')
//         done()
//     } catch(err) {
//         done(err)
//     }
// })

app.ready()
    .then(() => {
        app.log.info('All plugins registered!')
        console.log(app.printRoutes())
    })