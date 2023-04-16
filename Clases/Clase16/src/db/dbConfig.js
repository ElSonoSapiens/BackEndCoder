import mongoose from 'mongoose';

const URI =
	'mongodb+srv://elSonoSapiens:2xyjhtHqPvGEOdZG@cluster0.eu8lqfi.mongodb.net/clase16?retryWrites=true&w=majority';

mongoose
	.connect(URI)
	.then(() => console.log('Conectado a la dataBase'))
	.catch((error) => console.log(error));
