const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


//importamos las rutas modularizadas
const  dogRoute = require('./dogs')
const  temperamentRoute = require('./temperament')
const  temperamentDB = require('./temperamentDB')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs' , dogRoute);
router.use('/temperament' , temperamentRoute);
router.use('/temperamentDB' , temperamentDB);
module.exports = router;
