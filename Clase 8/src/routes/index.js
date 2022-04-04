const express = require('express');
const routerMascotas = require('./mascotas')
const routerPersonas = require('./personas')
const router = express.Router();

router.get('/hola', (req, res) => {
    res.json({
        msg: "HOLA DESDE EL ROUTER PPAL"
    })
})

router.use('/mascotas', routerMascotas)
router.use('/personas', routerPersonas)
module.exports = router;