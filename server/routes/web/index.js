module.exports = app => {
  const express = require("express");
  const router = express.Router();

  const mongoose = require("mongoose");
  const Category = mongoose.model("Category");
  const Article = mongoose.model("Article");

  // 导入新闻数据
  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean();

    const newsTitles = [
      "12月17日全服不停机更新公告",
      "恭喜AG超玩会获得秋季赛总冠军！冠军庆典惊喜不断",
      "12月13日体验服停机更新公告",
      "商城推荐页签重复显示黄金白羊座皮肤异常说明",
      "12月16日体验服停机更新公告",
      "SNK皮肤爆料丨晚萤少女，娜可露露新装亮相！",
      "新英雄爆料丨蒙犽：我的子弹会拐弯，我的想法不一般！",
      "玄雍资料片1月上线，嬴政形象升级抢先看",
      "峡谷交响乐幕后故事揭秘（交响音乐会倒计时2天）",
      "皮肤爆料 | S18赛季皮肤提前曝光，竟然是ta！",
      "12月17日全服不停机更新公告",
      "12月13日体验服停机更新公告",
      "商城推荐页签重复显示黄金白羊座皮肤异常说明",
      "12月16日体验服停机更新公告",
      "【已修复】部分微信区服闪退及对局结算异常说明公告",
      "恭喜AG超玩会获得秋季赛总冠军！冠军庆典惊喜不断",
      "KPL限定皮肤【天狼征服者】全服购买开启公告",
      "【看KPL秋决，赢豪华大礼】活动公告",
      "【奇遇咕嗒的寻宝之旅】活动公告",
      "【已修复】圣诞礼盒活动异常修复公告",
      "请看职业选手的实力！2019终极国服大挑战",
      "王者无界，聚有荣耀！2019年王者荣耀冬季冠军杯12月21日开启",
      "2019KPL秋季赛总决赛武汉开战，AG超玩会复仇QGhappy首次捧起银龙杯",
      "心怀荣耀勇往直前！AG超玩会圆梦武汉斩获2019年KPL秋季赛总冠军",
      "2019年KPL秋季赛总决赛明日开启 线上观赛赢海量福利"
    ];
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randomCats.slice(0, 2),
        title: title
      };
    });

    await Article.deleteMany({});
    await Article.insertMany(newsList);
    res.send(newsList);
  });

  // 新闻列表接口
  router.get("/news/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    const cats = await Category.aggregate([
      {
        // 条件查询
        $match: { parent: parent._id }
      },
      {
        // 左外连接
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ]);

    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate("categories")
        .limit(5)
        .lean()
    });

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });

    res.send(cats);
  });

  app.use("/web/api", router);
};
