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
          <el-form ref="form" :rules="rules" :model="userinfo">
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
			tab: 0,
			userinfo: {
				username: '',
				password: ''
			}
    };
  },
  methods: {
    tablogin(index) {
      this.tab = index;
		},
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
						console.log(this.$store.state.user.userInfo)
						setTimeout(() => {
              this.$router.replace("/")
            }, 1000);
					})

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
        color: goldenrod;
        border-top: 2px solid goldenrod;
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