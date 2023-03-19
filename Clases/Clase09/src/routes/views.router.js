import { Router } from "express";
import { UserManager } from "../UsersManager.js";
import __dirname from "../utils.js";

const router = Router();
const userManager = new UserManager(__dirname + "/Users.json");

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

router.get("/", (req, res) => {
	const indice = Math.floor(Math.random() * 5); // Código para resultados random
	const usuario = users[indice];
	res.render("actividad1", { ...usuario });
});

router.get("/lista", (req, res) => {
	res.render("lista", { users });
});

router.get("/registro", (req, res) => {
	res.render("registro");
});

router.get("/listaRegistro", async (req, res) => {
	const users = await userManager.findUsers();
	res.render("listaRegistro", { users });
});

export default router;
