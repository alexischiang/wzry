<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterAvatarUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficulties"
              show-score
              :max="10"
              style="margin-top:0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" show-score :max="10" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" show-score :max="10" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" show-score :max="10" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple clearable>
              <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple clearable>
              <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="玩法建议">
            <el-input type="textarea" :col="2" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对线建议">
            <el-input type="textarea" :col="2" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战建议">
            <el-input type="textarea" :col="2" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skill">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(skill,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(skill,'icon',res.url)"
                >
                  <!-- 上传成功 -> 显示绑定给skill.icon -->
                  <img v-if="skill.icon" :src="skill.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能介绍">
                <el-input type="textarea" :row="2" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" :row="2" v-model="skill.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
              <el-divider></el-divider>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
      categories: [],
      items: [],
      model: {
        scores: {},
        skills: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // 将 this.model 传给后端 更新数据库
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        // 将 this.model 传给后端 存入数据库
        await this.$http.post("rest/heroes", this.model);
      }
      // 成功后跳转+提示
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchOption() {
      const res1 = await this.$http.get(`rest/items/`);
      const res2 = await this.$http.get(`rest/categories/`);
      this.categories = res2.data;
      this.items = res1.data;
    },
    afterAvatarUpload(res) {
      this.$set(this.model, "avatar", res.url);
    }
  },
  created() {
    this.fetchOption();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>