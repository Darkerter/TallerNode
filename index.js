//Depedencies
const express = require('express')
const morgan = require ('morgan');
const jwt = require('jsonwebtoken');
const app = express();
//routes
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index); 
app.use("/user",user);
app.use(auth);

app.use("/pokemon",pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3001,()=>{
    console.log("Server is running");
});