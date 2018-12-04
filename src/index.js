const fastify = require('fastify')({
  logger: true
})

fastify.post('/deploy', (req, res) => {
  console.log(req.body)
})

const port = process.env.PORT || 3000
fastify.listen(port, (err, address) => {
  if (err) throw err
  fastify.log.info(`Server listenging on ${address}:${port}`)
})
