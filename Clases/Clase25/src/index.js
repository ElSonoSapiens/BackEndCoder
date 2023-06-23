/*
console.log('primer archivo');
*/

// process es un objeto que contieen mucha informacion, incluidos otros objetos, arrys y métodos

/*
console.log(process);
console.log('cwd', process.cwd());
console.log('id', process.pid);
*/

// process.env => entorno
// process.argv => argumentos pasados por CLI
// process.pid => id del proceso en el sistema

// Los argumentos permiten iniciar la ejecucion de un programa a partir de ciertos elementos iniciales

// dependiendo de si pasamos argumentos, haga una cosa u otra, dependiendo del .argv

/*
console.log(process.argv);
*/

// todo lo que escriba luego de index.js se va a guardar como valores de argumento

/*
console.log(process.argv.splice(2));
*/

// Creamos un script en package.json que ejecute index.js + argumentos

// "scripts": {
//   "start:dev": "node src/index.js --mode development --debug true",
//   "start:test": "node src/index.js --mode test --debug false"
// },

// hacerlo de esta manera resulta tedioso porque no hay forma de organizar los argumentos

// Commander => libreria mas usadas para el manejo de argumentos
// npm i commander

// dotenv
// npm i dotenv

// se crea un archivo .env fuera de src que contenga

/*
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.PORT);
*/

// Esta manera de hacerlo no es la que se utiliza
// Se debe crear un src/config.js

/*
import config from './config.js';

console.log(config.port);
console.log(config.token);
*/


// CHILD PROCESS
// node trabaja en un hilo, entonces hay que hacer subprocesos para que no se bloquee la ejecucion del proceso principal

// actividad en clase => calculo bloqueante con contador

