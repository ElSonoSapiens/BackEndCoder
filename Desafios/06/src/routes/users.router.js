import { Router } from 'express';
import UsersManager from '../dao/UsersManager.js';
const router = Router();
const usersManager = new UsersManager();

// array con usuarios y contraseñas
// const users = [
// 	{
// 		email: "adminCoder@coder.com",
// 		password: 'adminCod3r123',
// 	},
// ];

// MongoStore
router.post('/', async (req, res) => {
	const { email, password } = req.body;
	const user = await usersModel.findOne({ email, password });
	if (!user) {
		return res.json({ message: 'user not found' });
	}
	req.session['username'] = email;
	req.session['password'] = password;
	req.session['logged'] = true;
	res.json({ message: 'user found' });
});

// Solo nos deja acceder cuando exista la sesion
router.get('/prueba', (req, res) => {
	console.log('session', req.session);
	if (req.session?.email) {
		res.send(`Bienvenido ${req.session.email}`);
		return;
	}
	// si alguien ya se encuentra logueado, no debería volver a loguearse, en consecuencia, deberíamos redireccionarlo a otro endpoint
	// res.redirect('No autorizado') // muestra este mensaje si el usuario que se coloca en login no se encuentra en el array users
	res.redirect('/views'); // si el usuario que se coloca en login no se encuentra en el array users, redirecciona al endpoint de views (donde se encuentra el formulario de login)
});

router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/views');
	}); // Destruimos la session y ejecutamos un callback (funcion flecha) que redireccione hacia otro endpoint
});

router.post('/registro', async (req, res) => {
	const newUser = await usersManager.createUser(req.body);
	if (newUser) {
		res.redirect('/views');
	} else {
		res.redirect('/views/errorRegistro');
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await usersManager.loginUser(req.body);
	if (user) {
		req.session.email = email;
		req.session.password = password;
		req.redirect('/views/realtimeproducts');
	} else {
		req.redirect('/views/errorLogin');
	}
});

export default router;
