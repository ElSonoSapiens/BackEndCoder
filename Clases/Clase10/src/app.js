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
const socketServer = new Server(httpServer); // configuracion para tener el socket del lado del servidor

socketServer.on("connection", (socket) => {
	console.log(`Client connected: ${socket.id}`); // este es el evento principal

	socket.on(`disconnect`, () => {
		console.log(`Client disconnected: ${socket.id}`);
	});

    socket.emit("bienvenida", "Welcome to WEBSOCKET")


});

// me quedé en 01:06, tengo mucho noni
