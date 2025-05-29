import { sendRequest } from "../helpers/requestHelpers";
import type { User, UserWithoutId } from "../types";

export async function getAllUsers(): Promise<User[]> {
  return await sendRequest<void, User[]>("http://localhost:3000/api/users");
}

export async function getUserById(id: number): Promise<User> {
  return await sendRequest<void, User>(`http://localhost:3000/api/users/${id}`);
}

export async function createUser(userData: UserWithoutId): Promise<User> {
  return await sendRequest<UserWithoutId, User>("http://localhost:3000/api/users", "POST", userData);
}

export async function updateUser(userData: User): Promise<User> {
  return await sendRequest<UserWithoutId, User>(`http://localhost:3000/api/users/${userData.id}`, "PUT", userData);
}

export async function deleteUser(id: number): Promise<void> {
  await sendRequest<void, void>(`http://localhost:3000/api/users/${id}`, "DELETE");
}
