import axiosClient from './axiosClient'
import {Task} from '../types/task';

const taskApi = {
    create: (boardId: string, params: { sectionId: string }): Promise<Task> => axiosClient.post(`boards/${boardId}/tasks`, params),
    updatePosition: (boardId: string, params: {
        resourceList: Task[],
        destinationList: Task[],
        resourceSectionId: string,
        destinationSectionId: string
    }) => axiosClient.put(
        `boards/${boardId}/tasks/update-position`,
        params
    ),
    delete: (boardId: string, taskId: string) => axiosClient.delete(`boards/${boardId}/tasks/${taskId}`),
    update: (boardId: string, taskId: string, params: any) => axiosClient.put(
        `boards/${boardId}/tasks/${taskId}`,
        params
    )
}

export default taskApi