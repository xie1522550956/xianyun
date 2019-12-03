<template>
  <div class="container">
    <div class="userlogindiv">
      <el-row>
        <span
          class="denglu"
          :class="{avates: tab===index}"
          v-for="(value,index) in ['登录','注册']"
          :key="index"
          @click="tablogin(index)"
        >{{value}}</span>
      </el-row>
      <div>
        <el-row>
          <el-form ref="form" :validate-on-rule-change='false' :rules="rules" :model="userinfo" v-if='tab === 0'>
            <el-form-item prop="username">
              <el-input v-model="userinfo.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="password">
              <el-input type='password' v-model="userinfo.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="form-item" size="medium" type="primary" @click="userlogin">登录</el-button>
            </el-form-item>
          </el-form>
          <el-form ref="zc-form" :validate-on-rule-change='false' :rules="rules2" :model="zcuserinfo" v-if='tab === 1'>
            <el-form-item prop="username">
              <el-input v-model="zcuserinfo.username" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row>
                <el-input v-model="zcuserinfo.captcha" placeholder="验证码"></el-input>
              <div class="captchainp">
                <input type="button" :class="{avater:captchainps!=0}" @click='captchainp' class="capButtom" :value="captchainpval">
              <!-- <el-button class="form-item" size="medium" type="primary" @click="captchainp">发送验证码</el-button> -->
              </div>
              </el-row>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="zcuserinfo.password" type='password' placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="passwords">
              <el-input v-model="passwords" type='password' @blur='yzpasswords'  placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
              <el-input v-model="zcuserinfo.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="form-item" size="medium" type="primary" @click="userregister">注册</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
			rules: {
            username: [
                { 
                    required: true, 
                    message: '请输入用户名', 
                    trigger: 'blur' 
                },
            ],
            password: [
                { 
                    required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                },
            ],
      },
      rules2: {
            username: [
                { 
                    required: true, 
                    message: '请输入手机号', 
                    trigger: 'blur' 
                },
            ],
            password: [
                { 
                    required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                },
            ],
            nickname: [
                { 
                    required: true, 
                    message: '请输入昵称', 
                    trigger: 'blur' 
                },
            ],
            captcha: [
                { 
                    required: true, 
                    message: '请输入验证码', 
                    trigger: 'blur' 
                },
            ]
			},
			tab: 0,
			userinfo: {
				username: '13800138000',
				password: '123456'
      },
      zcuserinfo: {
        username: '13111111111',
        nickname: '',
        password: '',
        captcha: '',
      },
      passwords: '',
      captchainps: false,
      captchainpval: '发送验证码'
    };
  },
  methods: {
    tablogin(index) {
      this.tab = index;
    },
    // 登录
		userlogin(){
						console.log(this.$store.state.user.userInfo)

			this.$refs['form'].validate((valid) => {
				if(valid) {
					// let res = await this.$axios({
					// 	url:'/accounts/login',
					// 	method: 'POST',
					// 	data:this.userinfo
					// })
				  this.$store.dispatch('user/login', this.userinfo)
					.then( res => {
						this.$message({
              message: "登录成功，正在跳转",
              type: "success"
						})
						setTimeout(() => {
              this.$store.commit('user/setUserinfo', res)
              this.$router.replace("/")
            }, 1000);
					})

				}
			})
			
    },
    // 点击发送验证码按钮
    async captchainp(){
      if(!this.captchainps) {
        console.log(this.zcuserinfo.username)
        let res = await this.$axios({
          url:'/captchas',
          method:'POST',
          data: {tel:this.zcuserinfo.username}
        })
        console.log(res)
        this.$message.success('验证码为:'+res.data.code) 
        this.captchainps = 60
        this.captchainpval ='正在发送('+ this.captchainps+')'  
        let templid = setInterval(()=>{
          --this.captchainps
          this.captchainpval = '正在发送('+ this.captchainps+')' 
          if(this.captchainps == 0) {
            this.captchainpval = '发送验证码'
            clearInterval(templid)
            
          }
          
        },1000)
      }
    },
    // 二次输入密码框失去焦点
    yzpasswords() {
      console.log(1)
      if(this.zcuserinfo.password !== this.passwords) {
        console.log(123)
      }
    },
    //用户注册
    userregister() {
       if(this.zcuserinfo.password !== this.passwords) {
        this.$message.error('两次输入的密码不一致!');
        return 
      }
      this.$refs['zc-form'].validate(async (valid) => {
        if(valid) {
          let res = await this.$axios({
            url:'/accounts/register',
            method:'POST',
            data: this.zcuserinfo
          })
          console.log(res)
          this.$message.success('注册成功!');
          setTimeout(()=> {
            this.tab = 0
          },1000)
        }
      })

    }
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 700px;
  min-width: 1000px;
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  position: relative;
  .captchainp {
    float: right;

  }
  .el-form {
    .el-row {
      display: flex;
      .capButtom {
        height: 100%;
        border: none;
        outline: none;
        padding: 0 10px;
        background-color: #409EFF;
        border-radius: 5px;
        color: #fff;
        box-sizing: border-box;
        cursor: pointer;
      }
      .avater {
        background-color: #fff;
        border: 1px solid #409EFF;
        color: #409EFF;
      }
    }
  }
  .userlogindiv {
    width: 400px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    > .el-row {
      width: 400px;
      height: 40px;
      line-height: 40px;
    }
    > div:first-child {
      display: flex;
      width: 400px;
      .denglu {
        height: 40px;
        line-height: 40px;
        flex: 1;
        text-align: center;
        background-color: #aaa;
        box-sizing: border-box;
      }
      .avates {
        background-color: #fff;
        color:rgb(240, 156, 78);
        border-top: 2px solid rgb(240, 156, 78);
      }
    }

    > div:nth-of-type(2) {
      padding: 10px;
      button {
        width: 100%;
      }
    }
  }
}
</style>