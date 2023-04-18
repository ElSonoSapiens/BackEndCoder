import { usersModel } from '../db/models/users.model.js';

export default class UsersManager {
	// data => {email:''} {name:''} {id:''}
	async findUser(data) {
		try {
			const user = await usersModel.findOne(data).explain('executionStats'); // arroja el primer documento que cumpla con el parametro solicitado
			return user;
		} catch (error) {
			console.log(error);
		}
	}

	async addUsers(users) {
		try {
			await usersModel.create(users); // crea un nuevo documento con la info del parámetro
			return 'Users added';
		} catch (error) {
			console.log(error);
		}
	}
}
