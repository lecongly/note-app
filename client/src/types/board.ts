export interface Board {
    user: string;
    icon: string;
    title: string;
    description: string;
    position: number;
    favourite: boolean;
    favouritePosition: number;
    id: string;
    sections?: any
}
