import express from "express";
import bodyParser from "body-parser";
import Morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import { routeCollection } from "./infrastructure/routeCollection";
import { EmployeeController } from "./controller/controllerEmployee";

config();

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

// Configuration des middlewares
app.use(bodyParser.json());
app.use(Morgan("dev"));
app.use(cors());

// Enregistre le constructeur de classe du contrôleur dans le RouteCollection
routeCollection.registerController(EmployeeController, "employees");
// Enregistrement d'une route POST pour la création d'un employé


// Configuration des routes
routeCollection.setupRouter(router);
app.use(router);

// Démarrage du serveur
app.listen(port, () => console.log(`Application is listening on port ${port}`));
