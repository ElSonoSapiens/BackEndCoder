import { Router } from 'express';

const router = Router();
// array con usuarios y contraseñas
const users = [
	{
		username: 'Diego',
		password: '123',
	},
	{
		username: 'Lissie',
		password: '321',
	},
];

// ruta para iniciar sesion y comparar los datos ingresados con el array de users
router.post('/', (req, res) => {
	const { username, password } = req.body;
	const user = users.find(
		(u) => u.username === username && u.password === password
	);
	if (!user) {
		return res.json({ message: 'user not found' });
	}
	// Cuando el usuario coloque sus datos se va a estar generando esta sesion => guardada en src/sessions
	req.session['username'] = username;
	req.session['password'] = password;
	req.session['logged'] = true;
	res.json({ message: 'user found' });
});

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

export default router;

// lo negativo de manejarnos con FileSystem es que generamos un cementerio de archivos.






//minuto 44
