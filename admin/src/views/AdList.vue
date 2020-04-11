<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="广告名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <!-- 点击‘编辑’跳转 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      // 向localhost:3000/admin/api/categories发get请求
      // 将传回的res赋值给表单数据items
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除列表"${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async() => {
					await this.$http.delete(`rest/ads/${row._id}`)
          this.$message({
            type: "success",
            message: "删除成功!"
					});
					this.fetch();
        })
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
</style>