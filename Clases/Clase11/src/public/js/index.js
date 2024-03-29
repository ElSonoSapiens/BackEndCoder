const socketClient = io();

const tituloUsuario = document.getElementById(`usuario`);
const formulario = document.getElementById('formulario');
const inputMessage = document.getElementById('message');
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
});

// MESSAGES
formulario.onsubmit = (e) => {
	e.preventDefault();
	const info = {
		user: usuario,
		message: inputMessage.value,
	};
	socketClient.emit('message', info);
};

// CHAT

socketClient.on('chat', (messages) => {
	console.log(messages);

	const chatParrafo = messages
		.map((obj) => {
			return `<p>${obj.user}: ${obj.message} </p>`;
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
