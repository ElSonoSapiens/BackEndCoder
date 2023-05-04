import Router from './customRouter.js';

// vamos a empezar a estructurar todo con clases

export default class UsersRouter extends Router {
	init() {
		this.get('/', (req, res) => {
			res.successResponse('Todo va bien');
		});

		this.get('/error', (req, res) => {
			res.errorResponse('Se presento un error');
		});
	}
}
// Con esto se gana estandarizacion. Para todos se ejecuta una misma respuesta

export const usersRouter = new UsersRouter();
