const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

const orders = []

app.get('/', (req, res) => {
  return res.json('OK')
})

app.get('/orders', (req, res) => {
  return res.json(orders)
})

app.post('/orders', (req, res) => {
  const { order, clientName } = req.body
  const newOrder = { id: Math.random(), order, clientName }
  orders.push(newOrder)
  return res.status(201).json(newOrder)

})

app.delete('/orders/:id', (req, res) => {
  const { id } = req.params
  const index = orders.findIndex(order => order.id == id)
  if (index < 0) {
    return res.json({error: 'User not found'})
  }
  orders.splice(index,1)
  return res.status(204).json()
})

app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})