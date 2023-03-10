const fs = require("fs");

const infoPackage = fs.readFileSync("package.json", "utf-8");
console.log(fs.readFileSync("package.json"));

const info = {
	contenidoStr: infoPackage,
	contenidoObj: JSON.parse(infoPackage),
	size: fs.statSync("package.json").size,
};

console.log(info);

fs.promises
	.writeFile("info.json", JSON.stringify(info))
	.then(() => console.log("Archivo creado con éxito"))
	.catch((error) => console.log(error));
