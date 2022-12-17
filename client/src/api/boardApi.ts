import axiosClient from './axiosClient'
import {Board} from '../types/board';

const boardApi = {
    create: () => axiosClient.post('boards'),
    getAll: () => axiosClient.get('boards'),
    updatePosition: (params: { boards: Board[] }) => axiosClient.put('boards', params),
    getOne: (id: string): Promise<Board> => axiosClient.get(`boards/${id}`),
    delete: (id: string) => axiosClient.delete(`boards/${id}`),
    update: (id: string, params: any) => axiosClient.put(`boards/${id}`, params),
    getFavourites: () => axiosClient.get('boards/favourites'),
    updateFavouritePosition: (params: { boards: Board[] }) => axiosClient.put('boards/favourites', params)
}

export default boardApi