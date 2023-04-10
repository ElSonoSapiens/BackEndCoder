import mongoose from 'mongoose';

// la estrictura se va a llamar schema

const cartsSchema = new mongoose.Schema({
	product: {
		type: String,
	},
	quantity: {
		type: Number,
	},
});

export const cartsModel = mongoose.model('Carts', cartsSchema); // metodo para crear una coleccion/modelo
