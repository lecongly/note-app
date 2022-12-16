import axiosClient from "./axiosClient"
import {LoginParams, SignupParams} from '../types/auth';

const authApi = {
    signup: (params: SignupParams) => axiosClient.post('auth/signup', params),
    login: (params: LoginParams) => axiosClient.post('auth/login', params),
    verifyToken: () => axiosClient.post('auth/verify-token')
}

export default authApi