const express = require("express");
const app = express();
const path = require("path");
const Producto = require("./src/services/product.service");
const apiRouter = require("./src/routes/productos.routes");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);
app.use("/static", express.static("/public"));
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(__dirname + "/public"));

// Motor de plantilla
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

const mensajes = [];

io.on("connection", (socket) => {
	console.log("usuario conectado");

	emitMessages();

	socket.on("new-message", function (dato) {
		dato.date = moment().format("LLLL");
		mensajes.push(dato);
		io.sockets.emit("mensajes", mensajes);
	});
});

const emitMessages = () => io.sockets.emit("mensajes", mensajes);

const PORT = 8080;

server.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Server listening on PORT", PORT);
	}
});