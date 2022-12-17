import {User} from './user';

export interface SignupParams {
    username: string
    password: string
    confirmPassword: string
}

export interface LoginParams {
    username: string
    password: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface VerifyResponse {
    user: User
}