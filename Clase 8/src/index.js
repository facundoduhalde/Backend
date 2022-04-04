const express = require('express')
const mainRouter = require('./routes/index')

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log('Server up en el puerto', puerto);
})

server.on("error", (err) => {
    console.log("Error atajado", err);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use("/api", mainRouter)