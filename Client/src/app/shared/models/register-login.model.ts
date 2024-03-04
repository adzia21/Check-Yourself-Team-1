export interface RegisterUser {
    password: string,
    name: string,
    surname: string,
    email: string,
    companyName?: string, // string?
    nip?: string, // string?
    company: boolean
}

export interface UserResponse {
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