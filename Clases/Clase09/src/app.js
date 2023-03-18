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
app.set("view engine", "handlebars"); // cual es el motor de plantilla

// app.get("/", (req, res) => {
// 	res.render("first")
// });

// app.get("/second", (req, res) => {
// 	res.render("second")
// });

const users = [
	{
		nombre: "Diego",
		apellido: "Hernandez",
		edad: 33,
		correo: "dihf.47@gmail.com",
		telefono: 1150194222,
	},
	{
		nombre: "Lisdey",
		apellido: "Novoa",
		edad: 31,
		correo: "lissienovoam@gmail.com",
		telefono: 1159059986,
	},
	{
		nombre: "Barbara",
		apellido: "Hernandez",
		edad: 7,
		correo: "barbarita@gmail.com",
		telefono: 123456789,
	},
	{
		nombre: "Trinidad",
		apellido: "Hernandez",
		edad: 6,
		correo: "trinila@gmail.com",
		telefono: 987654321,
	},
	{
		nombre: "ElFan",
		apellido: "Tasma",
		edad: 99,
		correo: "xXxXxXx@gmail.com",
		telefono: 1122334455,
	},
];

app.get("/", (req, res) => {
	const indice = Math.floor(Math.random() * 4); // Código para resultados random
	const usuario = users[indice];
	res.render("actividad1", { ...usuario });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`escuchando puerto ${PORT}`));

//me quedé en el 1:09:00
