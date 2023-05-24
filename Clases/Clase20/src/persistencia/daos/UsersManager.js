import { usersModel } from '../models/users.model.js';

// creamos clase para exportar funcionalidades
export default class UsersManager {
	//
	async createUser(user) {
		const { email } = user;
		try {
			// lo primero es chequear si existe el usuario
			const existeUsuario = await usersModel.find({
				email,
			});
			// si no existe el usuario, lo crea
			if (existeUsuario.lenght !== 0) {
				const newUser = await usersModel.create(user);
				return newUser; //
			} else {
				// Si existe, retorna null
				return null;
			} //
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

	async loginUser(user) {
		const { email } = user;
		const usuario = await usersModel.findOne({ email });
		if (usuario) {
			return usuario;
		} else {
			return null;
		}
	}
}
