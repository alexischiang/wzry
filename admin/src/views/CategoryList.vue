<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
	data() {
		return {
			items:[]
		}
	},
	methods: {
		async fetch(){
			// 向localhost:3000/admin/api/categories发get请求
			// 将传回的res赋值给表单数据items
			const res = await this.$http.get('categories')	
			this.items = res.data
		}
	},
	created() {
		this.fetch();
	},
};
</script>

<style lang="scss" scoped>
</style>