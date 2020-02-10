<template>
    <!-- <div class='container'> Login </div> -->
    <!-- 全屏容器 -->
    <div class='container-login'>
      <el-card class="my-card">
         <img src="../../assets/logo_index.png">
      
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item> 
        <el-form-item> 
          <el-checkbox :value="true">我已阅读和同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item> 
          <el-button type="primary" @click="login" style="width:100%">登 录</el-button>
        </el-form-item>
       </el-form>

       </el-card>
    </div>
    
</template>

<script>
import auth from '@/utils/auth'
export default {
    name: 'app-login',
    data() {
        const checkMobile = (rule, value, callback) => {
            // 使用正则进行手机号自定义校验
            if(!/^1[3-9]\d{9}$/.test(value)) {
               callback(new Error('手机号格式不正确'))
            } else{
              callback()   
            }
            
        }
        return{
            loginForm: {
            mobile: '13911111111',
            code: '246810'
            },
            loginRules: {
            mobile: [
                {required:true, message:'请输入手机号',trigger:'blur'},
                //自定义校验规则
                {validator: checkMobile, trigger: 'blur'}
            ],
            code: [
                {required:true, message:'请输入验证码',trigger:'blur'},
                {len:6, message:'请输入6位验证码', trigger:'blur'}
            ]
            }
        }
    
    },
    methods: {
        login() {
           this.$refs.loginForm.validate((valid)=> {
               if(valid) {
                 //校验正确   调用登录接口进行登录
                 this.$http.post(
                     'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
                     // 请求对像
                     this.loginForm
                     ).then(res => {
                         //登陆成功 获取到响应对象res，res.data是响应主体（将来使用）
                         // 存储用户信息
                         // res.data.data就是用户信息
                         auth.setUser(res.data.data)
                         // 进行页面跳转
                        //  console.log(res);
                         
                         this.$router.push('/')
                    }).catch(e => {
                        // 登陆失败 e是错误对象
                        // 提示：手机号或验证码错误
                        // console.log(e);
                        
                        this.$message.error('手机号或验证码错误')
                    })
               }
           })
        }
    }
}
</script>

<style scoped lang="less">
    .container-login{
        width: 100%;
        height: 100%;
        position:absolute;
        left: 0;
        top: 0;
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
                margin: 0 auto 20px;
            }
        }
    }
</style>