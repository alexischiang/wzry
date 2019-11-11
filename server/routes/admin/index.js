module.exports = app => {
	const express	= require('express')
	const router = express.Router()
	const Category = require('../../models/Category')

	// localhost:3000/admin/api/categories (baseURL + postURL)
	router.post('/categories',async(req,res)=>{
		// 收到传来的model 并存进数据库
		const model = await Category.create(req.body)
		res.send(model)
	})
	
	router.get('/categories',async(req,res)=>{
		const list = await Category.find().limit(10)
		res.send(list)
	})


	app.use('/admin/api',router)
} 