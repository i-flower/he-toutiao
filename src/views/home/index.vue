<template>
  <el-container class="container-home">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" :width="isOpen?'200px':'64px'">
        <!-- 侧边栏logo -->
        <div class="logo" :class="{minLogo: !isOpen}"></div>
        <!--<el-menu 菜单容器 -->
        <!-- default-active="1" 指定那个菜单被激活 使用index属性来标识 -->
        <!-- background-color="#002033" 菜单容器背景颜色 -->
        <!-- text-color="#fff" 菜单容器文本颜色 -->
        <!-- active-text-color="#ffd04b" 菜单容器被激活文本颜色 -->
        <el-menu
           default-active="1"
           background-color="#002033"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse="!isOpen"
           :collapse-transition="false"
        >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文字</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>

        </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部导航区域 -->
      <el-header>
        <!-- 设置字体图标 -->
        <span @click="toggleMenu()" class="el-icon-s-fold icon"></span>
        <span>江苏传智播客教育科技有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown" :hide-on-click="false">
          <span class="el-dropdown-link">
            <img class="user-icon" :src="photo" alt="">
            <span class="user-name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <!-- icon是添加的字体图标 -->
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由 欢迎页面显示位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: 'app-home',
  data () {
    return {
      isOpen: true,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = auth.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // 切换左菜单
    toggleMenu () {
      //切换状态 展开 收起   宽度/logo/导航菜单组件
      this.isOpen = !this.isOpen
    }
  }
};
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
    .logo {
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    }
      // 样式一定需要写在 logo 下方，加上这个类之后去覆盖上面样式
    .minLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto; 
    }
    .el-menu {
        border-right: none;
    }
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
