import  express  from "express";
import { config } from "dotenv";

import { allEmployee } from "./requete/requete";
config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => { 
    
    allEmployee(res)
})

app.listen(
    port,
    () => console.log(`Application is listening on port ${port}`)
)