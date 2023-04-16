import express from 'express';
import usersRouter from '../src/routes/users.router.js';
import coursesRouter from '../src/routes/courses.router.js';
import './db/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/courses', coursesRouter);

app.listen(8080, () => {
	console.log('escuchando puerto 8080');
});
