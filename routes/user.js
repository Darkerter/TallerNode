const express = require('express')
const user = express.Router();
const db = require('../config/database');

user.get('/', async(req,res,next)=>{
    const user = await  db.query("SELECT * FROM user");
    return res.status(200).json({code:200, message:user});
    
});

user.post('/', async(req,res,next)=>{
    const {user_name, user_mail, user_password} = req.body

    if(user_name && user_mail && user_password){

        let query = `INSERT INTO user(user_name, user_mail, user_password) `;
        query += `VALUES ('${user_name}','${user_mail}','${user_password}')`;

        const rows = await  db.query(query);

            if(rows.affectedRows == 1)
                return res.status(200).json({code:201, message:"usuario insertado correctamente"});

            return res.status(500).json({code:500,message:"ocurrio un error"});
            
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});
    
    
});

module.exports = user;