<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.body.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(eachBody,i) in model.body" :key="i" style="margin-top:1rem">
            <el-form-item label="URL" label-width="40px">
              <el-input v-model="eachBody.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" label-width="40px" style="margin-top:1rem">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(eachBody,'image',res.url)"
              >
                <img v-if="eachBody.image" :src="eachBody.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item style="margin-left:40px">
              <el-button size="small" type="danger" @click="model.body.splice(i,1)">删除</el-button>
            </el-form-item>
            <el-divider></el-divider>
          </el-col>
        </el-row>
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
      model: {
        body: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // 将 this.model 传给后端 更新数据库
        await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 将 this.model 传给后端 存入数据库
        await this.$http.post("rest/ads", this.model);
      }
      // 成功后跳转+提示
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
</style>