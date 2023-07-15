import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const URI =
	'mongodb+srv://elSonoSapiens:2xyjhtHqPvGEOdZG@cluster0.eu8lqfi.mongodb.net/ecommerce?retryWrites=true&w=majority'; // se debe reemplazar la contraseña y luego del / colocar el nombre de la base de datos ?

mongoose
	.connect(URI)
	.then(() => logger.info('conected to database'))
	.catch((error) => logger.error(error));
