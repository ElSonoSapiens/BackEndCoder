import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // archivos públicos/estáticos

// configuracion motor de plantilla HANDLEBARS
// hay que crear el motor ante los ojos del servidor

app.engine("handlebars", handlebars.engine()); // solo para HANDLEBARS o un motor propio

app.set("views", __dirname + "/views"); // que setting va a configurar
app.set("view engine", "handlebars"); // cual es el motor de plantilla

// app.get("/", (req, res) => {
// 	res.render("first")
// });

// app.get("/second", (req, res) => {
// 	res.render("second")
// });

app.use("/views", viewsRouter);
app.use("/users", usersRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`escuchando puerto ${PORT}`));
