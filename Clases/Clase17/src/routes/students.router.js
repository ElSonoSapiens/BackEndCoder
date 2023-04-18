import { Router } from 'express';
import { __dirname } from '../utils.js';
import StudentsManager from '../dao/studentsManager.js';
import fs from 'fs';

const router = Router();
const path = __dirname + '/data/Students.json';
const studentsManager = new StudentsManager(); // instancia de la clase studentsManager

router.get('/add', async (req, res) => {
	// agrega un usuario
	const studentsData = await fs.promises.readFile(path, 'utf-8'); // lee el archivo students.json
	await studentsManager.addStudents(JSON.parse(studentsData));
	res.json({ message: 'Students added' });
});

router.get('/aggregation', async (req, res) => {
	const response = await studentsManager.aggregationFun();
	res.json({ response });
});

export default router;

// me quedé en 28mins
