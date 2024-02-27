import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
  // Test Absolute import mapOrder
  res.end('<h1>Hello World!</h1><hr>')
})

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello Trung Quan Dev, I am running at ${hostname}:${port}/`)
})
