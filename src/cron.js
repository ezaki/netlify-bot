const https = require('https')

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
