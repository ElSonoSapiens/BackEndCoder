import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import './db/dbConfig.js';
import { messagesModel } from './db/models/messages.model.js';

const app = express();
const PORT = 8080;

// HTTP Server
const httpServer = app.listen(PORT, () => {
	console.log(`Escuchando al puerto ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config archivos estaticos
app.use(express.static(__dirname + '/public'));

// config motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// ROUTES
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);

// WEBSOCKET
const infoMensajes = [];

// SOCKET Server
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
	console.log(`User connected : ${socket.id}`);

	socket.on('disconnect', () => {
		console.log(`User disconnected : ${socket.id}`);
	});

	socket.on('mensaje', async (info) => {
		infoMensajes.push(info);
		await messagesModel.create(infoMensajes);
		console.log(infoMensajes);
		socketServer.emit('chat', infoMensajes);
	});

	socket.on('usuarioNuevo', (usuario) => {
		socket.broadcast.emit('broadcast', usuario);
		socket.emit('chat', infoMensajes);
	});
});
