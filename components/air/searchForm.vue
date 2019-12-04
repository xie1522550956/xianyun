<template>
  <div>
    <div class="title">
      <span
        v-for="(value,index) in ['单程','往返']"
        @click="jpfromtab =index"
        :key="index"
        :class="{active: jpfromtab === index}"
      >{{value}}</span>
    </div>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
        v-model="form.departCity"
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
          <!-- fetch-suggestions为文本框的值发生变化时执行 第一个参数为这个值 第二个参数是一个回调函数 
          这个回调函数需要一个参数 这个参数是一个数组 数组里面的
          select 为点击了推荐（选项）后执行 参数为选择的项的值 -->
        <el-autocomplete
         v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker v-model="form.departDate" type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate"></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jpfromtab: 0,
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      departval: '',
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      datavalue: ''
    };
  },
  methods: {
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    // 这个列表其实是一个数组,数组当中每一个元素都是一个对象
    // 一个对象就是一条建议
    // 其中最重要的是 value 这个值
    // queryDepartSearch(value, cb) {
    // 最简单的建议结构如下
    // var arr = [
    //   {
    //     value: "广州"
    //   },
    //   {
    //     value: "上海"
    //   }
    // ];
    // cb(arr);
    // },

    async queryDepartSearch(value, cb) {
        this.departval = value
      const arr = await this.querySearchAsync(value);
      if (arr.length > 0) {
        // 不在下拉列表中选择，则默认选择第一项
        this.form.departCity = arr[0].value;
        this.form.departCode = arr[0].sort;
      }
      console.log(arr);

      cb(arr);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch(value, cb) {
    //   const arr = await this.querySearchAsync(value);
        const res = await this.$axios({
            url:'/airs/city',
            params:{
                name: value
            }
        })
        console.log(res)
      if (res.data.data.length > 0) {
        // 不在下拉列表中选择，则默认选择第一项
        this.form.destCity = res.data.data[0].value
        this.form.destCode = res.data.data[0].sort
      }
      let arr = res.data.data.map(v=>{
          return {
              ...v,
              value:v.name.replace("市", "")
          }

      })
      cb(arr);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
        console.log(item)
        this.form.departCity = item.value;
        this.form.departCode = item.sort;
    },

    // 这个是封装的 ajax 专门用来获取城市列表
    querySearchAsync(queryString) {
      return new Promise((resolve, reject) => {
        // 如果关键字是空，则直接返回
        if (!queryString) {
          return resolve([]);
        }

        this.$axios({
          url: `/airs/city`,
          params: {
            name: queryString
          }
        }).then(res => {
          const { data } = res.data;

          // 下拉提示列表必须要有value字段
          const arr = data.map(v => {
            return {
              ...v,
              value: v.name.replace("市", "")
            };
          });
          resolve(arr);
        });
      });
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
        console.log(item)
        this.form.destCity = item.value;
        this.form.destCode = item.sort;
        console.log(this.form)
    },

    // 确认选择日期时触发
    handleDate(value) {},

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 提交表单是触发
    handleSubmit() {
      console.log(this.form);
    }
  },
  mounted() {}
};
</script>

<style lang='less' scopet>
.title {
  display: flex;
  > span {
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(238, 238, 238);
    box-sizing: border-box;
  }
  .active {
    border-top: 2px solid rgb(226, 175, 79);
    background-color: #fff;
  }
}
.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>