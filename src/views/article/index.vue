<template>
  <div class="container-article">
    <!-- 筛选区域 -->
    <el-card class="box-card">
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
           <!-- 频道组件 -->
           <my-channel v-model="filterData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card style="margin-top: 20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 使用表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" width="140px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toEditArticle(scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button @click="delArticle(scope.row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- total 指定总条数 -->
      <!-- page-size 设置每一页显示多少条，默认是10条 -->
      <!-- cyrrent-page 指定当前是第几页 -->
      <!-- current-change 是事件  pager 是函数 -->
      <el-pagination
        style="margin-top:20px;text-align:center"
        background
        layout="prev, pager, next"
        @current-change="pager"
        :total="total"
        :current-page="filterData.page"
        :page-size="filterData.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  // 注意：组件名称不能和原生标签重名
  name: "app-article",
  data() {
    return {
      articles: [],
      // 总条数
      total: 0,
      // 声明筛选条件数据，筛选条件数据提交给后台，数据的字段名称，由后台接口决定。
      // 筛选数据是由多个表单元素组成，需要收集所有数据，应该使用对象来进行绑定
      filterData: {
        // 当字段的值null，axios请求不会提交，代表不传
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 日期范围数据 [起始日期,结束日期]
      // 但是选择完成日期范围后，可以根据这个数据给 begin_pubdate end_pubdate 赋值。
      dateArr: []
    }
  },
  created() {
    // this.getChannelOptions(), 
    this.getArticles()
  },
  methods: {
    // 获取频道的选项数据
    // async getChannelOptions() {
    //   // 原始数据 res = {data: {message:'', data:{channels:[频道数组]}}}
    //   // 按照结构去 解构 赋值。
    //   // await this.$http.get('channels) 返回值res
    //   // this.channelOptions = [{id, name}] 数据格式
    //   const res = await this.$http.get("channels");
    //   // console.log(res);
    //   this.channelOptions = res.data.data.channels;
    // },
    async getArticles() {
      // post('地址','请求体数据')
      // 如果是get请求，如何传递参数对象 get('地址',{params:'get对象参数'})
      const res = await this.$http.get("articles", { params: this.filterData });
      this.articles = res.data.data.results;
      //  console.log(res);
      // 设置总条数
      this.total = res.data.data.total_count
    },
    // 切换分页
    pager (newPage) {
      // console.log(newPage);
      this.filterData.page = newPage
      this.getArticles()
    },
     // 搜索 
     search () {
       // 每次尽心搜索的时候 页码应该改成1
       this.filterData.page = 1
       this.getArticles()
     },
     // 日期选择处理函数
     changeDate (dateArr) {
        // 默认参数 dateArr [起始日期,结束日期]  日期默认是Date类型
        // 文档：可受 value-format 控制，通过这个数据指定组件产生的日期格式 yyyy-MM-dd
        // console.log(value);  "2020-02-25", "2020-03-25"
        // 当使用组件的 清空功能，也会触发changeDate函数，改变成null === dateArr
        if (dateArr) {
          this.filterData.begin_pubdate = dateArr[0]
          this.filterData.end_pubdate = dateArr[1]
        } else {
          this.filterData.begin_pubdate = null
          this.filterData.end_pubdate = null
        }
     },
     // 频道改变后
    //  changeChannel () {
    //   //  console.log(this.filterData.channel_id);
       
    //    if (this.filterData.channel_id === '') {
    //      this.filterData.channel_id = null
    //    }
    //  },
     // 编辑文章
     toEditArticle(id) {
       this.$router.push(`/publish?id=${id}`)
       
     },
     // 删除文章
     delArticle (id) {
        // 确认框
      this.$confirm('亲，您是否要删除该篇文章？','温馨提示',{
        cinfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () =>{
        // 删除请求
        try {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        } catch (e) {
          this.$message.error('删除失败')
        }
      }).catch(()=>{})
     }
  }
};
</script>

<style scoped lang="less" >
</style>
