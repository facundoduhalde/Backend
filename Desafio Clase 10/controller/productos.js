const Producto = require('../services/product.js')

exports.MostrarFormulario = async (req, res) => {
  await res.render('index', { productos: Producto.listarProducto })
}

exports.listarProducto = async (req, res) => {
  await res.render('productList', { productos: Producto.listarProducto })
}

exports.nuevoProducto = async (req, res) => {
  let dataProductoNuevo = await req.body
  Producto.nuevoProducto(dataProductoNuevo)
  res.redirect('/')
}

exports.mostrarProducto = async (req, res) => {
  let id = await req.params.id
  await res.status(200).json(Producto.mostrarProducto(id))
}

exports.actualizarProducto = async (req, res) => {
  let dataProductoModificado = await req.body
  let id = await req.params.id
  await res.status(200).json(Producto.actualizarProducto(dataProductoModificado, id))
}

exports.eliminarProducto = async (req, res) => {
  let id = await req.params.id
  await res.status(200).json(Producto.eliminarProducto(id))
}