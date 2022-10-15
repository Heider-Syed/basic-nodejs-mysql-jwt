const authModel = require("../models/auth.model");

exports.signup = async(req,res,next) =>{
    const {username,email,password,passwordConfirm} = req.body;

    //verifica si los campos estan en blanco
    if (!username || !email || !password || !passwordConfirm) {
        return res.status(400).json({message:"Please fill all the fields to sign up"});
    } else {
        //revisa si la contraseña es igual a la confirmacion
        if (password !== passwordConfirm) {
            res.status(400).json({message:"Password and password confirm are not a match"});
        } else {
            //console.log(username+" "+email+" "+password+" "+passwordConfirm)
            await authModel.register(username,email,password,req,res,next);
        }
    }
};

exports.login = async(req,res,next) =>{
    const { email,password } = req.body;

    //revisa si los campos estan en blanco
    if(!email || !password){
        return res.status(400).json({message: "Please fill all the fields to login!"});
    }else{
        //procede si todo esta bien y espera la respuesta
        await authModel.login(email,password,req,res,next);
    }
};