import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import './db/dbConfig.js';
import ProductManager from './dao/ProductManagerMongo.js';
import ChatManager from './dao/chatManagerMongo.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager();
const chatManager = new ChatManager();

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
app.use('/chat', chatRouter);

// WEBSOCKET
const infoMensajes = [];

// SOCKET Server
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
	console.log(`User connected : ${socket.id}`);

	const products = await productManager.getProducts();
	const messages = await chatManager.getAllMessages();

	socket.on('disconnect', () => {
		console.log(`User disconnected : ${socket.id}`);
	});

	socket.on('message', async (info) => {
		infoMensajes.push(info);
		socketServer.emit('chat', infoMensajes);
		await chatManager.addMessage(info);
		socket.emit('messages', messages);
	});

	socket.on('usuarioNuevo', (usuario) => {
		socket.broadcast.emit('broadcast', usuario);
		socket.emit('chat', infoMensajes);
	});
});
