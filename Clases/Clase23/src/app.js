import express from 'express';
import './persistencia/dbConfig.js';
// import usersRouter from './routes/users.route r.js';
import { usersRouter } from './routes/usersCustom.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/users', usersRouter);
app.use('/users', usersRouter.getRouter());

app.listen(8080, () => {
	console.log(`Escuchando al puerto ${8080}`);
});
