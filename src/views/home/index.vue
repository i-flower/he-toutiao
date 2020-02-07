<template>
  <el-container class="container-home">
     <el-aside width="200px">Aside</el-aside>
     <el-container>
         <el-header>Header</el-header>
         <el-main>Main</el-main>
     </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style scoped lang="less" >
    .container-home {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // background-color: skyblue;
        .el-aside{
            background-color: #002033;
        }
        .el-header{
            border-bottom:1px solid #ddd;
        }
    }
   
</style>
