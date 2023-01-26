import express from "express";

import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import morgan from "morgan";
import cors from 'cors'
import routes from './routes/index.js'
import {config} from 'dotenv'

config()
const server = express();

/* server.name = 'API'; */

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cors())
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/", routes);

/* server.get("/", async (req, res) => {

    try{

        connect();

        const newToDo = new toDo({
          name: "Andres",
          email: "Gomez",
          password: "Mora",
        });
      
        const nuevoTodo = await newToDo.save();

        disconnect()
      
        res.json(nuevoTodo);
    }catch(error){
        console.log(error)
        res.status(400).json('no se pudo guardar el documento')

    }
}); */

server.listen(process.env.PORT || 4545);
console.log("server on port 4545");
