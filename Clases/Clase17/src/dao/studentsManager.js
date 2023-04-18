import { studentsModel } from '../db/models/students.model.js';

export default class StudentsManager {
	async addStudents(students) {
		try {
			await studentsModel.create(students); // crea un nuevo documento con la info del parámetro
			return 'Students added';
		} catch (error) {
			console.log(error);
		}
	}

	async aggregationFun() {
		try {
			const response = await studentsModel.aggregate([
				{ $match: { calification: { $gt: 5 } } },
			]);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
}
