import { Router } from 'express';

const router = Router();

/*
router.get('/', (req, res) => {
	res.render('login');
});
*/

router.get('/', (req, res) => {
	if (req.session.username) {
		res.redirect('/users/prueba'); // Si hay una sesion ejecutandose, redirecciona a la bienvenida
		return; // si se cumple la condicion, se ejecuta el bloque y no continúa leyendo
	}
	res.render('login');
});

export default router;
