module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true
  });
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../../models/AdminUser");
  const assert = require("http-assert");

  // 接受数据
  router.post("/", async (req, res) => {
    // 收到传来的model 并存进数据库
    const model = await req.model.create(req.body);
    res.send(model);
  });

  // 更新数据
  router.put("/:id", async (req, res) => {
    // 收到传来的model 并更新数据库
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 更新数据
  router.delete("/:id", async (req, res) => {
    // 收到传来的model 并删除
    const model = await req.model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  // 请求列表
  router.get(
    "/",
    // 向数据库请求数据
    async (req, res) => {
      const list = await req.model
        .find()
        .populate("parent")
        .limit(100);
      res.send(list); // 数组
    }
  );

  // 请求详情
  router.get("/:id", async (req, res) => {
    const model = await req.model.findById(req.params.id);
    res.send(model); // 对象
  });

  // 中间件
  const authMiddleware = require("../../middleware/auth");
  const modelMiddleware = require("../../middleware/model");

  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    modelMiddleware(),
    router
  );

  // 静态文件
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "../../../uploads" });

  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      // 构造一个路径传给前端让前端访问并显示该图片
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    // 解构赋值
    const { username, password } = req.body;
    // 1.根据用户名查找用户
    const adminuser = require("../../models/AdminUser");
    // 根据username查找 并带上password
    const user = await adminuser.findOne({ username }).select("+password");
    assert(user, 422, "用户不存在");
    // 2.校验密码
    // 使用bcrypt进行校验
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "用户名和密码错误");
    // 3.返回token
    // 使用jwt模块
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: user._id
      },
      app.get("secret")
    );
    res.send({ token });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
