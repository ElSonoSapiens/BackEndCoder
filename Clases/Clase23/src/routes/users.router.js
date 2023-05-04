import { Router } from 'express';

const router = Router();
/*
router.get('/:username([a-zA-Z+])', (req, res) => {
	// a la ruta dentro del () le podemos pasar la restriccion en Expresiones regulares
	const { username } = req.params;
	res.send(`El username es ${username}`);
});

router.put('/:username([a-zA-Z+])', (req, res) => {
	// a la ruta dentro del () le podemos pasar la restriccion en Expresiones regulares
	const { username } = req.params;
	res.send(`El username es ${username}`);
});

router.delete('/:username([a-zA-Z+])', (req, res) => {
	// a la ruta dentro del () le podemos pasar la restriccion en Expresiones regulares
	const { username } = req.params;
	res.send(`El username es ${username}`);
});
*/
router.get('/:username', (req, res) => {
	// a la ruta dentro del () le podemos pasar la restriccion en Expresiones regulares
	const { username } = req.params;
	res.send(`El username es ${username}`);
});

router.put('/:username', (req, res) => {
	// a la ruta dentro del () le podemos pasar la restriccion en Expresiones regulares
	const { username } = req.params;
	res.send(`El username es ${username}`);
});

router.delete('/:username', (req, res) => {
	// a la ruta dentro del () le podemos pasar la restriccion en Expresiones regulares
	const { username } = req.params;
	res.send(`El username es ${username}`);
});

// Toca colocar la restriccion en cada una de las rutas, por esta razon se usa router.param()
router.param('username', (req, res, next, username) => {
	//activa este middleware cada vez que ingresa un param dentro de username
	const regex = /^[a-zA-z]+$/;
	const paramIsValid = regex.test(username); // testea si lo que llega por username cumple con la restriccion de caracteres(regex) => entrega un valor booleano
	if (paramIsValid) {
		return next(); // Si cumple la condicion continúa con la ejecucion del endpoint
	}
	res.json({ error: 'Username not valid' });
});

router.post('/', async (req, res) => {
	const user = req.body;
	try {
		const newUser = await usersModel.create(user);
		res.json({ message: 'User created', user: newUser });
	} catch (error) {
		res.json({ message: 'Error' });
	}
});

export default router;

// Se puede personalizar el router como si fueran middlewares
// restringir desde las rutas evita profundizar en capas y optimiza el flujo
