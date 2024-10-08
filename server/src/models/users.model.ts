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

export interface LoginUserResponse {
    id: string;
    role: 'volunteer' | 'admin';
}

export interface UpdateUserRequest {
    email: string;
    password: string;
}