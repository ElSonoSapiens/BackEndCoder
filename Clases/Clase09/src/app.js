import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // archivos públicos/estáticos

// configuracion motor de plantilla HANDLEBARS
// hay que crear el motor ante los ojos del servidor

app.engine("handlebars", handlebars.engine()); // solo para HANDLEBARS o un motor propio

app.set("views", __dirname + "/views"); // que setting va a configurar
app.set("view engine", "nombre del motor"); // cual es el motor de plantilla

app.get("/", (req, res) => {
	res.send("HANDLEBARS");
});

const PORT = 8080;
app.listen(PORT, () => console.log(`escuchando puerto ${PORT}`));

//me quedé en el min 48