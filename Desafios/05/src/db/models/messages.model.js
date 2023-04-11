import mongoose from 'mongoose';

// La estrictura se va a llamar schema

const messagesSchema = new mongoose.Schema({
	user: {
		type: String,
	},
	// message: {
	// 	type: String,
	// },
	message: {
		type: Array,
	},
});

export const messagesModel = mongoose.model('messages', messagesSchema); // metodo para crear una coleccion/modelo
