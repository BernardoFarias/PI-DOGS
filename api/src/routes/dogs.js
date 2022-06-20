const { Router } = require("express");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");
const axios = require("axios");
const router = Router();
const {Dog, Temperament} = require("../db");

const allApiDogs = async () => {
    try {
        const pack = await axios.get(
            `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
        );
        const dog = pack.data.map(e => {
            return {
                id: e.id,
                height: e.height.metric,
                weight: e.weight.metric,
                name: e.name,
                lifeSpan: e.life_span,
                image: e.image.url,
                temperament: e.temperament?.split(", ")
                }
        })
        dog.map((el) => {
            if (el.name === "Olde English Bulldogge") {
              el.weight = "22 - 30";
                }
            })

        return dog ;
    } catch (error) {
        console.log(error)
    }
}

const allDbDogs = async () => {
    try {
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
              },
        },
    })
    const dbDog = dbDogs.map( e => {
    return {
    id: e.id,
    name: e.name,
    image: e.image,
    weight: e.weight,
    height: e.height,
    created: e.created,
    temperament: e.temperaments.map((d) => d.name)
         }
    })
    return dbDog ;  

    } catch (error) {
    console.log(error)
    }
}

const allDogs = async () => {
    try {
        const api = await allApiDogs();
        const db = await allDbDogs();
        const all = [...api,...db];
        return all;
    } catch (error) {
        console.log(error)
    }
}

const apiBreed = async (name) => {
    try {
        const pack = await axios.get(
            `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
        );
        const dog = pack.data.map(e => {
            return {
                id: e.id,
                height: e.height.metric,
                weight: e.weight.metric,
                name: e.name,
                lifeSpan: e.life_span,
                image: e.image.url,
                temperament: e.temperament?.split(", ")
                }
        })
        return dog.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    } catch (error) {
        console.log(error)
    }
}

const dbBreed = async (name) => {
    try {
        const dbDogs = await Dog.findAll({
            where: { name: { [Op.iLike]: "%" + name + "%" } },
            include: {               
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        })
        const dbDog = dbDogs.map( e => {
            return {
            id: e.id,
            name: e.name,
            image: e.image,
            weight: e.weight,
            height: e.height,
            created: e.created,
            temperament: e.temperaments.map((d) => d.name)
                 }
            })
        return dbDog;
    } catch (error) {
        console.log(error)
    }
}

const breedDog = async (name) => {
    try {
        const api = await apiBreed(name);
        const db = await dbBreed(name);
        const all = [...api, ...db];
        return all;
    } catch (error) {
        console.log(error)
    }
}


router.get("/", async (req, res) => {
    const {name} = req.query;
    try {
        const getDogs = await allDogs();
        if(!name) {return res.send(getDogs)}
        else if(name){
            const breedQuery = await breedDog(name);
            if (breedQuery) return res.send(breedQuery)
        } else {
        return res.status(404).json({msg: "The dog was not found"});
        }
    } catch (error) {
        console.log(error)
    }
})

const apiId = async (id) => {
    try {
        const answer = await allApiDogs()
        
        return answer.filter(e => e.id == id)[0];
        
    } catch (error) {
        console.log(error)
    }
}

const dbId = async (id) => {
    try {
        const idDb = await Dog.findByPk(id, {
            include: {                 
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        })

        console.log(idDb)
        return {
            id: id,
            name: idDb.name,
            image: idDb.image,
            lifeSpan: idDb.lifeSpan,
            weight: idDb.weight,
            height: idDb.height,
            created: idDb.created,
            temperament: idDb.temperaments.map((d) => d.name)
                 }
    } catch (error) {
        console.log(error)
    }
}

const iDDog = async (id) => {
    try {
        if(id.includes("-")) {
            const db = await dbId(id);
            return db
        }
        const api = await apiId(id);
        return api;
    } catch (error) {
        console.log(error)
    }
}

router.get("/:id", async (req, res) => {
    try {
    const id = req.params.id ;
    const idParams = await iDDog(id);
    if(idParams){
        return res.send(idParams)
    }
    return res.status(404).json({msg: "The ID was not found"})
    } catch (error) {
        console.log(error)
    }
})

router.delete("/", async (req, res) => {

    const {id} = req.body;
    try {
        deletedDogs = await Dog.destroy({
            where: {
                id: id,
            }
        })
    return res.status(200).json({msg: "The dog was deleted"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;