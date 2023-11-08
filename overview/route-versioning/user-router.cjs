module.exports = async function(fastify, _) {
    fastify.register(
        async function routes(child, opts) {
            child.get('/', function(req, reply) {
                reply.send({allUsers: child.users})
            })
            child.post('/', function(req, reply) {
                const user = req.body
                child.users.push(user)
                reply.send(user)
            })
        }, {prefix: 'users'}
    )
}