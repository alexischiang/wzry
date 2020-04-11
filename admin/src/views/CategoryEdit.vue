<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="默认为根分类">
          <el-option
            v-for="item in parent"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
			model: {},
			parent:[]
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // 将 this.model 传给后端 更新数据库
        await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        // 将 this.model 传给后端 存入数据库
        await this.$http.post("rest/categories", this.model);
      }
      // 成功后跳转+提示
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
		},
		async fetchParent() {
      const res = await this.$http.get(`rest/categories`);
      this.parent = res.data;
    }
  },
  created() {
		this.fetchParent();
    this.id && this.fetch();
  }
};
</script>

<style lang="scss" scoped>
</style>