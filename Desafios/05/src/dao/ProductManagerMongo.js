import { productsModel } from '../db/models/products.model.js';

export default class ProductManager {
	async getProducts() {
		try {
			const products = await productsModel.find();
			return products;
		} catch (error) {
			console.log(error);
		}
	}

	async getProductById(idProd) {
		const productsFile = await this.getProducts();
		const product = productsFile.find((p) => p.id === idProd);
		if (product) {
			return product;
		} else {
			return 'Product not found';
		}
	}

	async addProduct(product) {
		const productsFile = await this.getProducts();
		const id = this.#idGenerator(productsFile);
		const newProduct = {
			id,
			title: product.title,
			description: product.description,
			price: product.price,
			thumbnail: product.thumbnail,
			code: product.code,
			stock: product.stock,
			status: true,
			category: product.category,
		};

		if (productsFile.some((pCode) => pCode.code === product.code)) {
			return 'Code already exist';
		} else if (
			!product.title ||
			!product.description ||
			!product.price ||
			!product.code ||
			!product.stock ||
			!product.status ||
			!product.category
		) {
			return 'Incompleted fields';
		} else {
			productsFile.push(newProduct);
			await productsModel.create(productsFile);
			return newProduct;
		}
	}

	async updateProduct(idProd, obj) {
		const productsFile = await this.getProducts();
		const product = productsFile.find((p) => p.id === idProd);
		if (!product) {
			return 'Product not found';
		} else {
			const updatedProduct = { ...product, ...obj };
			const productIndex = productsFile.findIndex((p) => p.id === idProd);
			productsFile.splice(productIndex, 1, updatedProduct);
			await productsModel.create(productsFile);
			return 'Product updated';
		}
	}

	async deleteProducts() {
		const productsFile = await this.getProducts();
		if (productsFile) {
			await productsModel.drop();
			return 'Products deleted';
		} else {
			return 'No products found';
		}
	}

	async deleteProductById(idProd) {
		const productsFile = await this.getProducts();
		const productIndex = productsFile.findIndex((p) => p.id === idProd);
		if (productIndex === -1) {
			return "Product doesn't exist";
		} else {
			productsFile.splice(productIndex, 1);
			await productsModel.deleteOne({ _id: id });
			return 'Product deleted';
		}
	}

	#idGenerator = (products) => {
		let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
		return id;
	};
}
