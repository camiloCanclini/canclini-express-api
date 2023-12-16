// IMPORTS

import fs from "fs"
import bcrypt from "bcrypt";
import path from "path";
import { cwd } from "process";

// GLOBAL OBJS

// eslint-disable-next-line no-undef
const env = process.env

// HANDLERS

const registerUser = async (req, res, next) => {
		if(!req.body || !req.body.email || !req.body.password){
			return next({
				statusCode: 400,
				message: "Body request has an incorrect format!"
			})
		}
		if(!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
			return next({
				statusCode: 400,
				message: "Email field has an incorrect format!"
			})
		}
		if (req.body.password.length > 15) {
			return next({
				statusCode: 400,
				message: "Password field has an incorrect format!"
			})
		}
		
		fs.readFile(path.resolve(path.join(cwd(), env.APIKEYFILENAME+'.json')), 'utf8', (err, data) => {
			if (err) {
				return next({
					statusCode: 500
				})
			}
			
			
			try {
				const jsonData = JSON.parse(data);

				let email = req.body.email
				let pass = req.body.password
				let userObj
				
				if (email in jsonData) {
					return next({
						statusCode: 409,
						message: "The email has already been registered!"
					})
				}

				bcrypt.hash(email + pass, 2, function(err, hash) {
					if (err) {
						next({
							statusCode: 500
						})
					}
					// hash = apiKey
					userObj = {
						apiKey: hash,
						pass: pass
					}
					jsonData[email] = userObj

					// eslint-disable-next-line no-undef
					fs.writeFile(path.resolve(path.join(cwd(), env.APIKEYFILENAME+'.json')) , JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
						if (writeErr) {
							return next({ statusCode: 500 });
						}
						res.status(200).json({ 
							statusCode: 200,
							message: 'Register Successfully!',
							apiKey: hash
						});
					});
				});
			} catch (error) {
				next({
					statusCode: 500
				})
			}
		});
}

const loginUser = async (req, res, next) => {
	if(!req.body || !req.body.email || !req.body.password){
		return next({
			statusCode: 400,
			message: "Body request has an incorrect format!"
		})
	}
	if(!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
		return next({
			statusCode: 400,
			message: "Email field has an incorrect format!"
		})
	}
	if (req.body.password.length > 15) {
		return next({
			statusCode: 400,
			message: "Password field has an incorrect format!"
		})
	}
	
	fs.readFile(path.resolve(path.join(cwd(), env.APIKEYFILENAME+'.json')), 'utf8', (err, data) => {
		
		if (err) {
			return next({
				statusCode: 500
			})
		}
		
		try {
			const jsonData = JSON.parse(data);

			let email = req.body.email
			let pass = req.body.password
			
			if (email in jsonData) {
				if (jsonData[email].pass == pass){
					return res.status(200).json({ 
						statusCode: 200,
						message: 'Login Successfully!',
						apiKey: jsonData[email].apiKey
					});
				}
			}

			return next({
				statusCode: 401,
				message: "Login failed!"
			})

			
		} catch (error) {
			next({
				statusCode: 500
			})
		}
	});
}

// eslint-disable-next-line no-unused-vars
const checkAuthHandler = async (req, res, next) => {
	const reqApiKey = req.headers.apikey
	if(!reqApiKey){
		next({
			statusCode: 401,
			message: "Authentication Required! Enter your API KEY or request for one"
		})
	}else{
		fs.readFile(path.resolve(path.join(cwd(), env.APIKEYFILENAME+'.json')), 'utf8', (err, data) => {
			if (err) {
				return next({
					statusCode: 500
				})
			}
			try {
				const jsonData = JSON.parse(data);
				let apiKeysLoaded = []
				const usersLoaded = Object.values(jsonData);
				usersLoaded.forEach(user => {
					apiKeysLoaded.push(user.apiKey)
				});
				if (!apiKeysLoaded.includes(reqApiKey)) {
					next({
						statusCode: 401,
						message: "Logging Error!"
					})
				}else{
					next()
				}
				
			} catch (error) {
				next({
					statusCode: 500
				})
			}
		});
		
	}
}

// eslint-disable-next-line no-unused-vars
const notAuthHandler = async (err, _req, res, next) => {
	return res.status(401).json(err)
}

export default {
	checkAuthHandler,
	registerUser,
	loginUser,
	notAuthHandler
}
