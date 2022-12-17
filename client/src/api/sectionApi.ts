import axiosClient from './axiosClient'
import {Section} from '../types/section';

const sectionApi = {
    create: (boardId: string): Promise<Section> => axiosClient.post(`boards/${boardId}/sections`),
    update: (boardId: string, sectionId: string, params: any) => axiosClient.put(
        `boards/${boardId}/sections/${sectionId}`,
        params
    ),
    delete: (boardId: string, sectionId: string) => axiosClient.delete(`boards/${boardId}/sections/${sectionId}`)
}

export default sectionApi