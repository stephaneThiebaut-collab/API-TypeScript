import jwt from "jsonwebtoken";
import { TokenPayload } from "../interface/interfaceMapping";
import { config } from "dotenv";

config();

const secret = JSON.stringify(process.env.SECRET_TOKEN)

class Token {

    secret: string = JSON.stringify(process.env.SECRET_TOKEN);

    async generateToken(id: number): Promise<string> {
        const payload = {
            id: id
        };
        
        const expiresIn = 60 * 60; //1H
    
        try {
            const token = await jwt.sign(payload, this.secret, { expiresIn });
            return token;
        } catch (error) {
            throw new Error('Une erreur est survenue')
        }
}

    async verificationToken(token: any): Promise<TokenPayload | null> {
        try {
            var decoded = jwt.verify(token, this.secret) as TokenPayload;
            return decoded;
        } catch (error) {
            throw new Error('Token invalide')
        }
}

}

const tokenClass = new Token()

export { tokenClass }