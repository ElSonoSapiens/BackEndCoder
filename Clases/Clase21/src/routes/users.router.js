import { Router } from 'express';
import UsersManager from '../persistencia/daos/UsersManager.js';
import { hashData, compareData } from '../utils.js';
import passport from 'passport';

const router = Router();
const usersManager = new UsersManager();

// MongoStore

// router.post('/', async (req, res) => {
// 	const { email, password } = req.body;
// 	const user = await usersModel.findOne({ email, password });
// 	if (!user) {
// 		return res.json({ message: 'user not found' });
// 	}
// 	// Cuando el usuario coloque sus datos se va a estar generando esta sesion => guardada en src/sessions
// 	req.session['username'] = username;
// 	req.session['password'] = password;
// 	req.session['logged'] = true;
// 	res.json({ message: 'user found' });
// });

// Solo nos deja acceder cuando exista la sesion
router.get('/prueba', (req, res) => {
	console.log('session', req.session);
	if (req.session?.username) {
		res.send(`Bienvenido ${req.session.username}`);
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

// router.post('/registro', async (req, res) => {
// 	const user = req.body;
// 	const hashPassword = await hashData(user.password); // metodo para hashear la contraseá
// 	const newUser = { ...user, password: hashPassword };
// 	await usersManager.createUser(newUser);
// 	if (newUser) {
// 		res.redirect('/views');
// 	} else {
// 		res.redirect('/views/errorRegistro');
// 	}
// });

// router.post('/login', async (req, res) => {
// 	const { email, password } = req.body;
// 	const user = await usersManager.loginUser(req.body);

// 	if (!user) {
// 		return res.json({ message: 'not found' });
// 	}
// 	const isPassword = await compareData(password, user.password);
// 	if (!isPassword) {
// 		res.json({ message: 'password not found ' });
// 	}
// 	if (user) {
// 		req.session.email = email;
// 		req.session.password = password;
// 		res.redirect('/views/perfil');
// 	} else {
// 		res.redirect('/views/errorLogin');
// 	}
// });

// Passport nos permite autenticar con diferentes aplicaciones para generar autenticaciones

// configurar passport y las distintas estrategias

// router.post('/login', passport.authenticate('local'), (req, res) => {
// 	console.log(req);
// 	res.send(`User found with email ${req.user.email}`);
// });

//
// PASSPORT

// REGISTRO
//

// router.post('/registro', passport.authenticate('registro'), (req, res) => {
// 	console.log(req.user);
// 	res.send('User created');
// });

router.post(
	'/registro',
	passport.authenticate('registro', {
		failureRedirect: '/views/errorRegistro',
		successRedirect: '/views',
	})
);

// LOGIN
//
router.post(
	'/login',
	passport.authenticate('login', {
		failureRedirect: '/views/errorLogin',
		successRedirect: '/views/perfil',
	})
);

// GITHUB
//
router.get(
	'/signUpGithub',
	passport.authenticate('github', { scope: ['user:email'] })
);
router.get('/github', passport.authenticate('github'), (req, res) => {
	res.send('User by Github');
});

export default router;
