export interface User {
  id: string;
  avatar: string;
  fullname: string;
  age: Date;
  state: string;
  street: string;
  city: string;
  neighborhood: string;
  bio: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  id: string;
  avatar: File;
  fullname: string;
  age: Date;
  state: string;
  street: string;
  city: string;
  neighborhood: string;
  bio: string;
}

export interface UpdateUserData {
  avatar?: File;
  fullname?: string;
  age?: Date;
  state?: string;
  street?: string;
  city?: string;
  neighborhood?: string;
  bio?: string;
}
