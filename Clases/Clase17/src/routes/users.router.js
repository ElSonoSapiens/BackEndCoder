import { Router } from 'express';
import { __dirname } from '../utils.js';
import UsersManager from '../dao/usersManager.js';
import fs from 'fs';

const router = Router();
const path = __dirname + '/data/Users.json';
const usersManager = new UsersManager(); // instancia de la clase UsersManager

router.get('/', async (req, res) => {
	const data = { _id: '643b79adc5dc662184db16c8' }; // todas las propiedades que sean únicas se van a indexar ej: id o email
	const user = await usersManager.findUser(data);
	res.json({ user });
}); // muetra todos los usuarios

router.get('/add', async (req, res) => {
	// agrega un usuario
	const usersData = await fs.promises.readFile(path, 'utf-8'); // lee el archivo users.json
	await usersManager.addUsers(JSON.parse(usersData));
	res.json({ message: 'Users added' });
});

export default router;
