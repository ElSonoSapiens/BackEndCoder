import { Router } from 'express';

const router = Router();

/*
router.get('/', (req, res) => {
	res.render('login');
});
*/

// router.get('/', (req, res) => {
// 	if (req.session.username) {
// 		res.redirect('/users/prueba'); // Si hay una sesion ejecutandose, redirecciona a la bienvenida
// 		return; // si se cumple la condicion, se ejecuta el bloque y no continúa leyendo
// 	}
// 	res.render('login');
// });

// Renderizar la vista login a ingresar al endpoint "/"
router.get('/', (req, res) => {
	res.render('login');
});

// Renderizar la vista registro a ingresar al endpoint "/registro"
router.get('/registro', (req, res) => {
	res.render('registro');
});

// Renderizar la vista errorRegistro a ingresar al endpoint "/errorRegistro"
router.get('/errorRegistro', (req, res) => {
	res.render('errorRegistro');
});

// Renderizar la vista errorRegistro a ingresar al endpoint "/errorLogin"
router.get('/errorLogin', (req, res) => {
	res.render('errorLogin');
});

// Renderizar la vista errorRegistro a ingresar al endpoint "/perfil"
router.get('/perfil', (req, res) => {
	res.render('perfil');
});

export default router;
