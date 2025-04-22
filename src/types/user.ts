export interface User {
    id: string;
    _id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    gender: 'male' | 'female' | 'other';
    age: number;
    address: string;
    displayName?: string;
    photoURL?: string;
    password?: string;
}

export interface UserFormData extends Partial<Omit<User, 'id' | '_id'>> {
    _id?: string;
    id?: string;
    password?: string;
}