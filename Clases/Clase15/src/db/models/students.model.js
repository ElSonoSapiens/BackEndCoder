import mongoose from 'mongoose';

// la estrictura se va a llamar schema

const studentsSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	dni: {
		type: Number,
		required: true,
		unique: true,
	},
	course: {
		type: String,
		required: true,
	},
	note: {
		type: Number,
		required: true,
	},
});

export const studentsModel = mongoose.model('Students', studentsSchema); // metodo para crear una coleccion/modelo
