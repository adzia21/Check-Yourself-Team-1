export interface RegisterUser {
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    roles: string, // string czy enum
    companyName?: string, // string?
    nip?: string // string?
}

export interface RegisterUserResponse {
    id: number,
    name: string,
    username: string,
    surname: string,
    email: string,
    companyName: string,
    nip: string,
    roles: Roles[],
    description: string,
    company: boolean
}

export interface Roles {
    id: number,
    name: string
}

export interface LoginUser {
    username: string,
    password: string
}

export interface LoginUserResponse {
    token: string,
    type: string,
    id: number,
    username: string,
    email: string,
    roles: Roles
}