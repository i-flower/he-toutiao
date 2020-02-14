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
        <el-button type="success" style="float:right" size="small">添加素材</el-button>
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
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-image",
  data() {
    return {
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
      total: 0
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
      }).then(async () => {
         try {
            await this.$http.delete(`/user/images/${id}`)
            this.$message.success('删除成功')
            this.getImages()
         } catch (e) {
           this.$message.error('删除成功')
         }
      }).catch( () => {})
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
 