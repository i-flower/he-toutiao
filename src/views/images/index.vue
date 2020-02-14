<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <!-- collect 值为true时收藏图片 为false时全部图片 -->
        <!-- :label 指定值才是布尔类型 -->
        <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" style="float:right" size="small">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img-list">
        <!-- 获取到的数据在模版中遍历 -->
        <div class="img-item" v-for="item in images" :key="item.id">
          <img src="item.url" alt />
          <!-- 收藏列表的时候不需要底部的操作按钮 设置隐藏-->
          <div class="option" v-if="!reqParams.changeCollect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImages(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
        style="text-align:center"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <!-- action="完整上传地址"  组件自己来发送上传请求 -->
    <!-- :show-file-list="false" 不显示文件列表 -->
    <!-- :on-success="handleAvatarSuccess" 上传成功回调函数 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import auth from '@/utils/auth'
export default {
  name: "app-image",
  data() {
    return {
      // 控制对话框显示 隐藏
      dialogVisible: false,
      // 查询条件
      reqParams: {
        // false 全部 true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 预览图
      imageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    };
  },
  created() {
    // 组件初始化的时候获取数据
    this.getImages();
  },
  methods: {
    async getImages() {
      // 获取数据
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      // console.log(res);
      // 给列表数据赋值
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    },
    // 处理页码改变
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 切换 全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 切换收藏与取消
    async toggleStatus(item) {
      try {
        const res = await this.$http.put(`/user/images/${item.id}`, {
          collect: !item.is_collected
        });
        // res.data.data.collect 就是当前素材状态
        this.$message.success(
          res.data.data.collect ? "添加收藏成功" : "取消收藏成功"
        );
        // item 就是素材数据  is_collected 显示收藏图标的 颜色
        item.is_collected = res.data.data.collect;
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    // 删除图片
    delImages(id) {
      // 确认框
      this.$confirm("亲，您是否要删除该图片素材？", "温馨提示", {
        confirmButtonText: "确定",
        cancekButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`/user/images/${id}`);
            this.$message.success("删除成功");
            this.getImages();
          } catch (e) {
            this.$message.error("删除成功");
          }
        })
        .catch(() => {});
    },
    //打开对话框
    openDialog() {
      this.dialogVisible = true;
      this.imageUrl = null;
    },
    // 上传成功回调函数
    uploadSuccess (res) {
        // console.log(res) === {data:{url:'图片地址'}}
       // 预览图片
       this.imageUrl = res.data.url
       // 成功的提示
       this.$message.success('上传成功')
       // 2s 关闭对话框 更新列表
       // 使用匿名函数this指向window，箭头函数可以使this指向继承外部的this指向，保持一致
       window.setTimeout(() => {
           // 关闭对话框
           this.dialogVisible = false
           // 更新列表
           this.getImages()
       },2000)
    }
  }
};
</script>

<style scoped lang="less" >
.img-list {
  margin-bottom: 30px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
 