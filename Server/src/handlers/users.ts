import { Request, Response } from 'express';
import { User } from '../models/User';

const users: User[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 40 },
  { id: 5, name: 'Eve', age: 28 }
]; // In-memory store

let nextId = users.length + 1; // Simple ID generator

export function getAllUsers(req: Request, res: Response): any {
  res.json(users);
}

export function getUser(req: Request, res: Response): any {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user);
}

export function createUser(req: Request, res: Response): any {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ message: 'Missing name or age' });

  const newUser: User = {
    id: nextId++,
    name,
    age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
}

export function updateUser(req: Request, res: Response): any {
  const { name, age } = req.body;
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (name) user.name = name;
  if (age) user.age = age;

  res.json(user);
}

export function deleteUser(req: Request, res: Response): any {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.status(204).send();
}
