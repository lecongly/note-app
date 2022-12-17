import {Task} from './task';

export interface Section {
    board: string;
    title: string;
    _id?: string;
    __v?: number;
    tasks: Task[];
    id: string;
}