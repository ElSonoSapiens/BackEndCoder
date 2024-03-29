import { Router } from 'express';
//import CartManager from '../dao/CartManager.js';
import CartManager from '../db/dao/CartManagerMongo.js';
import { __dirname } from '../utils.js';
import cartsErrors from '../errors/cartErrors.js';

const carts = [];
const router = Router();

//const cartManager = new CartManager(__dirname + '/Carts.json');
const cartManager = new CartManager();

// crear carrito
// router.post('/', async (req, res) => {
// 	const newCart = await cartManager.createCart();
// 	res.json = { cart: newCart };
// });

// Crear carrito
router.post('/', async (req, res) => {
	try {
		const cart = await cartManager.createCart();
		res.status(201).send({
			status: 'success',
			message: `Cart created. Cart ID: ${cart._id}`,
			payload: cart,
		});
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: cartsErrors.createError.status,
			error: cartsErrors.createError.error,
		});
	}
});

// buscar todos los carritos
router.get('/', async (req, res) => {
	try {
		const carts = await cartManager.getCarts();
		if (carts) {
			res.status(200).send({ status: 'success', payload: carts });
		} else {
			res.status(404).send({
				status: cartsErrors.allNotFound.status,
				error: cartsErrors.allNotFound.error,
			});
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: cartsErrors.allCreateError.status,
			error: cartsErrors.allCreateError.error,
		});
	}
});

// buscar carrito por Id (cid)
router.get('/:cid', async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartManager.getCart(cid);
		if (cart) {
			res.status(200).send({
				status: 'success',
				message: `Cart with ID ${cid} found`,
				payload: cart,
			});
		} else {
			res.status(404).send({
				status: cartsErrors.getByIdError.status,
				error: cartsErrors.getByIdError.notFound,
			});
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: cartsErrors.getByIdError.status,
			error: cartsErrors.getByIdError.error,
		});
	}
});

// agregar un producto al array del carrito
router.post('/:cid/products/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const addProduct = await cartManager.addProductToCart(cid, pid);
		if (addProduct) {
			res.status(201).send({
				status: 'success',
				message: `Product ${pid} added to Cart ${cid}`,
				payload: addProduct,
			});
		} else {
			res.status(404).send({
				status: cartsErrors.prodToCartError.status,
				error: cartsErrors.prodToCartError.notFound,
			});
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: cartsErrors.prodToCartError.status,
			error: cartsErrors.prodToCartError.error,
		});
	}
});

// router.post('/:cid/product/:pid', async (req, res) => {
// 	const { cid, pid } = req.params;
// 	const cart = await cartManager.addToCart(cid, pid);
// 	!cart ? res.status(404).json(notFound) : res.status(200).json(cart);
// });

// Eliminar un producto (pid) de un carrito (cid)
router.delete('/:cid/products/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const deleteProductInCart = await cartManager.deleteProductFromCart(
			cid,
			pid
		);
		if (deleteProductInCart) {
			res.status(200).send({
				status: 'success',
				message: `Product ${pid} deleted from Cart ${cid}`,
				payload: deleteProductInCart,
			});
		} else {
			res.status(404).send({
				status: cartsErrors.delProdInCartError.status,
				error: cartsErrors.delProdInCartError.notFound,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: cartsErrors.delProdInCartError.status,
			error: cartsErrors.delProdInCartError.error,
		});
	}
});

// Eliminar todos los productos de un carrito (cid)
router.delete('/:cid', async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartManager.deleteAllProductsFromCart(cid);
		if (cart) {
			res.status(200).send({
				status: 'success',
				message: `All products deleted from Cart ${cid}`,
				payload: cart,
			});
		} else {
			res.status(404).send({
				status: cartsErrors.delAllProdsInCartError.status,
				error: cartsErrors.delAllProdsInCartError.notFound,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: cartsErrors.delAllProdsInCartError.status,
			error: cartsErrors.delAllProdsInCartError.error,
		});
	}
});

// Actualizar todos los productos de un carrito (cid)
router.put('/:cid', async (req, res) => {
	try {
		const { cid } = req.params;
		const { products } = req.body;

		const cart = await cartManager.updateAllProductsFromCart(cid, products);

		if (cart) {
			res.status(200).send({
				status: 'success',
				message: `Products updated in Cart ${cid}`,
				payload: cart,
			});
		} else {
			res.status(404).send({
				status: cartsErrors.updateAllProdInCartError.status,
				error: cartsErrors.updateAllProdInCartError.notFound,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: cartsErrors.updateAllProdInCartError.status,
			error: cartsErrors.updateAllProdInCartError.error,
		});
	}
});

// Actualizar solamente la cantidad de un producto (pid) de un carrito (cid)
router.put('/:cid/products/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const { quantity } = req.body;

		const cart = await cartManager.updateProductQuantityFromCart(
			cid,
			pid,
			quantity
		);

		if (cart) {
			res.status(200).send({
				status: 'success',
				message: `Updated quantity of Product ${pid} in Cart ${cid}`,
				payload: cart,
			});
		} else {
			res.status(404).send({
				status: cartsErrors.updateProdInCartError.status,
				error: cartsErrors.updateProdInCartError.notFound,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: cartsErrors.updateProdInCartError.status,
			error: cartsErrors.updateProdInCartError.error,
		});
	}
});

export default router;
