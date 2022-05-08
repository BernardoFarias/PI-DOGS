const { Router } = require("express");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const router = Router();
const { Temperament } = require("../db");

const allApiDogs = async () => {
    try {
        const package = await axios.get(
            `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
        );
       
        const temp = package.data.map(e => {
            return e.temperament?.split(", ")
        })
        const tempFilter = temp.filter(e => e !== undefined)
        
        var tempEach = [] ;
        tempFilter.map((el) => {
            tempEach = tempEach.concat(el)
            })
            
        const set = new Set(tempEach) // Con Set evito que se repitan
        const setToArray = Array.from(set)
       
        return setToArray.sort();
    } catch (error) {
        console.log(error)
    }
}

const dogTemps = async() => {
    try {
        const tempsDB = await Temperament.findAll() ;
        if(tempsDB.length) {
        return tempsDB
        } ;

        const tempsArray = await allApiDogs() ;

        tempsArray.map(async (e) => {
            await Temperament.findOrCreate({
                where: {name: e}
            })
        })

        const tempsAPI = await Temperament.findAll()

        if(tempsAPI.length) return tempsAPI;

        return { error: "Temps not found" };
    } catch (error){
        console.log(error)
    }
}

router.get("/" , async (req, res) => {
    try {
        const allTemps = await dogTemps();
        res.send(allTemps)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;