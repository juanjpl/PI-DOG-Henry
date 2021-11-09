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
            //es de la api
            response = await  axios.get(`${BASE_URL}breeds?api_key=${API_KEY}`)
            temperamentos = response.data
            let totalTemperamentos = [];

            //console.log(totalTemperamentos)
            //console.log(temperamentos)

            if(temperamentos){

                temperamentos.forEach((breed) =>{
                    
                    if(!breed.temperament){
                        console.log("No tiene Temperamento!")
                        return;
                    }else{
                        //console.log(breed.temperament)

                        let temperamentoActual = breed.temperament.split(", ")

                        temperamentoActual.forEach((temperamento)=>{

                            if(!totalTemperamentos.some(({name}) => name === temperamento)){
                                console.log({temperamento} + " agregado a la base de datos")
                                totalTemperamentos.push({
                                    name: temperamento
                                })
                            }
                            
                        })

                        totalTemperamentos.forEach(temperamento =>{
                            Temperament.findOrCreate({
                                where:{
                                    name: temperamento.name
                                },
                                defaults:temperamento
                            })
                        })
                        
                        //console.log(totalTemperamentos)
                        //console.log("Se filtraron todos los temperamentos")
                        return;
                    }
    
                })            

            }else{
                temperamentos = [{}]
               
                console.log("El requerimiento a la API vino vacío")
               
                return res.send(totalTemperamentos)

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