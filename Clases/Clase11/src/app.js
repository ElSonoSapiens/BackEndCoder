import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // archivos públicos/estáticos

// HTTP Server
const httpServer = app.listen(PORT, () => {
	console.log(`Escuchando al puerto ${PORT}`);
});

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// ROUTES
app.use("/views", viewsRouter);

// WEBSOCKET
const infoMensajes = [];

// SOCKET Server
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
	console.log(`User connected : ${socket.id}`);

	socket.on("disconnect", () => {
		console.log(`User disconnected : ${socket.id}`);
	});

	socket.on("mensaje", (info) => {
		infoMensajes.push(info);
		// console.log(infoMensajes);
        socketServer.emit("chat",infoMensajes)
	});
});
