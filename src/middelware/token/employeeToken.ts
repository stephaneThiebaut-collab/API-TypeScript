import jwt from "jsonwebtoken";
import { TokenPayload } from "../interface/interfaceMapping";

async function generateToken(): Promise<string> {
        const payload = {
            data: 'foobar'
        };
        const secret = 'yourSecretKey';
        const expiresIn = 60 * 60; //1H
    
        try {
            const token = await jwt.sign(payload, secret, { expiresIn });
            return token;
        } catch (error) {
            throw new Error('Une erreur est survenue')
        }
}

async function verificationToken(token: any): Promise<TokenPayload | null> {
    try {
        var decoded = jwt.verify(token, 'yourSecretKey') as TokenPayload;
        return decoded;
    } catch (error) {
        throw new Error('Token invalide')
    }
}

export { generateToken, verificationToken }