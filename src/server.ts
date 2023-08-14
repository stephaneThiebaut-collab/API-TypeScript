import  express  from "express";
import  bodyParser  from "body-parser";
import  Morgan  from "morgan";
import  cors  from "cors";
import { config } from "dotenv";

import "./controller/controllerEmployee";

import employeeRoutes from "./route/employee";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(Morgan("dev"));
app.use(cors());


app.use("/employees", employeeRoutes);



app.listen(
    port,
    () => console.log(`Application is listening on port ${port}`)
);