import { productsModel } from '../db/models/products.model.js';

export default class ProductManager {
	async getProducts() {
		try {
			const products = await productsModel.find().lean();
			return products;
		} catch (error) {
			console.log(error);
		}
	}

	async getProductById(idProd) {
		const productsFile = await this.getProducts().lean();
		const product = productsFile.find((p) => p.id === idProd);
		if (product) {
			return product;
		} else {
			return 'Product not found';
		}
	}

	async addProduct(product) {
		const productsFile = await this.getProducts().lean();
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

	async updateProduct(idProd, product) {
		try {
			const productsFile = await this.getProducts().lean();
			if (productsFile) {
				await productsModel.findOneAndUpdate({ _id: idProd }, product);
				const updatedProduct = await this.getProductById(idProd);
				return updatedProduct + console.log('Product updated');
			} else {
				throw new Error(`Product not found`);
			}
		} catch (error) {
			console.log(`Error modifying product ${idProd}: ${error.message}`);
		}
	}

	async deleteProducts() {
		try {
			await productsModel.deleteMany();
			return 'Products deleted';
		} catch (error) {
			console.log('No products found');
		}
	}

	async deleteProductById(idProd) {
		const productsFile = await this.getProducts();
		const productIndex = productsFile.findIndex((p) => p.id === idProd);
		if (productIndex === -1) {
			return "Product doesn't exist";
		} else {
			productsFile.splice(productIndex, 1);
			await productsModel.deleteOne({ _id: idProd });
			return 'Product deleted';
		}
	}

	#idGenerator = (products) => {
		let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
		return id;
	};
}
