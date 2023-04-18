import { coursesModel } from '../db/models/courses.model.js';

export default class CoursesManager {
	// async findCourse(id) {
	// 	try {
	// 		const course = await coursesModel.find({ _id: id }); // busca el id del objeto
	// 		return course;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	async findCourse(id) {
		try {
			const course = await coursesModel
				.find({ _id: id })
				.populate(['teacher', 'students']); // busca el id del objeto y muestra todo su contenido
			return course;
		} catch (error) {
			console.log(error);
		}
	}

	async createCourse(objCourse) {
		try {
			const course = await coursesModel.create(objCourse);
			return course;
		} catch (error) {
			console.log(error);
		}
	}
}
