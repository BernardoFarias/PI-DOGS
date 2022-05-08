const { Router } = require("express");
const { Dog, Temperament } = require("../db.js")
const router = Router();

router.post("/", async (req, res) => {
    try {
        const {name, height, weight, lifeSpan, temperament, image} = req.body

        const newDog = await Dog.create({
            name,
            height, 
            weight, 
            lifeSpan, 
            image: image ||
            "https://previews.123rf.com/images/photodeti/photodeti1704/photodeti170400223/77001065-perro-fot%C3%B3grafo-toma-de-fotograf%C3%ADas-aislado-sobre-fondo-blanco-.jpg"
        })
        const temp = await Temperament.findAll({
            where: {name: temperament}
        });

        console.log(temp)

        newDog.addTemperament(temp) // // Vinculo el temperamento con la raza creada

        return res.send(newDog);
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;