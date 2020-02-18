<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <!-- 面包屑 -->
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type===1">
            <!-- 封面组件位置 -->
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-for="i in 3" :key="i" 
            v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit(false)" type="primary">发布文章</el-button>
          <el-button @click="submit(true)">存入草稿箱</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// 富文本需要的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 组件配置对象
import { quillEditor } from "vue-quill-editor";
export default {
  name: "app-publish",
  components: {
    // 注册局部组件 quill-editor
    quillEditor
  },
  data() {
    return {
     
      // 文章数据
      articleForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 1,
          // 放图片地址
          images: []
        }
      },
      // 配置富文本对象
      editorOption: {
        // 占位文字
        placeholder: "",
        // 模块配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"]
          ]
        }
      }
    };
  },
  methods: {
    // 添加文章 draft===false 发布文章 draft===true 存入文章
    async submit (draft) {
      try {
        // 请求 接口需要地址栏键值对参数
        await this.$http.post(`articles?draft=${draft}`,this.articleForm)
        // 提示
        this.$message.success(draft? '存入草稿箱成功':'发布文章成功')
        // 跳转
        this.$router.push('/article')
      } catch (e){
        this.$message.error('操作失败')
      }
    }
  }
};
</script>

<style scoped lang="less" >
</style>
