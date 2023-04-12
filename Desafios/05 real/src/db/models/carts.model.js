import mongoose from 'mongoose';

// la estrictura se va a llamar schema

const cartsSchema = new mongoose.Schema({
	products: [
		{
			product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
			quantity: { type: Number },
		},
	],
});

export const cartsModel = mongoose.model('Carts', cartsSchema); // metodo para crear una coleccion/modelo
