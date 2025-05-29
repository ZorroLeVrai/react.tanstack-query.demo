export interface User {
  id: number;
  name: string;
  age: number;
}

export type UserWithoutId = Omit<User, 'id'>;