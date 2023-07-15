import { ticketModel } from '../models/ticket.model.js';

export default class TicketManager {
	async getAllTickets() {
		try {
			const AllTickets = await ticketModel.find();
			return AllTickets;
		} catch (error) {
			//console.log(`Error obteniendo todos los mensajes: ${error.message}`);
		}
	}

	async createTicket(ticket) {
		try {
			const message = await ticketModel.create(ticket);
			return message;
		} catch (error) {
			//console.log(`Error agregando mensaje: ${error.message}`);
		}
	}

	async deleteTicket(id) {
		try {
			const message = await ticketModel.deleteOne({ _id: id });
			return message;
		} catch (error) {
			//console.log(`Error eliminando mensaje: ${error.message}`);
		}
	}

	async updateTicket(id) {
		try {
			const message = await ticketModel.findById({ _id: id });
			return message;
		} catch (error) {
			//console.log(`Error eliminando mensaje: ${error.message}`);
		}
	}
}
