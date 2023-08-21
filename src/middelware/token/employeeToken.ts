import jwt from "jsonwebtoken";

async function generateToken(): Promise<string> {
    return new Promise (async (resolve, reject) => {
        const payload = {
            data: 'foobar'
        };
        const secret = 'yourSecretKey';
        const expiresIn = 60 * 60;
    
        try {
            const token = await jwt.sign(payload, secret, { expiresIn });
            // console.log(token);
            resolve(token)
        } catch (error) {
            // console.error('Erreur lors de la génération du token :', error);
            reject(error)
        }
    })
}

export { generateToken }