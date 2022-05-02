const Producto = require("../services/product.service.js");

exports.MostrarFormulario = async (req, res) => {
	await res.render("index", { productos: Producto.listarProducto() });
};

exports.listaProducto = async (req, res) => {
	const result = await Producto.listarProducto();
	res.json(result);
};

exports.nuevoProducto = async (req, res) => {
	const { title, price, thumbnail } = req.body;
	const result = await Producto.nuevoProducto(title, price, thumbnail);
	res.json(result);
};

exports.mostrarProducto = async (req, res) => {
	let id = await req.params.id;
	const result = await Producto.mostrarProducto(id);
	res.status(200).json(result);
};

exports.actualizarProducto = async (req, res) => {
	let toChange = await req.body;
	let id = await req.params.id;
	const result = await Producto.actualizarProducto(toChange, id);
	res.status(200).json(result);
};

exports.eliminarProducto = async (req, res) => {
	let id = await req.params.id;
	const result = await Producto.eliminarProducto(id);
	res.status(200).json(result);
};