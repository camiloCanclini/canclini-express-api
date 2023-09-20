// IMPORTS

// HANDLERS

// eslint-disable-next-line no-unused-vars
const notFoundHandler = async (_req, res) => {
	return res.status(404).json({
		statusCode: 404,
		message: "The resource was not found!"
	})
}

export default {
	notFoundHandler
}
