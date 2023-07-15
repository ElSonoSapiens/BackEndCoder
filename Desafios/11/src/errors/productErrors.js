const productErrors = {
	created: 'Product created successfuly',
	productsFound: 'Products found',
	productFound: 'Product found',
	productsNotFound: {
		status: 'error',
		message: 'error obtaining products',
	},
	//notFoundById: (id) => ´product with ${id} not found´,
	productNotFound: {
		status: 'error',
		message: 'error obtaining product',
	},
	notCreated: {
		status: 'error',
		message: 'Error creating product',
	},
	updatedSuccess: {
		status: 'success',
		message: 'Product updated',
	},
	updatedError: {
		status: 'error',
		messageNotFound: 'Product not found',
		message: 'Error updating product',
	},
	deleteProducts: {
		status: 'error',
		message: 'Error deleting products',
	},
	deleteProductSuccess: {
		status: 'success',
		message: 'Product deleted',
	},
	deleteProductError: {
		status: 'error',
		notFound: 'Product not found',
		message: 'Error deleting product',
	},
	deleteProductsError: {
		status: 'error',
		notFound: 'Products not found',
		message: 'Error deleting products',
	},
};

export default productErrors;

// anoto => volar console log, cambiar por logger
// mensajes => products, carts, user

// para 3ra practica integradora, agrgar lo del ticket
