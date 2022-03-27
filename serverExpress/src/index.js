
const express = require("express");
const path = require("path");

const aplicacion = express();

const puerto = 8080;

aplicacion.listen(puerto, () => {
    console.log("Servidor listo. Escuchando el puerto", puerto);
})

aplicacion.get("/", (req, res) => {
    res.json({
        mensaje: "Hola desde la ruta principal!"
    })
})

aplicacion.get("/Hola", (req, res) => {
    res.json({
        mensaje: "Hola, como estas?"
    })
})

const myFilePath = path.resolve(__dirname, ".")