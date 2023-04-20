import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const usersSchema = new mongoose.Schema({
	first_name: {
		type: String,
		index: true, // se va a indexar
	},

	last_name: {
		type: String,
	},
	email: {
		type: String,
		unique: true, // para que sea único // todas las propiedades que sean únicas se van a indexar ej: id o email
	},
	gender: {
		type: String,
	},
});

usersSchema.plugin(mongoosePaginate);

export const usersModel = mongoose.model('Users', usersSchema);
