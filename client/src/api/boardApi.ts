import axiosClient from './axiosClient'
import {Board} from '../types/board';

const boardApi = {
    create: () => axiosClient.post('boards'),
    getAll: () => axiosClient.get('boards'),
    updatePosition: (params: { boards: Board[] }) => axiosClient.put('boards', params),
}

export default boardApi