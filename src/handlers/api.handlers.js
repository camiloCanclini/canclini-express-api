// IMPORTS

import axios from 'axios';

// HANDLERS

// eslint-disable-next-line no-unused-vars
const getProducts = async (_req, res, next) => {
  return await axios.get("https://fakestoreapi.com/products")
    .then((response) =>{ 
      return res.status(200).json(response.data)})
    .catch((err) => {
      next({statusCodde: 500, errObj: err});
    })
}

// eslint-disable-next-line no-unused-vars
const getProductsByFilter = async (req, res, next) => {
  const productCategory = req.query.category
  if (!productCategory) {
    return next()
  }
  await axios.get("https://fakestoreapi.com/products/category/"+productCategory)
    .then((response) => {
      if (response.data.length == 0) {
        return res.status(204).json(response.data)
      }
        return res.status(200).json(response.data)
    })
    .catch(async () => {
      const categoriesList = await axios.get("https://fakestoreapi.com/products/categories")
        .then((data) => {return data})
        .catch(() => {
          next({
            statusCode: 500
          })
        })
      next({
        statusCode: 400,
        message: "Category not found! Try Someone of the following categories: \n" + categoriesList.data.join(", ")
      })
    })
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
console.error(err);


res.status( err.statusCode || 500 ).json({ 
  message: err.message || "Internal Server Error",
  statusCode: err.statusCode || 500
});
}

export default {
  getProducts,
  getProductsByFilter,
  errorHandler
}