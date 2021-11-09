require('dotenv').config();

const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const {
     BASE_URL , API_KEY 
  } = process.env;

const {Dog , Temperament} = require ('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/" , (req,res,next)=> {

    let {name} = req.query

    let reqAPI =  `${BASE_URL}breeds?api_key=${API_KEY}`;
    let reqDB =  {include: Temperament};

    if(name){

        reqAPI = `${BASE_URL}breeds/search?q=${name}&api_key=${API_KEY}`;
        reqDB.where = {name: {[Op.iLike]: `%${name}%`}}
    }


    let perrosDeAPI = axios.get(reqAPI)
    let perrosDeDB = Dog.findAll(reqDB)

   Promise.all([perrosDeAPI , perrosDeDB])
        .then( respuesta =>{
            let [respAPIDogs , respDBDogs] = respuesta;


            respAPIDogs = respAPIDogs => {
                respAPIDogs = respAPIDogs.data;
                return respAPIDogs.reduce((acc, breed) => {
                  if(breed.image || breed.reference_image_id) {
                    acc.push({
                      id: breed.id,
                      name: breed.name,
                      temperament: breed.temperament,
                      weight: breed.weight.imperial.split(" - ")[0],
                      image_url: breed.hasOwnProperty("image") 
                      ? breed.image.url 
                      : `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
                      life_span: breed.life_span.split(" ")[0]
                    })
                  }
                  return acc; 
                }, []);
              };

           
            

            respDBDogs= respDBDogs => {
                if(respDBDogs instanceof Array) {
                    respDBDogs = respDBDogs.map(dog => {
                    return {
                      id: dog.id,
                      name: dog.name,
                      temperament: dog.temperaments.map(temperament => temperament.name).join(", "),
                      image_url: dog.image_url,
                      weight: dog.weight.split("-")[0],
                      life_span: dog.life_span.split(" ")[0]
                    };
                  });
                  return respDBDogs
                } else {

                    const getCircularReplacer = () => {
                        const seen = new WeakSet();
                        return (key, value) => {
                          if (typeof value === "object" && value !== null) {
                            if (seen.has(value)) {
                              return;
                            }
                            seen.add(value);
                          }
                          return value;
                        };
                      };
                      
                    respDBDogs = JSON.stringify(respDBDogs, getCircularReplacer());
                    respDBDogs = JSON.parse(respDBDogs);
                  
                  if(!respDBDogs) return {};
              
                  const temperament = respDBDogs.temperaments.map(temperament => temperament.name).join(", ");
                  respDBDogs.image = {
                    url: respDBDogs.image_url
                  }
                  
                  delete respDBDogs.image_url;
                  delete respDBDogs.temperaments;
                  
                  weight = respDBDogs.weight.split("-");
                  respDBDogs.weight = {
                    imperial: `${weight[0]} - ${weight[1]}`,
                    metric: `${weight[2]} - ${weight[3]}`
                  }
                  
                  height = respDBDogs.height.split("-");
                  respDBDogs.height = {
                    imperial: `${height[0]} - ${height[1]}`,
                    metric: `${height[2]} - ${height[3]}`
                  }
              
                  respDBDogs = {...respDBDogs, temperament};
                  
                  return respDBDogs;
                }
              };


            return res.status(200).send([...respAPIDogs , ...respDBDogs])
        })
        .catch(error => next(error))




})



router.post('/' , (req , res , next) =>{
    //traemos los datos desde el formulario por body
     
    const {name , height, weight, life_span , url} = req.body;
    
    Dog.create({
        name,
        height,
        weight,
        life_span,
        url,

    })
    .then(createdDog =>{
        res.json(createdDog)
    })
    .catch(error => res.sendStatus(404))

    // res.send("Soy el post /dog")
})

router.put('/' , (req , res , next) =>{
    res.send("Soy el put /dog")
})

router.delete('/' , (req , res , next) =>{
    res.send("Soy el delete /dog")
})

router.delete('*' , (req , res , next) =>{
    res.send("Soy el ALL /dog")
})



module.exports = router;



router.get("/" , (req,res,next)=> {

    let {name} = req.query

    let llamadoAPI = `${BASE_URL}breeds?api_key=${API_KEY}`;
    let llamadoDB = {include: Temperament};

    if(name){

        llamadoAPI = `${BASE_URL}breeds/search?q=${name}&api_key=${API_KEY}`;
        llamadoDB.where = {name: {[Op.iLike]: `%${name}%`}}
    }

    let reqAPI = axios.get(llamadoAPI);
    //let reqDB = Dog.findAll(llamadoDB);


    Promise.all([
        reqAPI
       // reqDB
    ])
    .then((respuesta) => {
        const [
            resAPI //respuesta de la API
            //resDB        //respuesta de mi base de datos
        ] = respuesta ///mis respuestas

        
        
        resAPI = resAPI.data.reduce((acc,breed) =>{
            if(breed.image || breed.reference_image_id) {
                acc.push({
                  id: breed.id,
                  name: breed.name,
                  temperament: breed.temperament,
                  weight: breed.weight.imperial.split(" - ")[0],
                  image_url: breed.hasOwnProperty("image") 
                  ? breed.image.url 
                  : `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
                  life_span: breed.life_span.split(" ")[0]
                })
              }
              return acc; 
        },[])

        
       
        res.status(200).send(resAPI) //unimos
    })
    .catch(error => next(error))

})