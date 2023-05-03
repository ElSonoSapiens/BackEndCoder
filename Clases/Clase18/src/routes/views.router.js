import { Router } from 'express';

const router = Router();

// en ruta raiz se ejecuta el view login.hbs
router.get('/', (req, res) => res.render('login'));

export default router;
