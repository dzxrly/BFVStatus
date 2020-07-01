<template>
  <div class="userSearch-wrap">
    <div class="load"
         v-if="fullscreenLoading">
      <Loading></Loading>
    </div>
    <div>
      <el-row class="container-wrap"
              type="flex"
              justify="center">
        <el-col :span="18"
                class="formCol">
          <div class="inCol">
            <div class="appName">战地V战绩查询助手</div>
            <el-alert type="warning"
                      title="当前版本为测试版"
                      :closable="false"
                      show-icon
                      v-if="isTestVer"></el-alert>
            <el-form ref="form"
                     :model="formInfo"
                     :rules="rules"
                     class="inputForm"
                     label-position="right"
                     label-width="60px"
                     size="mini">
              <el-form-item label="平台"
                            prop="userPlatform">
                <el-select v-model="formInfo.userPlatform"
                           placeholder="请选择平台"
                           filterable
                           clearable
                           style="width: 100%;">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名"
                            prop="userName">
                <el-autocomplete v-model.trim="formInfo.userName"
                                 :fetch-suggestions="querySearch"
                                 placeholder="请输入用户名"
                                 clearable
                                 style="width: 100%;"></el-autocomplete>
              </el-form-item>
              <el-form-item>
                <el-row type="flex"
                        justify="end">
                  <el-col :span="8">
                    <el-button type="primary"
                               style="width: 100%; text-align: center;"
                               @click="submit('form')"
                               plain>查询</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <el-row style="margin: 0 0 10px 0;"
                    type="flex"
                    justify="end">
              <el-col :span="24"
                      style="text-align: right;">
                <div v-loading="versionCheckLoading">
                  <el-tag size="mini"
                          type="success"
                          v-if="isLatestVer === 1">已是最新版本</el-tag>
                  <el-tag size="mini"
                          type="warning"
                          v-else-if="isLatestVer === 0"
                          @click="openDLPage">发现新版本，点击下载</el-tag>
                  <el-tag size="mini"
                          type="danger"
                          v-else-if="isLatestVer === 2"
                          @click="reCheck">版本检测失败，点击重新检测</el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="footerRow"
              type="flex"
              justify="center">
        <el-col :span="24">
          <p class="word"
             @click="raiseAbout">{{tagName}}&nbsp;|&nbsp;By&nbsp;ViveLaCCCP</p>
          <van-popup v-model="showPopup"
                     position="bottom"
                     closeable
                     close-icon-position="top-left">
            <div class="inPopupRow">
              <el-row type="flex"
                      justify="center">
                <el-col style="text-align: center"
                        :span="24">战地V战绩查询助手</el-col>
              </el-row>
              <el-row type="flex"
                      justify="center">
                <el-col style="text-align: center"
                        :span="24">
                  <el-button type="info"
                             round
                             size="mini"
                             plain
                             @click="goToGithub">
                    <img src="../assets/social_github.svg" />&nbsp;Github
                  </el-button>
                </el-col>
              </el-row>
              <el-divider>Data Source</el-divider>
              <el-row type="flex"
                      justify="center"
                      class="dataSrcText">
                <el-col :span="24"
                        style="text-align: center">
                  All Data From
                  <el-button type="text"
                             size="mini"
                             @click="goToTRN">TRACKER NETWORK</el-button>
                </el-col>
              </el-row>
              <el-divider>{{tagName}}</el-divider>
              <el-row type="flex"
                      justify="left">
                <el-col :span="24">作者: ViveLaCCCP</el-col>
              </el-row>
              <el-row type="flex"
                      justify="left">
                <el-col :span="24">Origin ID: ViveLaCCCP</el-col>
              </el-row>
              <el-row type="flex"
                      justify="left">
                <el-col :span="24">Steam ID: Egg_Targaryen</el-col>
              </el-row>
              <el-divider>Powered By Vue.js</el-divider>
              <el-row type="flex"
                      justify="center"
                      class="vueText">
                <el-col :span="24"
                        style="text-align: center">
                  <img :src="vueLogo"
                       style="width: 16px;height: 16px;" />
                </el-col>
              </el-row>
              <el-row type="flex"
                      justify="center"
                      class="vueText">
                <el-col :span="24"
                        style="text-align: center">An Element &amp; Vant Front-end Program</el-col>
              </el-row>
            </div>
          </van-popup>
        </el-col>
      </el-row>
    </div>
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
      tagName: 'Ver.1.5.1',
      isTestVer: false,
      githubReleaseUrl: 'https://api.github.com/repos/dzxrly/BFVStatus/releases/latest',
      githubLink: 'https://github.com/dzxrly/BFVStatus',
      trnLink: 'https://tracker.gg/',
      latestVerHtmlUrl: 'https://github.com/dzxrly/BFVStatus/releases/latest',
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
          { validator: validateUserPlatform, trigger: 'blur' }
        ],
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ]
      },
      playerIdHistory: []
    }
  },
  mounted () {
    this.getLastCheckVerRes()
    this.checkNeedToUpdate()
    this.getPlayerIdHistory()
    this.checkIsTestVersion()
    this.tabAcitveInit()
  },
  methods: {
    tabAcitveInit () {
      this.$store.commit('setTabActive', 0)
    },
    getLastCheckVerRes () {
      this.isLatestVer = this.$store.getters.getVersionCheckedRes
    },
    checkIsTestVersion () {
      if (this.tagName.indexOf('alpha') !== -1 || this.tagName.indexOf('beta') !== -1) {
        this.isTestVer = true
      } else this.isTestVer = false
    },
    getPlayerIdHistory () {
      this.playerIdHistory = this.$store.getters.getPlayerIdHistory
    },
    querySearch (queryString, callback) {
      var playerIds = this.playerIdHistory
      var res = queryString ? playerIds.filter(this.createFilter(queryString)) : playerIds
      callback(res)
    },
    createFilter (queryString) {
      return (playerId) => {
        return (playerId.value.indexOf(queryString) === 0)
      }
    },
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
        var playerId = ('{ "value":"' + thisView.formInfo.userName + '" }').replace(new RegExp('\\"', 'gm'), '"')
        storeData.commit('setPlayerIdHistory', playerId)
        thisView.$router.push({ name: 'PlayerStatusInfoView' })
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
          thisView.$store.commit('setVersionCheckedRes', 1)
        } else {
          thisView.isLatestVer = 0
          thisView.$store.commit('setVersionCheckedRes', 0)
          thisView.githubAssetsUrl = JSON.parse(res).assets[0].url
        }
        thisView.versionCheckLoading = false
      }
      var onError = function (res) {
        thisView.isLatestVer = 2
        thisView.raiseError('版本检测失败', '无法连接至Github')
        thisView.versionCheckLoading = false
        thisView.$store.commit('setVersionCheckedRes', 2)
      }
      var onTimeOut = function (res) {
        thisView.isLatestVer = 2
        thisView.raiseError('版本检测失败', '无法连接至Github')
        thisView.versionCheckLoading = false
        thisView.$store.commit('setVersionCheckedRes', 2)
      }
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    reCheck () {
      this.getVersionInfo()
      this.storeUpdateTime()
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
    },
    storeUpdateTime () {
      let updateTimetamp = new Date().getTime()
      this.$store.commit('setVersionCheckedDate', updateTimetamp)
    },
    checkNeedToUpdate () {
      let nowTimetamp = new Date().getTime()
      let lastUpdateTimetamp = this.$store.getters.getVersionCheckedDate
      let timeDiff = nowTimetamp - lastUpdateTimetamp
      let diffDays = Math.floor(timeDiff / (24 * 3600 * 1000))
      if (diffDays !== 0) {
        console.log('update checked')
        this.getVersionInfo()
        this.storeUpdateTime()
      } else this.versionCheckLoading = false
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
        border 1px solid rgba(0, 0, 0, 0.04)
        border-radius 4px
        box-shadow 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)
        .appName {
          margin 5px 5px 15px 5px
          text-align center
        }
        .inputForm {
          margin 10px 5px 5px 5px
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
