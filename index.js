const express = require('express')
const app = express();
const {pokemon} = require('./pokedex.json');
/*
Verbos HTTP
GET
POST
PATCH
PUT
DELETE
*/
app.get("/", (req,res,next)=>{
    return res.status(200).res.send("Bienvenido al pokedex");
     
});
app.get("/pokemon/all", (req,res,next)=>{
    
    return res.status(200).send(pokemon);
    
});
app.get("/pokemon/:id([0-9]{1,3})", (req,res,next)=>{
    const id =req.params.id -1;
    if (id >= 0 && id <= 151) {
        return res.status(200).send(pokemon[req.params.id -1]);
        
    }else{
        return res.status(404).send("Pokemon no encontrado");
        
    }
    
});
app.get("/pokemon/:name", (req,res,next)=>{
    const name =req.params.name;
    for (let i = 0; i < pokemon.length; i++) {
       if (pokemon[i].name== name) {
           return res.status(200).send(pokemon[i]);
            
       }else{
           return res.status(404).send("Pokemon no encontrado");
            
       }  
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running");
});