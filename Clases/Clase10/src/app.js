import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // archivos públicos/estáticos

// HANDLEBARS
app.engine("handlebars", handlebars.engine()); // solo para HANDLEBARS o un motor propio

app.set("views", __dirname + "/views"); // que setting va a configurar
app.set("view engine", "handlebars"); // cual es el motor de plantilla

// ROUTES
app.use("/views", viewsRouter);

// PORT
const PORT = 8080;
// HTTP Server
const httpServer = app.listen(PORT, () => {
	console.log(`escuchando al puerto ${PORT}`);
});

// SOCKET Server

const messages = [];

const socketServer = new Server(httpServer); // ***configuracion para tener el socket del lado del servidor***

//Evento connection => avisa al servidor cuando un cliente se conecta
socketServer.on("connection", (socket) => {
	// escucha cada conexión que hay
	console.log(`Client connected: ${socket.id}`); // El socket es la info inicial. Este es el evento principal. Log de conexiones entrantes

	//Evento disconnect => avisa al servidor cuando un cliente se desconecta
	socket.on(`disconnect`, () => {
		console.log(`Client disconnected: ${socket.id}`); // log para cuando se cae la comunicación
	});
	// Emitir un evento => socketClient.emit //
	socket.emit("bienvenida", `Bienvenido a WEBSOCKET cliente con id: ${socket.id}`); //("Nombre el evento", Info que quiero enviar)
	socket.on("respuestaBienvenida", (response) => {
		// recibe el emit de socketClient.emit
		console.log(response);
	});
	socket.on("message", (message) => {
		messages.push({ clientId: socket.id, message });
		console.log(messages);
	});
});
