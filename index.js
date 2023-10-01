const express = require('express')
const morgan = require ('morgan');
const app = express();
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res,next)=>{
    return res.status(200).json({code:200, message:"Bienvenido al pokedex"});
     
}); 

app.use("/pokemon",pokemon);
app.use("/user",user);

app.use((req,res,next) =>{
    return res.status(404).json({code: 404,message:"Pagina no encontrada"});
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running");
});