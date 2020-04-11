module.exports = options => {
	// 引入模块
	const assert = require('http-assert')
	const jwt = require('jsonwebtoken')
	const AdminUser = require('../models/AdminUser')

	return async (req, res, next) => {
		// 1.取请求头中token
		const token = String(req.headers.authorization || '').split(' ').pop()
		assert(token,401,'请先登录')
		// 2.用jwt解析token 取得id
		const {id} = jwt.verify(token, req.app.get('secret')) //req.app.get才能访问到
		assert(id,401,'请先登录')
		// 3.在数据库中查找是否有该user
		req.user = await AdminUser.findById(id)
		assert(req.user,401,'请先登录')
		await next()
	}
}