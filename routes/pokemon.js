const express = require('express')
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.get('/', async(req,res,next)=>{
    const pkmn = await  db.query("SELECT * FROM pokemon");
    return res.status(200).json({code:1, message:pkmn});
    
});

pokemon.post("/", (req,res,next)=>{
    
    return res.status(200).json({code:1, message:req.body.name});
     
});
pokemon.get ('/:id([0-9]{1,3})', async(req,res,next)=>{
    const id =req.params.id -1;
    const pkmn = await  db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
    if (id >= 0 && id <= 722) 
         
        return res.status(200).json({code:1, message:pkmn[req.params.id -1]});
        
        return res.status(404).send({code:404, message:"Pokemon no encontrado"});
        
     
    
});
pokemon.get('/:name([A-Za-z]+)', async(req,res,next)=>{
    const name =req.params.name;
    const pkmn = await  db.query("SELECT * FROM pokemon WHERE pok_id='"+name+"';");
    const pokemonFilter = pkmn.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    }); 
    
    if(pokemonFilter.length > 0)  
    return res.status(200).json({code:1, message:pokemonFilter})

    return res.status(404).send({code:404, message:"Pokemon no encontrado"});

});
module.exports = pokemon;