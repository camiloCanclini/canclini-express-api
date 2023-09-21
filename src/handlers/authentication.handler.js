// IMPORTS

// HANDLERS

// eslint-disable-next-line no-unused-vars
const checkAuthHandler = async (req, res, next) => {
	console.log(req.headers.authorization);
	if(!req.headers.authorization){
		next()
	}
	
}

// eslint-disable-next-line no-unused-vars
const notAuthHandler = async (err, _req, res, next) => {
	return res.status(401).json({
		statusCode: 401,
		message: "Authentication Required! Enter your API KEY or request for one"
	})
}

export default {
	checkAuthHandler,
	notAuthHandler
}
