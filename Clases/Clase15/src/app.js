import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import studentsRouter from './routes/students.router.js';
import './db/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config archivos estaticos
app.use(express.static(__dirname + '/public'));

// config motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// routes
app.use('/students', studentsRouter);

app.listen(8080, () => {
	console.log('Escuchando al puerto 8080');
});
