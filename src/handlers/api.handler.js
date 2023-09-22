// IMPORTS

import axios from 'axios'

// HANDLERS

// eslint-disable-next-line no-unused-vars
const getProducts = async (_req, res, next) => {
		await axios
		.get('https://fakestoreapi.com/products')
		.then((response) => {
			//console.log(response.data);
			res.status(200).json(response.data)
		})
		.catch((err) => {
			next({ statusCode: 500, errObj: err })
		})
}

// eslint-disable-next-line no-unused-vars
const getProductsByFilter = async (req, res, next) => {
	const productCategory = req.query.category
	if (!productCategory) {
		return next()
	}
	await axios
		.get('https://fakestoreapi.com/products/category/' + productCategory)
		.then((response) => {
			if (response.data.length == 0) {
				return res.status(204).json(response.data)
			}
			return res.status(200).json(response.data)
		})
		.catch(async () => {
			const categoriesList = await axios
				.get('https://fakestoreapi.com/products/categories')
				.then((data) => {
					return data
				})
				.catch(() => {
					next({
						statusCode: 500,
					})
				})
			next({
				statusCode: 400,
				message:
					'Category not found! Try someone of the following categories: \n' +
					categoriesList.data.join(', '),
			})
		})
}

const getProductById = async (req, res, next) => {
  let idProduct =  req.params.idProduct
	return await axios
		.get('https://fakestoreapi.com/products/'+idProduct)
		.then((response) => {
      if (!response.data) {
        return res.status(404).json(
          {
            statusCode: 404,
            message: "The product was not found!"
          }
        )
      }
			return res.status(200).json(response.data)
		})
		.catch((err) => {
      if (err.response.status == 404) {
        return next({ statusCode: 404, errObj: err, message: "The product was not found!"})
      }
			next({ statusCode: 500, errObj: err })
		})
}

export default {
	getProducts,
	getProductsByFilter,
  getProductById
}
