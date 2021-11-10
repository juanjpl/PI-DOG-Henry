const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const {
     BASE_URL , API_KEY 
  } = process.env;

const {Temperament} = require ('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res, next) => {

    try {

          


            let totalTemperamentos=function ()
            {
              Temperament.findAll().then(temps =>
              {
                res.json(temps);
            });
            
            }         


            return res.send(totalTemperamentos)

    } catch(error) {
        next(error)
    }
})


router.post('/' , (req , res , next) =>{
    res.send("Soy el post /temperament")
})

router.put('/' , (req , res , next) =>{
    res.send("Soy el delete /temperament")
})

router.delete('/' , (req , res , next) =>{
    res.send("Soy el delete /temperament")
})

router.delete('*' , (req , res , next) =>{
    res.send("Soy el ALL/temperament")
})



module.exports = router;