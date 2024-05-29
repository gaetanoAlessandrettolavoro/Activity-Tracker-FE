export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "admin",
    codiceFiscale: string,
    propic?: string     //or ANY???
}