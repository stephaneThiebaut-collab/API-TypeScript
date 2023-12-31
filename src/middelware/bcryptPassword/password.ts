import bcrypt from "bcrypt";

async function passwordHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function comparePasswordHash(password: string, resultPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, resultPassword);
        return match;
    } catch (error) {
        throw error;
    }
}

export { passwordHash, comparePasswordHash };
