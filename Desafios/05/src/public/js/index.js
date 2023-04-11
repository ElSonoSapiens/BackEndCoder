const socketClient = io();

const tituloUsuario = document.getElementById(`usuario`);
const formulario = document.getElementById('formulario');
const inputMensaje = document.getElementById('mensaje');
const divChat = document.getElementById('chat');

let usuario;

// Disparar alerta de ingreso al chat SWEET ALERT
Swal.fire({
	title: 'bienvenido',
	text: 'Ingresa usuario',
	input: 'text',
	inputValidator: (value) => {
		if (!value) {
			return `Necesitas ingresar un usuario`;
		}
	},
}).then((username) => {
	usuario = username.value;
	tituloUsuario.innerText = `Hola ${usuario}`;
	// Evento de username ingresado
	socketClient.emit('usuarioNuevo', usuario);
	inputMensaje.value = '';
});

// MENSAJES
formulario.onsubmit = (e) => {
	e.preventDefault();
	const info = {
		nombre: usuario,
		mensaje: inputMensaje.value,
	};
	socketClient.emit('mensaje', info);
};

// CHAT

socketClient.on('chat', (mensajes) => {
	console.log(mensajes);

	const chatParrafo = mensajes
		.map((obj) => {
			return `<p>${obj.nombre}: ${obj.mensaje} </p>`;
		})
		.join('');
	divChat.innerHTML = chatParrafo;
});

// Notif usuario nuevo conectado
socketClient.on('broadcast', (usuario) => {
	Toastify({
		text: `${usuario} conectado al chat`,
		duration: 3000,
		position: 'right', // `left`, `center` or `right`
		style: {
			background: 'linear-gradient(to right, #00b09b, #96c93d)',
		},
		onClick: function () {}, // Callback after click
	}).showToast();
});
