import { Router } from 'express';
//import CartManager from '../dao/CartManager.js';
import CartManager from '../dao/CartManagerMongo.js';
import { __dirname } from '../utils.js';

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
	await cartManager.createCart();
	res.status(201).json({ mensaje: 'Carrito creado con exito' });
});

// buscar todos los carritos
router.get('/', async (req, res) => {
	const cart = await cartManager.getCarts();
	res.json({ cart });
});

// buscar carrito por Id (cid)
router.get('/:cid', async (req, res) => {
	const { cid } = req.params;
	const cart = await cartManager.getCart(cid);
	res.json({ cart });
});

// agregar un producto al array del carrito
router.post('/:cid/product/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	const addProduct = await cartManager.addProductToCart(cid, pid);
	res.json({ message: addProduct });
});

// router.post('/:cid/product/:pid', async (req, res) => {
// 	const { cid, pid } = req.params;
// 	const cart = await cartManager.addToCart(cid, pid);
// 	!cart ? res.status(404).json(notFound) : res.status(200).json(cart);
// });

// Eliminar un producto (pid) de un carrito (cid)
router.delete('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const cart = await cartManager.deleteProductFromCart(cid, pid);
		if (cart) {
			res.status(200).send({ status: 'success', payload: cart });
		} else {
			res
				.status(404)
				.send({ status: 'error', error: 'Carrito o producto no encontrado' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: 'error',
			error: 'Error al eliminar el producto del carrito',
		});
	}
});

// Eliminar todos los productos de un carrito (cid)
router.delete('/:cid', async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartManager.deleteAllProductsFromCart(cid);
		if (cart) {
			res.status(200).send({ status: 'success', payload: cart });
		} else {
			res.status(404).send({ status: 'error', error: 'Carrito no encontrado' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: 'error',
			error: 'Error al eliminar los productos del carrito',
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
			res.status(200).send({ status: 'success', payload: cart });
		} else {
			res
				.status(404)
				.send({ status: 'error', error: 'Carrito o producto no encontrado' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: 'error',
			error: 'Error al actualizar los productos del carrito',
		});
	}
});

// Actualizar solamente la cantidad de un producto (pid) de un carrito (cid)
router.put('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const { quantity } = req.body;

		const cart = await cartManager.updateProductQuantityFromCart(
			cid,
			pid,
			quantity
		);

		if (cart) {
			res.status(200).send({ status: 'success', payload: cart });
		} else {
			res
				.status(404)
				.send({ status: 'error', error: 'Carrito o producto no encontrado' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: 'error',
			error: 'Error al actualizar la cantidad del producto en el carrito',
		});
	}
});

export default router;
