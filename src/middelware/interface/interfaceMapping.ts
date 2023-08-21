interface EmployeeInformation {
    id: string,
    firstName: string,
    lastName: string, 
    email: string, 
    teams: string,
    password: string
}

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export { EmployeeInformation, TokenPayload }