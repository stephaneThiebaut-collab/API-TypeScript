import jwt from "jsonwebtoken";

async function generateToken(): Promise<string> {
        const payload = {
            data: 'foobar'
        };
        const secret = 'yourSecretKey';
        const expiresIn = 60 * 60;
    
        try {
            const token = await jwt.sign(payload, secret, { expiresIn });
            return token;
        } catch (error) {
            throw new Error('Une erreur est survenue')
        }
}

export { generateToken }