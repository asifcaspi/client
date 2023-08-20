export interface Post {
    id: string;
    name: string;
    description: string;
    category_name: string;
    image: string;
    age: number;
    uploaded_by: string;
    sex?: string;
    taken_by?: string;
} 