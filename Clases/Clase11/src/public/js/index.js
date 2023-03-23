const socketClient = io();

const tituloUsuario = document.getElementById(`usuario`)
const formulario = document.getElementById("formulario")
const inputMensaje = document.getElementById("mensaje")
const divChat = document.getElementById("chat")

let usuario

// Disparar alerta de ingreso al chat
Swal.fire({
	title: "bienvenido",
	text: "Ingresa usuario",
	input: "text",
	inputValidator: (value) => {
		if (!value) {
			return `Necesitas ingresar un usuario`;
		}
	},
}).then((username) => {
	usuario = username.value;
    tituloUsuario.innerText = `Hola ${usuario}`
});

// mensajes
formulario.onsubmit = (e)=>{
    e.preventDefault()
    const info = {
        nombre: usuario,
        mensaje: inputMensaje.value
    }
    socketClient.emit("mensaje",info)
}

// CHAT

socketClient.on("chat",mensajes=>{
    console.log(mensajes);

    const chatParrafo = mensajes.map(obj=>{
        return `<p>${obj.nombre}: ${obj.mensaje} </p>`
    }).join("")
    divChat.innerHTML = chatParrafo
})

// dejé en 00:59hs