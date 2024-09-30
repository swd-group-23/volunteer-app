export interface User {
    id: string;
    email: string;
    password: string;
    role: 'volunteer' | 'admin';
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}