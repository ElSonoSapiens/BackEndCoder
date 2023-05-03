import express from 'express';
import cookieParser from 'cookie-parser';
import loginRouter from '../src/routes/login.router.js';
import viewsRouter from '../src/routes/views.router.js';
import { __dirname } from '../src/utils.js';
import handlebars from 'express-handlebars';
import session from 'express-session';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Session => debe ir antes de Routes
app.use(
	session({
		secret: 'secretSession',
		cookie: { maxAge: 5000 },
	})
);

// Routes
app.use('/views', viewsRouter);
app.use('/login', loginRouter);

// Cookies // Info sobre CookieParser => https://www.npmjs.com/package/cookie-parser
app.use(cookieParser()); // cookieParser *sin firmar*

// Crear cookie
// .send es la respuesta que enviamos al cliente
// Se crea una primer cookie que es leida por .get('/leerCookie'), y luego se crea una segundaCookie que vuelve a ser leída por .get('/leerCookie')

app.get('/crearCookie', (req, res) => {
	res.cookie('Cookie1', 'PrimeraCookie').send('Respuesta cookie guardada');
	res.cookie('Cookie2', 'SegundaCookie').send('Respuesta cookie guardada');
});

// Leer cookie

/*
app.get('/leerCookie', (req, res) => {
	console.log(req); // Log del objeto request
	console.log(req.cookies) // Log de la propiedad cookies (objeto) que se aloja en request
	res.send('Leyendo cookie');
	});
*/

// Se aplica destructuring y se lee las cookies
/*
app.get('/leerCookie', (req, res) => {
	console.log(req.cookies);
	const { cookie1, cookie2 } = req.cookies;
	res.json({ message: 'Cookies', cookie1, cookie2 });
});
*/

// Eliminar cookie

app.get('/eliminarCookie', (req, res) => {
	res.clearCookie('cookie1').send('Cookie eliminada'); // elimina la cookie1
	//res para enviar al servidor que cookie eliminar
	//send para enviar mensaje
});

// Las cookies pueden ser modificadas desde el navegador y el servidor no tiene forma de enterarse.

// Cookies firmadas => vamos a necesitar una secret key

app.use(cookieParser('SecretCookie')); // Cookie firmada

app.get('/crearCookieFirmada', (req, res) => {
	res
		.cookie('CookieFirmada1', 'Primera cookie firmada', { signed: true })
		.send('Cookie firmada'); // cookie firmada => tiene mayores caracteres random
	console.log(req); // las cookies firmadas aparecerán como req.signedCookies
});

// Llamo http://localhost:3000/crearCookieFirmada
// EL value de la cookie es s%3APrimera%20cookie%20firmada.V4UvqiUPEs8TVvv7w6Gu2qffQU5TkbPH5diFin2YX2w

app.get('/leerCookie', (req, res) => {
	console.log(req.cookies);
	const { cookies, signedCookies } = req; // destucturing de req.cookies y req.signedCookies
	res.json({ message: 'Cookies', cookies, signedCookies }); // respuesta para el cliente
});

// Al modificar el valor o nombre de una cookie, deja de estar en req.signedCookies y pasa a estar en req.cookies

// Cookie con tiempo de expiracion maxAge

app.get('/crearCookie', (req, res) => {
	res
		.cookie('Cookie3', 'TerceraCookie', { maxAge: 5000 }) // maxAge le da un tiempo de expiracion, se mide en milisegundos
		.send('Respuesta cookie guardada'); // .send es la respuesta que enviamos al cliente
});

// APP listen
app.listen(3000, () => {
	console.log('escuchando al puerto 3000');
});
