const cartsErrors = {
	created: 'Cart created',
	notFound: 'Cart not found',
	allNotFound: {
		status: 'Error',
		error: 'Carts not found',
	},

	createError: {
		status: 'error',
		error: `Error creating cart with ID ${cart._id}`,
	},

	allCreateError: {
		status: 'error',
		error: `Error obtaining carts`,
	},

	getByIdError: {
		status: 'error',
		notFound: `Cart with ID ${cid} not found`,
		error: `Error obtaining cart with ID ${cid}`,
	},

	prodToCartError: {
		status: 'error',
		notFound: `Product ${pid} or Cart ${cid} not found`,
		error: `Error adding product ${pid} to Cart ${cid}`,
	},
	delProdInCartError: {
		status: 'error',
		notFound: `Product ${pid} or Cart ${cid} not found`,
		error: `Error deleting product ${pid} from Cart ${cid}`,
	},

	delAllProdsInCartError: {
		status: 'error',
		notFound: `Cart ${cid} not found`,
		error: `Error deleting product from Cart ${cid}`,
	},

	updateAllProdInCartError: {
		status: 'error',
		notFound: `Cart ${cid} or products not found`,
		error: `Error updating product in Cart ${cid}`,
	},
	updateProdInCartError: {
		status: 'error',
		notFound: `Product ${pid} or Cart ${cid} not found`,
		error: `Error updating quantity of Product ${pid} on Cart ${cid}`,
	},
};

export default cartsErrors;

// anoto => volar console log, cambiar por logger
// mensajes => products, carts, user

// para 3ra practica integradora, agrgar lo del ticket
