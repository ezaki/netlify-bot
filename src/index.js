const app = require('express')()
const parser = require('body-parser')

app.use(parser.urlencoded())

app.get('/', (req, res) => {
  res.send('ok')
})

app.post('/deploy', (req, res) => {
  console.log(req.body)
  res.send('ok')
})

const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => {
  console.log(`Start listening on port ${port}`)
})
