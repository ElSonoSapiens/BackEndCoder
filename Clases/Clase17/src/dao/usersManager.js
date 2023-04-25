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

	async paginateFun(limit, page) {
		try {
			const result = await usersModel.paginate(
				{ gender: 'Male' },
				{ limit, page }
			); // limit => cantidad de objetos por busqueda, page => pagina en la que realiza la busqueda
			const info = {
				count: result.totalDocs,
				page: result.totalPages,
				next: result.hasNextPage
					? `http://localhost:8080/users/paginate?page=${result.nextPage}`
					: null,
				prev: result.hasPrevPage
					? `http://localhost:8080/users/paginate?page=${result.prevPage}`
					: null,
			};
			return { info, results: result.docs };
		} catch (error) {
			console.log(error);
		}
	}
}
