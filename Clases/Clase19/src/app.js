import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Cookies
app.use(cookieParser());

// Session
const fileStore = FileStore(session);
// Creando session que se guardará en archivo
app.use(
	session({
		// dónde se guardará la session
		store: new fileStore({
			path: __dirname + '/sessions', // carpeta sessions que se ubicará en src
		}),
		secret: 'SessionKey', // por default guarda en cookies, pero podemos hacer ajustes
		cookie: {
			maxAge: 6000, // tiempo de vida de la credencial del usuario. Una vez pasado el tiempo, se pierde la credencial del usuario y deberá volver a indentificarse
		},
	})
);

// Routes
app.use('/views', viewsRouter);
app.use('/users', usersRouter);

// APP listen
app.listen(8080, () => {
	console.log('escuchando al puerto 8080');
});
