import { userModel } from '../db/models/users.model.js';

// creamos clase para exportar funcionalidades
export default class UsersManager {
	//
	async createUser(user) {
		const { email } = user;
		try {
			// lo primero es chequear si existe el usuario
			const existeUsuario = await userModel.find({
				email,
			});
			// si no existe el usuario, lo crea
			if (existeUsuario.lenght !== 0) {
				const newUser = await userModel.create(user);
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
		const { email, password } = user;
		const usuario = await userModel.find({ email, password });
		if (usuario.lenght !== 0) {
			return usuario;
		} else {
			return null;
		}
	}
}
