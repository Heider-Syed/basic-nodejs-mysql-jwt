const jwt = require("jsonwebtoken");

exports.verifyToken = async(req, res, next) => {
    //revisa que el token sea enviado del frontend con este header
    let jwtToken = req.headers["x-access-token"];
    
    if (!jwtToken) {
        return res.status(403).json({message: "No token provided!"});
    }
    
    //verifica que el token que esta firmado con la clave secreta del servidor sea correcto
    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({message: "Unauthorized!"});
        }
        //console.log(jwtToken)
        //console.log(decodedToken)

        // Exporta los datos obtenidos del token para que los usen otras funciones
        exports.decodedID = decodedToken.userid;
        exports.decodedUsername = decodedToken.username;
        exports.decodedEmail = decodedToken.userEmail;

        //envia un resultado al frontend
        req.isLoggedIn = true;

        next();
    });
};