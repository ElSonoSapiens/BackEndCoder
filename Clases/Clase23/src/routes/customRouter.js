import { Router } from 'express';

export default class CustomRouter {
	constructor() {
		this.router = Router();
		this.init();
	}

	getRouter() {
		return this.router;
	}

	//
	// reciben ruta + conjunto de funciones que tiene que resolver (middlewares) + callback final
	//
	// path "/:username"
	// functions:[middleware1,middleware2,middleware3,cb]
	//
	// como agrupar conjunto de funciones? con spread operator ...
	//

	/*
	get(path, ...functions) {
		this.router.get(path, this.resolveFunctions(functions)); // todos los metodos llaman a su metodo equivalente pasando el path y el callback correspondiente
	}
	post(path, ...functions) {
		this.router.get(path, this.resolveFunctions(functions));
	}
	put(path, ...functions) {
		this.router.get(path, this.resolveFunctions(functions));
	}
	delete(path, ...functions) {
		this.router.get(path, this.resolveFunctions(functions));
	}
	*/

	//
	// se reemplaza resolveFunctions por customResponses
	//
	get(path, ...functions) {
		this.router.get(
			path,
			this.customResponses,
			this.resolveFunctions(functions)
		);
	}
	post(path, ...functions) {
		this.router.get(
			path,
			this.customResponses,
			this.resolveFunctions(functions)
		);
	}
	put(path, ...functions) {
		this.router.get(
			path,
			this.customResponses,
			this.resolveFunctions(functions)
		);
	}
	delete(path, ...functions) {
		this.router.get(
			path,
			this.customResponses,
			this.resolveFunctions(functions)
		);
	}
	// hasta aca no hicimos nada, solo un dolor de cabeza. 😂
	// El router personalizado hace exactamente lo mismo que el Router de express

	//
	//Crear metodo que resuelva funciones
	resolveFunctions(functionsArray) {
		// recibe arreglo de funciones y retorna la ejecucion de esas funciones
		return functionsArray.map((fn) => async (...params) => {
			try {
				await fn.apply(this, params); // con el metodo aplly garantizamos la ejecucon de las funciones ( Recordar que vienen en un array)
			} catch (error) {
				console.log(error);
			}
		});
	}

	// Si quiero tener respuestas customizadas
	customResponses(req, res, next) {
		res.successResponse = (message) => res.json({ status: 'Success', message });
		res.errorResponse = (error) =>
			res.json({ status: 'Error', message: error });
		next();
	}
}
