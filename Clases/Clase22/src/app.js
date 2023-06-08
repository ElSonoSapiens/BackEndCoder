import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import './persistencia/dbConfig.js';
import mongoStore from 'connect-mongo';
// passport
import './passport/passportStrategies.js';
import passport from 'passport';
import jwtRouter from './routes/jwt.router.js';

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

// Mongo session
app.use(
	session({
		// dónde se guardará la session
		store: new mongoStore({
			// config para conectarse a la DB
			mongoUrl:
				'mongodb+srv://elSonoSapiens:2xyjhtHqPvGEOdZG@cluster0.eu8lqfi.mongodb.net/mongoSession?retryWrites=true&w=majority',
		}),
		secret: 'SessionKey',
		cookie: {
			maxAge: 3000, // tiempo de vida de la credencial del usuario. Una vez pasado el tiempo, se pierde la credencial del usuario y deberá volver a indentificarse
		},
	})
);

// config passport

app.use(passport.initialize()); // para inicializar passport
app.use(passport.session()); // para que trabaje con sesiones

// Routes
app.use('/views', viewsRouter);
app.use('/users', usersRouter);
app.use('/jwt', jwtRouter);

// APP listen
app.listen(8080, () => {
	console.log('escuchando al puerto 8080');
});
