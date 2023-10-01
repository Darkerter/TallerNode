const express = require('express')
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.get('/', async(req,res,next)=>{
    const pkmn = await  db.query("SELECT * FROM pokemon");
    return res.status(200).json({code:200, message:pkmn});
    
});



 
pokemon.post("/", async(req,res,next)=>{
    const {pok_name,pok_height,pok_weight,pok_base_experience} = req.body;

    if(pok_base_experience && pok_height && pok_name && pok_weight){
        
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code:201,message:"pokemon insertado correctamente"}); 
        }
        
        return res.status(500).json({code:500,message:"ocurrio un error"});
        
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});

});

pokemon.delete('/:id([0-9]{1,3})', async(req,res,next)=>{
    const query =`DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(200).json({code:201,message:"Pokemon borrado correctamente"});
    }
        return res.status(404).json({code:404,message:"Pokemon no encontrado"})

});
pokemon.put ('/:id([0-9]{1,3})', async(req,res,next)=>{
        
    const {pok_name,pok_height,pok_weight,pok_base_experience} = req.body;
    if(pok_base_experience && pok_height && pok_name && pok_weight){
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height= ${pok_height} ,`;
        query += `pok_weight= ${pok_weight},pok_base_experience= ${pok_base_experience} WHERE pok_id=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code:201,message:"pokemon actualizado correctamente"}); 
        }
        
        return res.status(500).json({code:500,message:"ocurrio un error"});
        
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});

    
});
pokemon.patch ('/:id([0-9]{1,3})', async(req,res,next)=>{
        
        if(req.body.pok_name){
        const query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code:201,message:"Nombre del pokemon actualizado correctamente"}); 
        } 
        return res.status(500).json({code:500,message:"ocurrio un error"});
    }
    return res.status(500).json({code:500,message:"Campo incompleto"});
});
pokemon.get ('/:id([0-9]{1,3})', async(req,res,next)=>{
    const id =req.params.id -1;
    const pkmn = await  db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
    if (id >= 0 && id <= 722) 
         
        return res.status(200).json({code:200, message:pkmn[req.params.id -1]});
        
        return res.status(404).send({code:404, message:"Pokemon no encontrado"});
        
     
    
});
pokemon.get('/:name([A-Za-z]+)', async(req,res,next)=>{
    const name =req.params.name;
    const pkmn = await  db.query("SELECT * FROM pokemon WHERE pok_id='"+name+"';");
    const pokemonFilter = pkmn.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    }); 
    
    if(pokemonFilter.length > 0)  
    return res.status(200).json({code:200, message:pokemonFilter})

    return res.status(404).send({code:404, message:"Pokemon no encontrado"});

});
module.exports = pokemon;