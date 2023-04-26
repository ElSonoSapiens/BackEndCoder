import { Router } from 'express';
//import ProductManager from '../dao/ProductManager.js';
import ProductManager from '../dao/ProductManagerMongo.js';
import { __dirname } from '../utils.js';

// const productManager = new ProductManager(__dirname + '/Products.json');
const productManager = new ProductManager(); // MongoDB

const router = Router();

// router.get('/', async (req, res) => {
// 	const limit = req.query.limit;
// 	const products = await productManager.getProducts();
// 	if (limit) {
// 		const limitedProducts = products.slice(0, limit);
// 		res.json(limitedProducts);
// 	} else {
// 		res.json({ products });
// 	}
// });

router.get('/', async (req, res) => {
	try {
		const { limit, page, sort, query } = req.query;

		const products = await productManager.getProducts(limit, page, sort, query);

		products.docs = products.docs.map((product) => {
			const {
				_id,
				title,
				description,
				price,
				code,
				stock,
				category,
				thumbnail,
			} = product;
			return {
				id: _id,
				title,
				description,
				price,
				code,
				stock,
				category,
				thumbnail,
			};
		});

		const info = {
			totalPages: products.totalPages,
			prevPage: products.prevPage,
			nextPage: products.nextPage,
			page: products.page,
			hasPrevPage: products.hasPrevPage,
			hasNextPage: products.hasNextPage,
			prevLink: products.hasPrevPage
				? `http://localhost:8080/api/products?page=${products.prevPage}`
				: null,
			nextLink: products.hasNextPage
				? `http://localhost:8080/api/products?page=${products.nextPage}`
				: null,
		};

		res.status(200).send({ status: 'success', payload: products.docs, info });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.send({ status: 'error', error: 'Error al obtener los productos' });
	}
});

// router.get('/paginate', async (req, res) => {
// 	const { limit = 15, page = 1 } = req.query;
// 	const response = await usersManager.paginateFun(limit, page);
// 	res.json({ response });
// });

router.get('/:pid', async (req, res) => {
	const { pid } = req.params;
	const product = await productManager.getProductById(pid);
	res.json({ product });
});

router.post('/', async (req, res) => {
	const obj = req.body;
	const newProduct = await productManager.addProduct(obj);
	res.json({ newProduct });
});

router.put('/:pid', async (req, res) => {
	const { pid } = req.params;
	const obj = req.body;
	const product = await productManager.updateProduct(pid, obj);
	res.json({ product });
});

router.delete('/', async (req, res) => {
	const message = await productManager.deleteProducts();
	res.json({ message });
});

router.delete('/:pid', async (req, res) => {
	const { pid } = req.params;
	const message = await productManager.deleteProductById(pid);
	res.json({ message });
});

export default router;
