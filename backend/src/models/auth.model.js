const db = require("../utils/databaseConnection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {

    register: async (uName,uEmail,uPassword,req,res,next) => {
        try {
            //busca si el correo ya estaba en uso por un usuario
            db.connection.query("SELECT * FROM users WHERE user_email = ?",[uEmail], async (error,results) =>{
                if(error){
                    console.log(error);
                    next(error);
                }
                //si un usuario ya estaba usando ese mismo correo no le permite crear el usuario
                if(results.length > 0){
                    return res.status(400).json({message:"That email is already in use"});
                }else{
                    let hashedPassword = await bcrypt.hash(uPassword, 12);//espera a que bcrypt hashee la contraseña (n) cantidad de civlos.
                    //inserta los datos del usuario en la base de datos
                    db.connection.query("INSERT INTO users (username, user_email, user_password) VALUES (?, ?, ?)",[uName,uEmail,hashedPassword], (error,results) =>{
                        if(error){
                            console.log(error);
                        }else{
                            //envia un mensaje diciendo que el usuario ha sido registrado exitosamente.
                            return res.status(200).json({message: "User registered successfully!"});
                        }
                    });
                }
            });
        } catch (error) {
            return next(error);
        }
    },

    login: async (uEmail,uPassword,req,res,next) => {
        try {
            db.connection.query("SELECT * FROM users WHERE user_email = ?",[uEmail], async (error,results) =>{
                if(results.length == 0){
                    return res.status(400).json({message: "That user doesn't exists"});
                }else{
                    if(!results || !await(bcrypt.compare(uPassword, results[0].user_password))){
                        return res.status(401).json({message: "The provided email or password is incorrect"});
                    }else{
                        //obtiene los datos del usuario del resultado
                        const userid = results[0].id;
                        const userEmail = results[0].user_email;
                        const username = results[0].username;

                        //crea el jwt token, le pasa el contenido "payload", lo encripta con la contraseña secreta del servidor y lyego le dice cuando expira
                        const jwtToken = jwt.sign({userid,userEmail,username}, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });

                        //envia como json el token y el id del usuario
                        return res.status(200).json({JWT_TOKEN: jwtToken, userID: userid });
                    }
                }
            });
        } catch (error) {
            return next(error);
        }
    },
}