import { cartsModel } from '../db/models/carts.model.js';

export default class CartManager {
	async getCarts() {
		try {
			const carts = await cartsModel.find();
			return carts;
		} catch (error) {
			console.log(error);
		}
	}

	async getCart(id) {
		const cartsFile = await this.getCarts();
		const cart = cartsFile.find((cart) => cart.id === id);
		if (cart) {
			return cart;
		} else {
			return null;
		}
	}

	async createCart() {
		const cartsFile = await this.getCarts();
		const newCart = {
			id: this.#idGenerator(cartsFile),
			products: [],
		};
		cartsFile.push(newCart);
		await cartsModel.create(cartsFile);
		return newCart;
	}

	async addProductToCart(cid, pid) {
		const cart = await this.getCart(cid);
		if (!cart) return 'Cart doesnt exist';
		// validar que el producto exista

		if (pid <= 0) {
			return 'Ivalid product ID';
		} else {
			const productIndex = cart.products.findIndex((p) => p.product === pid);
			if (productIndex === -1) {
				cart.products.push({ product: pid, quantity: 1 });
			} else {
				cart.products[productIndex].quantity++;
			}
		}

		const cartsFile = await this.getCarts();
		const cartIndex = cartsFile.findIndex((c) => c.id === cid);
		cartsFile.splice(cartIndex, 1, cart);
		await cartsModel.create(cartsFile);
		return 'Product added';
	}
	#idGenerator = (carts) => {
		let id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
		return id;
	};
}
