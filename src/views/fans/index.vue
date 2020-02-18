<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans-list">
            <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            @current-change="pager"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            background
            layout="prev,pager,next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pictrue">
          <div style="width:600px;height:400px" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import echarts from "echarts";

export default {
  name: "app-fans",
  data() {
    return {
      activeName: "list",
      // 粉丝列表
      fansList: [],
      // 总条数
      total: 0,
      // 传参
      reqParams: {
        page: 1,
        per_page: 24
      },
      activeName: "pictrue"
    };
  },
  created() {
    this.getFans();
  },
  methods: {
    //分页
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getFans();
    },
    // 列表数据
    async getFans() {
      const res = await this.$http.get("followers", {
        params: this.reqParams
      });
      this.fansList = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.dom);
    const option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    myChart.setOption(option);
  }
};
</script>

<style scoped lang="less" >
.fans-list {
  .fans-item {
    padding-top: 10px;
    display: inline-block;
    width: 100px;
    height: 170px;
    border: 1px dashed #ddd;
    margin-right: 50px;
    margin-bottom: 20px;
    text-align: center;
    p {
      padding: 0;
      font-size: 12px;
    }
  }
}
</style>
