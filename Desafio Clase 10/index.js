const express = require('express')
const app = express()
const Router = require('./routes/productos')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views/')
app.set('view engine', 'pug')

app.use('/', Router)
app.use(express.static('public'))

const PORT = 8080

app.listen(PORT, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Servidor corriendo en el puerto', PORT)
    }
  })