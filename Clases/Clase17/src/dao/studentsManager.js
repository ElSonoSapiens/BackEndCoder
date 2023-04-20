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
				// { $count: 'cantidad' },
				// { $match: { gender: 'Female' } },
				// { $count: 'female_students_more_than_5' },
				{
					$group: {
						_id: '$gender',
						gender_count: { $count: {} },
						promedio_calification: { $avg: '$calification' },
					},
				},
				//	{ $sort: { promedio_calification: -1 } },
				{ $sort: { gender_count: -1 } },
				// { $count: 'final_count' },
				{ $match: { gender_count: { $gte: 4 } } },
			]);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
}
