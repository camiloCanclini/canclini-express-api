// IMPORTS

// HANDLERS

// eslint-disable-next-line no-unused-vars
const notFoundHandler = async (_req, res) => {
	return res.status(404).json({
		statusCode: 404,
		message: "The resource was not found!"
	})
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
	console.error(err)
	res.status(err.statusCode || 500).json({
		message: err.message || 'Internal server error',
		statusCode: err.statusCode || 500,
	})
}
export default {
	notFoundHandler,
	errorHandler
}
