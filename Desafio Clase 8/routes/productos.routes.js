const express = require('express')
const apiRouter = express.Router()

const Producto = require('../controller/productos.js')

apiRouter.get('/productos', (req, res) => {
  res.status(200).json(Producto.listarProducto)
})

apiRouter.post('/productos', (req, res) => {
  let data = req.body
  let prod = Producto.nuevoProducto(data)
  res.status(201).json(prod)
})

apiRouter.get('/productos/:id', (req, res) => {
  let id = req.params.id
  res.status(200).json(Producto.mostrarProducto(id))
})

apiRouter.put('/productos/:id', (req, res) => {
  let data = req.body
  let id = req.params.id
  res.status(200).json(Producto.actualizarProducto(data, id))
})

apiRouter.delete('/productos/:id', (req, res) => {
  let id = req.params.id
  res.status(200).json(Producto.eliminarProducto(id))
})

module.exports = apiRouter