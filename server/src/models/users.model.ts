export interface User {
    id: string;
    email: string;
    password: string;
    role: 'volunteer' | 'admin';
}

export interface CreateUserRequest {
    email: string;
    password: string;
    role: 'volunteer' | 'admin';
}

export interface LoginUserRequest {
    email: string;
    password: string;
}