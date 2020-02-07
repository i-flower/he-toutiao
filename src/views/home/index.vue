<template>
  <el-container class="container-home">
    <!-- 侧边栏 -->
    <el-aside width="200px">Aside</el-aside>

    <el-container>
      <!-- 头部导航区域 -->
      <el-header>
        <!-- 设置字体图标 -->
        <span class="el-icon-s-fold icon"></span>
        <span>江苏传智播客教育科技有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown" :hide-on-click="false">
          <span class="el-dropdown-link">
            <img class="user-icon" src="../../assets/avatar.jpg" alt="">
            <span class="user-name">用户名称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <!-- icon是添加的字体图标 -->
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style scoped lang="less" >
.container-home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      font-size: 16px;
      vertical-align: middle;
    }
    .my-dropdown {
        float: right;
        .user-icon {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
        .user-name {
           color: #333;
           font-weight: bold;
           vertical-align: middle;
           padding-left: 5px;
        }
    }
  }
}
</style>
