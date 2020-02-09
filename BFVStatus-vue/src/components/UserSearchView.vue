<template>
    <div class="userSearch-wrap" v-loading.fullscreen.lock="fullscreenLoading">
      <el-row class="container-wrap" type="flex" justify="center">
        <el-col :span="18" class="formCol">
          <div class="inCol">
            <div class="appName">战地V 战绩查询助手</div>
            <el-form ref="form" :model="formInfo" :rules="rules" class="form" label-position="top" size="mini">
              <el-form-item label="平台" prop="userPlatform">
                <el-select v-model="formInfo.userPlatform" placeholder="请选择平台" filterable clearable>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="formInfo.userName" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit('form')">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
    </el-row>
    <el-row class="footerRow" type="flex" justify="center">
      <el-col :span="14">
        <p class="word" @click="raiseAbout">Made by ViveLaCCCP</p>
        <van-popup v-model="showPopup" position="bottom" closeable close-icon-position='top-left'>
          <div class="inPopupRow">
            <el-row type="flex" justify="center">
              <el-col style="text-align: center" :span="24">
                战地V战绩查询助手
              </el-col>
            </el-row>
            <el-divider>{{version}}</el-divider>
            <el-row type="flex" justify="left">
              <el-col :span="24">作者:</el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="24">Origin: ViveLaCCCP</el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="24">Steam: Egg_Targaryen</el-col>
            </el-row>
            <el-divider>Powered By Vue.js</el-divider>
            <el-row type="flex" justify="left" class="vueText">
              <el-col :span="24" style="text-align: center"><img :src="vueLogo" style="width: 16px;height: 16px;"></el-col>
            </el-row>
            <el-row type="flex" justify="left" class="vueText">
              <el-col :span="24" style="text-align: center">An Element &amp; Vant Front-end Program</el-col>
            </el-row>
          </div>
        </van-popup>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  name: 'UserSearchView',
  data () {
    var validateUserPlatform = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择平台'))
      } else if (value !== 'origin' && value !== 'psn' && value !== 'xbl') {
        return callback(new Error('不存在所选平台！'))
      }
      return callback()
    }
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      return callback()
    }
    return {
      vueLogo: require('../assets/logo.png'),
      version: 'Ver.1.0 BETA',
      showPopup: false,
      fullscreenLoading: false,
      isFailed: false,
      options: [{
        value: 'origin',
        label: 'Origin'
      }, {
        value: 'psn',
        label: 'PlayStation'
      }, {
        value: 'xbl',
        label: 'Xbox'
      }],
      formInfo: {
        userPlatform: '',
        userName: ''
      },
      rules: {
        userPlatform: [
          {validator: validateUserPlatform, trigger: 'blur'}
        ],
        userName: [
          {validator: validateUserName, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    httpGet (params) {
      var storeData = this.$store
      var thisRouter = this.$router
      var thisView = this
      var xhr = new XMLHttpRequest()
      if (params.data) {
        params.url += '?' + params.data
      }
      xhr.open('get', params.url)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var res = xhr.responseText
          // console.log(res)
          storeData.commit('setLastPageName', 'UserSearchView')
          storeData.commit('setData', res)
          storeData.commit('setPlatform', thisView.formInfo.userPlatform)
          storeData.commit('setUsername', thisView.formInfo.userName)
          clearTimeout(timeout)
          thisRouter.push({name: 'PlayerStatusInfoView'})
        } else if (xhr.status === 404) {
          thisView.fullscreenLoading = false
          thisView.raiseError('查询失败', '未找到指定用户')
        }
      }
      var timeout = setTimeout(function () {
        xhr.abort()
        thisView.raiseError('查询失败', '连接超时')
        thisView.fullscreenLoading = false
      }, 45 * 1000)
      xhr.send()
    },
    submit (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          this.httpGet({url: 'https://api.tracker.gg/api/v2/bfv/standard/profile/' + this.formInfo.userPlatform + '/' + this.formInfo.userName})
        } else {
          this.raiseError('表单填写有误', '请正确填写平台和用户名')
        }
      })
    },
    raiseError (titleStr, msgStr) {
      this.$notify.error({
        title: titleStr,
        message: msgStr
      })
    },
    raiseAbout () {
      this.showPopup = true
    }
  }
}
</script>
<style scoped lang="stylus">
.userSearch-wrap {
  min-height 100vh

  .container-wrap {
    min-height 95vh
    .formCol {
      .inCol {
        background-color #ffffff
        margin-top 70%
        padding-top 5px
        padding-left 5px
        padding-right 5px
        border 1px solid rgba(0, 0, 0, .04)
        border-radius 4px
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
        .appName {
          margin 5px 5px 15px 5px
          text-align center
        }
      }
    }
  }
  .footerRow {
    .word {
      text-align center
      font-size 10px
      color #ffffff
    }
    .inPopupRow {
      margin 10px 10px 10px 10px
      .el-row {
        font-size 14px
        margin 5px 0 5px 0
        .el-divider {
          width 100%
          margin 15px 0 15px 0
          .el-divider__text {
            font-size 10px
            padding 0 0 0 0
          }
        }
      }
    }
  }
}
</style>
