import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../handlers/users';

const router = Router();


// GET /users
router.get("/", getAllUsers);

// GET /users/:id
router.get("/:id", getUser);

// POST /users
router.post('/', createUser);

// PUT /users/:id
router.put('/:id', updateUser);

// DELETE /users/:id
router.delete('/:id', deleteUser);

export default router;
