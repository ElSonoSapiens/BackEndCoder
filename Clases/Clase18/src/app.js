import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://www.npmjs.com/package/cookie-parser
// app.use(cookieParser()); // cookieParser
app.use(cookieParser('SecretCookie')); // Cookie firmada

// Crear cookie
app.get('/crearCookie', (req, res) => {
	// res.cookie('Cookie', 'SegundaCookie').send('Respuesta cookie guardada'); // .send es la respuesta que enviamos al cliente
	res
		.cookie('Cookie3', 'TerceraCookie', { maxAge: 5000 }) // maxAge le da un tiempo de expiracion, se mide en milisegundos
		.send('Respuesta cookie guardada'); // .send es la respuesta que enviamos al cliente
});

app.get('/crearCookieFirmada', (req, res) => {
	res
		.cookie('CookieFirmada', 'Primera cookie firmada', { signed: true })
		.send('Cookie firmada'); // cookie firmada => tiene mayores caracteres random
});

// Leer cookie
// app.get('/leerCookie', (req, res) => {
// 	console.log(req.cookies);
// 	const { cookie1, cookie2 } = req.cookies;
// 	res.json({ message: 'Cookies', cookie1, cookie2 });
// });
app.get('/leerCookie', (req, res) => {
	console.log(req.cookies);
	const { cookies, signedCookies } = req;
	res.json({ message: 'Cookies', cookies, signedCookies });
});
// Eliminar cookie
app.get('/eliminarCookie', (req, res) => {
	res.clearCookie('cookie1').send('Cookie eliminada'); // elimina la cookie, se usa el res
});

// Se puede modificar la cookie desde el navegador y el servidor no tiene forma de saberlo

app.listen(3000, () => {
	console.log('escuchando al puerto 3000');
});
