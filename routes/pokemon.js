const express = require('express')
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.get('/', async(req,res,next)=>{
    const pkmn = await  db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
    
});

pokemon.post("/", (req,res,next)=>{
    
    return res.status(200).send(req.body.name);
     
});
pokemon.get ('/:id([0-9]{1,3})', async(req,res,next)=>{
    const id =req.params.id -1;
    pkmn = await  db.query("SELECT * FROM pokemon");
    if (id >= 0 && id <= 151) 
         
        return res.status(200).json(pkmn[req.params.id -1]);
        
        return res.status(404).send("Pokemon no encontrado");
        
     
    
});
pokemon.get('/:name([A-Za-z]+)', async(req,res,next)=>{
    const name =req.params.name;
    pkmn = await  db.query("SELECT * FROM pokemon");
    const pokemonFilter = pkmn.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    }); 
    
    if(pokemonFilter.length > 0)  
    return res.status(200).json(pokemonFilter)

    return res.status(404).send("Pokemon no encontrado");

});
module.exports = pokemon;