import express from 'express';
import './persistencia/dbConfig.js';
import usersRouter from './routes/users.router.js';
import { usersRouter } from './routes/usersCustom.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', usersRouter.getRouter());

app.listen(8080, () => {
	console.log(`Escuchando al puerto ${8080}`);
});
