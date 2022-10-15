const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: "./.env"});//archivo de control para info sensible.
const PORT = 3000;
const cors = require("cors");
const logger = require("morgan");

//settings
app.use(cors());

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger("dev"));

//seting up all the routes
app.use("/auth", require("./routes/auth.routes"));

app.use("/posts", require("./routes/posts.routes"));


//Puerto y escucha del servidor.
app.listen(PORT, () => {console.log(`Server listening on http://localhost:${PORT}`)});