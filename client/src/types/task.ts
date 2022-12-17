import {Section} from './section';

export interface Task {
    content: string
    id: string
    position: number
    section: Section
    createdAt: Date
    title: string
    __v?: number
    _id?: string
}