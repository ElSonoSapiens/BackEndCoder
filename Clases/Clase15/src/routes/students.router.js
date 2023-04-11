import { Router } from 'express';
import StudentsManager from '../dao/studentsManagerFS.js';
//import StudentsManager from '../dao/studentsManagerMongo.js';

const studentsManager = new StudentsManager(); // nueva instancia de StudentsManager

const router = Router();

//async(req,res)=>{}
router.get('/', async (req, res) => {
	const students = await studentsManager.getAllStudents();
	res.json({ message: 'Students', students });
});

router.post('/', async (req, res) => {
	const newStudent = await studentsManager.createStudent(req.body);
	res.json({ message: 'Student created', student: newStudent });
});

export default router;
