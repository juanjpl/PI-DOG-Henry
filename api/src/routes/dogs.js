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

    let perrosDeAPI
    let perrosDeDB

    if(name){

        perrosDeAPI = axios.get( `${BASE_URL}breeds/search?q=${name}&api_key=${API_KEY}`);
        perrosDeDB = Dog.findAll({ 
            include: Temperament,
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            },
            order: [
                ['name', 'ASC'],
            ],
        })
    }else{
        perrosDeAPI = axios.get(`${BASE_URL}breeds?api_key=${API_KEY}`)
        perrosDeDB = Dog.findAll({//promesa
            include: Temperament
        })
    }


    Promise.all([
        perrosDeAPI ,
        perrosDeDB      // reqDB
    ])

    .then((respuesta) => {
        const [
            resAPI , //respuesta de la API
            resDB        //respuesta de mi base de datos
        ] = respuesta ///mis respuestas

        let filtroPerros =  resAPI.data.reduce((acc,breed) =>{
            if(breed.image || breed.reference_image_id) {
                acc.push({
                  id: breed.id,
                  name: breed.name,
                  temperament: breed.temperament,
                  weight: breed.weight.imperial.split(" - ")[0],
                  image_url:breed.hasOwnProperty("image") 
                  ? breed.image.url 
                  : `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
                  life_span: breed.life_span.split(" ")[0]
                })
              }
              return acc; 
        },[])

        if(!filtroPerros){
            filtroPerros={}
        }

        if(!resDB){
            resDB ={}
        }
       
        res.status(200).send([...filtroPerros , ...resDB]) //unimos
    })
    .catch(error => next(error))

})

router.get('/:id' , async (req, res, next) =>{

    try{
        const {id} = req.params ;
        let perrosSearch

        if(typeof id === "string" && id.length > 8){
            //es mio
    
            perrosSearch = await Dog.findByPk(id)

            if(!perrosSearch){
                perrosSearch={}
            }
            res.send(perrosSearch)
        }else{
            //es de la api
            perrosSearch = axios.get(`${BASE_URL}breeds?api_key=${API_KEY}`)
            .then(apiRes => {
              const perrosSearch = apiRes.data.find(dog => dog.id === parseInt(id));
              return res.status(200).send(perrosSearch);
            })
            .catch(error => next(error));
        }
        res.send(perrosSearch)
    }catch(error){
        next(error)
    }


})

/*
router.get('/:id' , (req, res, next) =>{

    const{ id }= req.params;

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

    if(isNaN(id)) {
      return Dog.findOne({
        where: {
          id: id
        },
        include: Temperament
      })
        .then(dbRes => {

            if(dbRes instanceof Array){
                dbResponse = dbResponse.map(dog => {
                    return {
                      id: dog.id,
                      name: dog.name,
                      temperament: dog.temperaments.map(temperament => temperament.name).join(", "),
                      image_url: dog.image_url,
                      weight: dog.weight.split("-")[0],
                      life_span: dog.life_span.split(" ")[0]
                    };
                  });
                  return dbResponse;
            }else {
                dbResponse = JSON.stringify(dbResponse, getCircularReplacer());
                dbResponse = JSON.parse(dbResponse);
                
                if(!dbResponse) return {};
            
                const temperament = dbResponse.temperaments.map(temperament => temperament.name).join(", ");
                dbResponse.image = {
                  url: dbResponse.image_url
                }
                
                delete dbResponse.image_url;
                delete dbResponse.temperaments;
                
                weight = dbResponse.weight.split("-");
                dbResponse.weight = {
                  imperial: `${weight[0]} - ${weight[1]}`,
                  metric: `${weight[2]} - ${weight[3]}`
                }
                
                height = dbResponse.height.split("-");
                dbResponse.height = {
                  imperial: `${height[0]} - ${height[1]}`,
                  metric: `${height[2]} - ${height[3]}`
                }
            
                dbResponse = {...dbResponse, temperament};
                
                return dbResponse;
              }
        })
        .catch(error => next(error));
    } else { 
      axios.get(`${BASE_URL}breeds?api_key=${API_KEY}`)
      .then(apiRes => {
        const searchResult = apiRes.data.find(dog => dog.id === parseInt(id));
        return res.status(200).send(searchResult);
      })
      .catch(error => next(error));
    }
})

*/


router.post('/' , (req , res , next) =>{
    //traemos los datos desde el formulario por body
     
    const {name , height, weight, life_span,description , image_url} = req.body;
    
    Dog.create({
        name,
        height,
        weight,
        life_span,
        image_url,
        description

    })
    .then(createdDog =>{
        res.json(createdDog)
    })
    .catch(error => next(error))

    // res.send("Soy el post /dog")
})

router.put('/:id' , async (req , res , next) =>{

    const {id} = req.params;
    console.log(id)
    const {name , height , weight , life_span, description , image_url , temperaments} = req.body
    console.log(name)


    await Dog.update(
        {name: name,
        height : height,
        weight : weight,
        description : description,
        life_span: life_span,
        image_url : image_url,
        Temperaments : temperaments},
        {where: {id : id}}
    )
    .then(() => {
        console.log(`Se cambió el nombre por ${name}`)
        res.status(200).send("Update complete!")
     })
    .catch(error => next(error))
  
})


router.delete('/:id' , (req , res , next) =>{

    const { id } = req.params;
    

    Dog.destroy({where: {id}})
      .then(() => {
        return res.send({deleteStatus: "dog successfully removed"})
      })
      .catch(err => {
        res.send({deleteStatus: err});
        next(err);
      })
})

router.get('*' , (req , res , next) =>{
    res.send("Soy el ALL /dog")
})



module.exports = router;