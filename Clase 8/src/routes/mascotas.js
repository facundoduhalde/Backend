const express = require('express');
const { v4: uuidv4 } = require('uuid');

let mascotas = [];

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: "TODAS LAS MASCOTAS"
    })
})

router.post('/', (req, res) => {
    const body = req.body;
  
    const nuevaMascota = {
      id: uuidv4(),
      nombre: body.nombre,
      raza: body.raza,
      edad: body.edad,
    };
  
    mascotas.push(nuevaMascota);
    res.json({
      nuevaMascota,
    });
  });

module.exports = router;