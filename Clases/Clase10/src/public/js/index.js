// script para el cliente => socketClient = io()
const socketClient = io();

// Escucha de un evento => socketClient.on
socketClient.on("bienvenida", (text) => {
	//("Nombre el evento", Info que quiero enviar)
	console.log(text);
	socketClient.emit("respuestaBienvenida", "Gracias por la bienvenida"); // emite a socket.on
});

const formulario = document.getElementById("formulario");
const inputMessage = document.getElementById("message");

formulario.onsubmit = (e) => { 
	e.preventDefault(); // lo primero que se debe hacer con un .onsubmit() para anular la recarga de la pagina
	socketClient.emit("message", inputMessage.value);
};
