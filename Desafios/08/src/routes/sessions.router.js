import { Router } from 'express';

const router = Router();

router.get('/current', (req, res) => {
	res.send(`Esta es la ruta current`);
});

export default router;
