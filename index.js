const express = require('express')
const app = express();
const {pokemon} = require('./pokedex.json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
Verbos HTTP
GET
POST
PATCH
PUT
DELETE
*/
app.get("/", (req,res,next)=>{
    return res.status(200).send("Bienvenido al pokedex");
     
});
app.get("/pokemon", (req,res,next)=>{
    
    return res.status(200).send(pokemon);
    
});

app.post("/pokemon", (req,res,next)=>{
    
    return res.status(200).send(req.body.name);
     
});
app.get("/pokemon/:id([0-9]{1,3})", (req,res,next)=>{
    const id =req.params.id -1;
    if (id >= 0 && id <= 151) 
        return res.status(200).send(pokemon[req.params.id -1]);
        
        return res.status(404).send("Pokemon no encontrado");
        
    
    
});
app.get("/pokemon/:name([A-Za-z]+)", (req,res,next)=>{
    const name =req.params.name;
    const pokemonFilter = pokemon.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    }); 
    
    if(pokemonFilter.length > 0)  
    return res.status(200).send(pokemonFilter)

    return res.status(404).send("Pokemon no encontrado");

});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running");
});