import { Router } from 'express';
import ProductManager from '../dao/ProductManagerMongo.js';
import { __dirname } from '../utils.js';

const router = Router();
const productManager = new ProductManager(__dirname + '/Products.json');

router.get('/', async (req, res) => {
	const products = await productManager.getProducts(2);
	res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
	const products = await productManager.getProducts(2);
	res.render('realTimeProducts', { products });
});

// Ruta para visualizar todos los productos
router.get('/products', async (req, res) => {
	// const products = await productManager.getAll();
	const products = await productManager.getProducts(2);
	// console.log(products);

	res.render('products', { products });
});

// Ruta para visualizar todos los productos con paginación
router.get('/products/page/:page', async (req, res) => {
	const page = req.params.page || 1;

	const products = await productManager.getProducts(2, page);
	// console.log(products);

	res.render('products', { products });
});

// Ruta para visualizar un producto en particular
router.get('/products/:id', async (req, res) => {
	const product = await productManager.getProductById(req.params.id);

	// console.log(product);

	const { _id, title, description, price, code, stock, category, thumbnail } =
		product;

	res.render('product', {
		id: _id,
		title,
		description,
		price,
		code,
		stock,
		category,
		thumbnail,
	});
});

// Ruta para visualizar el carrito de compras
router.get('/carts/:cid', async (req, res) => {
	const cartManager = new CartManager();
	const cart = await cartManager.getCartById(req.params.cid);

	const { products } = cart;

	res.render('cart', { products });
});

export default router;
