const https = require('https')
const app = require('express')()
const parser = require('body-parser')

app.use(parser.urlencoded())

app.get('/', (req, res) => {
  res.send('ok')
})

app.post('/deploy', (req, res) => {
  if (req.body.token !== process.env.TOKEN) {
    return res.send('Invalid token.')
  }

  const hostname = process.env.BUILD_WEBHOOK.match(/^https?:\/\/([^/]+)\/.*$/)[1]
  const path = process.env.BUILD_WEBHOOK.match(/^https?:\/\/(?:[^/]+)(\/.*)$/)[1]

  console.log(`Hostname: ${hostname}`)
  console.log(`Path: ${path}`)

  const hookReq = https.request({
    hostname,
    path,
    method: 'POST'
  }, (res) => {
    const data = []
    res.on('data', (c) => {
      data.push(c)
    })
    res.on('end', () => {
      const buf = Buffer.concat(data)
      console.log(buf.toString('base64'))
    })
    res.on('error', (e) => {
      console.error(e)
    })
  })

  hookReq.on('error', (e) => {
    console.error(e)
  })
  hookReq.write(JSON.stringify({}))
  hookReq.end()

  res.send('OK. Deploy start.')
})

const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => {
  console.log(`Start listening on port ${port}`)
})
