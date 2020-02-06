<template>
    <!-- <div class='container'> Login </div> -->
    <!-- 全屏容器 -->
    <div class='container-login'>
       <el-card class="my-card">
         <img src="../../assets/logo_index.png">
       </el-card>
    </div>
</template>

<script>
export default {
    name: 'app-login'
}
</script>

<style scoped lang="less">
    .container-login{
        width: 100%;
        height: 100%;
        position:absolute;
        left: 0;
        right: 0;
        background:url(../../assets/login_bg.jpg) no-repeat center;
        background-size: cover;
        .my-card{
            width:400px;
            height:350px;
            position:absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-60%);
            img{
                display: block;
                width: 200px;
                margin: 0 auto;
            }
        }
    }
</style>