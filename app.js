const express = require('express')
const { randomUUID } = require('crypto')
const fs = require('fs')
const app = express()
let products = []

fs.readFile('./database/products.json', 'utf-8', (error, data) => {
  if (error) {
    console.error(error)
  } else {
    products = JSON.parse(data)
  }
})

app.use(express.json())

app.get('/products', (_resquest, response) => {
  return response.json(products)
})

app.get('/products/:id', (request, response) => {
  const { id } = request.params

  const product = products.find(product => product.id === id)

  return response.json(product)
})

app.post('/products', (request, response) => {
  const { name, price} = request.body
  const product = {
    id: randomUUID(),
    name,
    price
  }

  products.push(product)
  createProductFile()

  return response.json(product)
})

app.put('/products/:id', (request, response) => {
  const { id } = request.params
  const { name, price} = request.body

  const productIndex = products.findIndex(product => product.id === id)
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  createProductFile()

  return response.json({
    message: 'Product successfully updated'
  })
})

app.delete('/products/:id', (request, response) => {
  const { id } = request.params

  const productIndex = products.findIndex(product => product.id === id)
  products.splice(productIndex, 1);

  return response.json({
    message: 'Product removed successfully'
  })
})

app.get('/', (_request, response) => {
  return response.json({
    message: 'Hello World'
  })
})

function createProductFile() {
  fs.writeFile('./database/products.json', JSON.stringify(products), error => {
    if (error) {
      console.error(error)
    } else {
      console.log('Registered product')
    }
  })
}

app.listen(3333, () => console.log('server is running on port 3333'))