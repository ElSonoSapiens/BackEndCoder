import { Router } from 'express';
//import ProductManager from '../dao/ProductManager.js';
import ProductManager from '../db/dao/ProductManagerMongo.js';
import { __dirname } from '../utils.js';
import productErrors from '../errors/productErrors.js';

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

		res.status(200).send({
			status: productErrors.productsFound,
			payload: products.docs,
			info,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: productErrors.productsNotFound.status,
			error: productErrors.productsNotFound.message,
		});
	}
});

// router.get('/paginate', async (req, res) => {
// 	const { limit = 15, page = 1 } = req.query;
// 	const response = await usersManager.paginateFun(limit, page);
// 	res.json({ response });
// });

router.get('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const product = await productManager.getProductById(pid);
		res.json({ product });

		if (product) {
			res.status(200).send({ status: productErrors.found, payload: product });
		} else {
			res.status(404).send({
				status: productErrors.productNotFound.status,
				error: productErrors.productNotFound.message,
			});
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: productErrors.productNotFound.status,
			error: productErrors.productNotFound.message,
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const obj = req.body;
		const newProduct = await productManager.addProduct(obj);
		res.json({ newProduct });
		if (newProduct) {
			res
				.status(201)
				.send({ status: productErrors.created, payload: newProduct });
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: productErrors.notCreated.status,
			error: productErrors.notCreated.message,
		});
	}
});

router.put('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const obj = req.body;
		const product = await productManager.updateProduct(pid, obj);
		res.json({ product });
		if (product) {
			res.status(201).send({
				status: productErrors.updatedSuccess.status,
				error: productErrors.updatedSuccess.message,
				payload: updatedProduct,
			});
		} else {
			res.status(404).send({
				status: productErrors.updatedError.status,
				error: productErrors.updatedError.messageNotFound,
			});
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: productErrors.updatedError.status,
			error: productErrors.updatedError.message,
		});
	}
});

router.delete('/', async (req, res) => {
	try {
		const deleteProducts = await productManager.deleteProducts();
		res.json({ deleteProducts });
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: productErrors.deleteProductsError.status,
			error: productErrors.deleteProductsError.message,
		});
	}
});

router.delete('/:pid', async (req, res) => {
	try {
		const { pid } = req.params;
		const deleteProduct = await productManager.deleteProductById(pid);
		res.json({ deleteProduct });
		if (deleteProduct) {
			res.status(201).send({
				status: productErrors.deleteProductSuccess.status,
				error: productErrors.deleteProductSuccess.message,
				payload: deleteProduct,
			});
		} else {
			res.status(404).send({
				status: productErrors.deleteProductError.status,
				error: productErrors.deleteProductError.notFound,
			});
		}
	} catch (error) {
		//console.log(error);
		res.status(500).send({
			status: productErrors.deleteProductError.status,
			error: productErrors.deleteProductError.message,
		});
	}
});

export default router;
