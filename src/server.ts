import  express  from "express";
import { config } from "dotenv";
import { createDbConnection } from "./middelware/mysqlConnection";
config();

const app = express();

const port = process.env.PORT || 3000;

async function main() {
    const connection = await createDbConnection();

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM employee');
        console.log('Résultat de la requête SELECT :', rows);

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    } finally {
        await connection.end(); // Ferme la connexion à la base de données de manière asynchrone
    }
    }
    main();

app.listen(
    port,
    () => console.log(`Application is listening on port ${port}`)
)