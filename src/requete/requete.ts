import { createDbConnection } from "../middelware/mysqlConnection";

export async function allEmployee(res: any){
    const connection = await createDbConnection();
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM employee');
        console.log('Résultat de la requête SELECT :', rows);
        return res.status(201).json({message: rows})

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        return res.status(401).json({message: error})
    } finally {
        await connection.end();
    }
} 