const fastify = require('fastify')({
  logger: true
})

fastify.get('/', (req, res) => {
  res.send('ok')
})

fastify.post('/deploy', (req, res) => {
  console.log(req.body)
  res.send('ok')
})

const port = process.env.PORT || 3000
fastify.listen(port, (err, address) => {
  if (err) throw err
  fastify.log.info(`Server listenging on ${address}:${port}`)
})
