import axiosClient from "./axiosClient"
import {AuthResponse, LoginParams, SignupParams, VerifyResponse} from '../types/auth';

const authApi = {
    signup: (params: SignupParams): Promise<AuthResponse> => axiosClient.post('auth/signup', params),
    login: (params: LoginParams): Promise<AuthResponse> => axiosClient.post('auth/login', params),
    verifyToken: (): Promise<VerifyResponse> => axiosClient.post('auth/verify-token')
}

export default authApi