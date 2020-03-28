<template>
    <div class="userSearch-wrap" v-loading.fullscreen.lock="fullscreenLoading">
      <el-row class="container-wrap" type="flex" justify="center">
        <el-col :span="18" class="formCol">
          <div class="inCol">
            <div class="appName">战地V战绩查询助手</div>
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
                <el-row>
                  <el-col :span="10">
                    <el-button type="primary" @click="submit('form')" plain>查询</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <el-row style="margin: 0 0 10px 0;" type="flex" justify="end">
              <el-col :span="24" style="text-align: right;">
                <div v-loading="versionCheckLoading">
                  <el-tag size="mini" type="success" v-if="isLatestVer === 1">已是最新版本</el-tag>
                  <el-tag size="mini" type="warning" v-else-if="isLatestVer === 0" @click="openDLPage">发现新版本，点击下载</el-tag>
                  <el-tag size="mini" type="danger" v-else-if="isLatestVer === 2" @click="reCheck">版本检测失败，点击重新检测</el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
    </el-row>
    <el-row class="footerRow" type="flex" justify="center">
      <el-col :span="24">
        <p class="word" @click="raiseAbout">{{tagName}}&nbsp;|&nbsp;By&nbsp;ViveLaCCCP</p>
        <van-popup v-model="showPopup" position="bottom" closeable close-icon-position='top-left'>
          <div class="inPopupRow">
            <el-row type="flex" justify="center">
              <el-col style="text-align: center" :span="24">
                战地V战绩查询助手
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col style="text-align: center" :span="24">
                <el-button type="info" round size="mini" plain @click="goToGithub"><img src="../assets/social_github.svg">&nbsp;Github</el-button>
              </el-col>
            </el-row>
            <el-divider>Data Source</el-divider>
            <el-row type="flex" justify="center" class="dataSrcText">
              <el-col :span="24" style="text-align: center">All Data From <el-button type="text" size="mini" @click="goToTRN">TRACKER NETWORK</el-button></el-col>
            </el-row>
            <el-divider>{{tagName}}</el-divider>
            <el-row type="flex" justify="left">
              <el-col :span="24">作者: ViveLaCCCP</el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="24">Origin ID: ViveLaCCCP</el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="24">Steam ID: Egg_Targaryen</el-col>
            </el-row>
            <el-divider>Powered By Vue.js</el-divider>
            <el-row type="flex" justify="center" class="vueText">
              <el-col :span="24" style="text-align: center"><img :src="vueLogo" style="width: 16px;height: 16px;"></el-col>
            </el-row>
            <el-row type="flex" justify="center" class="vueText">
              <el-col :span="24" style="text-align: center">An Element &amp; Vant Front-end Program</el-col>
            </el-row>
          </div>
        </van-popup>
      </el-col>
    </el-row>
    </div>
</template>

<script>
import { httpGet } from '../js/api.js'
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
      versionCheckLoading: true,
      isLatestVer: 1,
      tagName: 'Ver.1.3.4',
      githubReleaseUrl: 'https://api.github.com/repos/dzxrly/BFVStatus/releases/latest',
      githubLink: 'https://github.com/dzxrly/BFVStatus',
      trnLink: 'https://tracker.gg/',
      latestVerHtmlUrl: '',
      githubAssetsUrl: '',
      downloadUrl: '',
      vueLogo: require('../assets/logo.png'),
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
  created () {
    this.getVersionInfo()
  },
  methods: {
    getUserInfo () {
      var params = {
        url: 'https://api.tracker.gg/api/v2/bfv/standard/profile/' + this.formInfo.userPlatform + '/' + this.formInfo.userName
      }
      var thisView = this
      var storeData = this.$store
      var onError = function () {
        thisView.fullscreenLoading = false
        thisView.raiseError('查询失败', '未找到指定用户')
      }
      var onTimeOut = function () {
        thisView.raiseError('查询失败', '连接超时')
        thisView.fullscreenLoading = false
      }
      var onSuccess = function (res) {
        storeData.commit('setLastPageName', 'UserSearchView')
        storeData.commit('setData', res)
        storeData.commit('setPlatform', thisView.formInfo.userPlatform)
        storeData.commit('setUsername', thisView.formInfo.userName)
        thisView.$router.push({name: 'PlayerStatusInfoView'})
      }
      thisView.fullscreenLoading = true
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    getVersionInfo () {
      var params = { url: this.githubReleaseUrl }
      var thisView = this
      this.versionCheckLoading = true
      var onSuccess = function (res) {
        if (thisView.tagName === JSON.parse(res).tag_name) {
          thisView.isLatestVer = 1
        } else {
          thisView.isLatestVer = 0
          thisView.githubAssetsUrl = JSON.parse(res).assets[0].url
          thisView.latestVerHtmlUrl = JSON.parse(res).html_url
        }
        thisView.versionCheckLoading = false
      }
      var onError = function (res) {
        thisView.isLatestVer = 2
        thisView.raiseError('版本检测失败', '无法连接至Github')
        thisView.versionCheckLoading = false
      }
      var onTimeOut = function (res) {
        thisView.isLatestVer = 2
        thisView.raiseError('版本检测失败', '无法连接至Github')
        thisView.versionCheckLoading = false
      }
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    reCheck () {
      this.getVersionInfo()
    },
    submit (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.getUserInfo()
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
    },
    openDLPage () {
      window.open(this.latestVerHtmlUrl)
    },
    goToGithub () {
      window.open(this.githubLink)
    },
    goToTRN () {
      window.open(this.trnLink)
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
      font-size 12px
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
