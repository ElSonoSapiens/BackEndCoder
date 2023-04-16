import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId, // es un id que va a referenciar al objeto guardado
		ref: 'Users', // hace referencia a la colección donde se guarda el documento
	},
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
	],
});

export const coursesModel = mongoose.model('Courses', coursesSchema);
