const express = require('express')
const app = express()
const Contenedor = require('./container')
const productos = new Contenedor('producto.txt')

app.use(express.json())

app.get('/productos', async (req, res) => {
  try {
    const resultado = await productos.getAll()
    res.send(resultado)
  } catch (error) {
    res.send(error)
  }
})

app.get('/productoRandom', async (req, res) => {
  const data = await productos.getAll()
  const random = Math.floor(Math.random() * data.length)
  res.send(await productos.getById(parseInt(random + 1)))
})

app.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080')
})