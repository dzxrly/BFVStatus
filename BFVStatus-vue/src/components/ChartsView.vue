<template>
  <div class="chartsView-wrap">
    <div class="load" v-if="historyLoading">
      <Loading></Loading>
    </div>
    <el-page-header class="pageHeader" @back="goBack">
      <template slot="content">{{playerId}}的数据统计</template>
    </el-page-header>
    <el-alert
      type="error"
      title="官方数据接口出错，请晚些时候重试"
      :closable="false"
      v-if="!isGetDataSuccessfully"
      show-icon
    ></el-alert>
    <el-row class="updateTimeRow" type="flex" justify="center">
      <el-col :span="16" class="updateTimeCol">
        <el-tag size="mini" type="warning">更新于{{lastUpdateTime}}</el-tag>
      </el-col>
    </el-row>
    <van-tabs v-model="activeTab" class="vanTabs" v-if="isGetDataSuccessfully">
      <van-tab title="K/D折线图" class="vanTab">
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-slider
              v-model="selectedKdDays"
              show-input
              input-size="mini"
              :min="1"
              :max="maxKdLen"
              :step="1"
              :show-tooltip="false"
            ></el-slider>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24" style="font-size: 10px; text-align: center">
            <el-tag type="info" size="mini" style="margin-top: 5px;">近{{selectedKdDays}}天数据</el-tag>
          </el-col>
        </el-row>
        <div id="kdLineChartDiv" style="width: 100vw;height: 70vh"></div>
      </van-tab>
      <van-tab title="击杀数折线图" class="vanTab">
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-slider
              v-model="selectedKillsDays"
              show-input
              input-size="mini"
              :min="1"
              :max="maxKillsLen"
              :step="1"
              :show-tooltip="false"
            ></el-slider>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24" style="font-size: 10px; text-align: center">
            <el-tag type="info" size="mini" style="margin-top: 5px;">近{{selectedKillsDays}}天数据</el-tag>
          </el-col>
        </el-row>
        <div id="killsLineChartDiv" style="width: 100vw;height: 70vh"></div>
      </van-tab>
      <van-tab title="SPM折线图" class="vanTab">
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-slider
              v-model="selectedSpmDays"
              show-input
              input-size="mini"
              :min="1"
              :max="maxSpmLen"
              :step="1"
              :show-tooltip="false"
            ></el-slider>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24" style="font-size: 10px; text-align: center">
            <el-tag type="info" size="mini" style="margin-top: 5px;">近{{selectedSpmDays}}天数据</el-tag>
          </el-col>
        </el-row>
        <div id="spmLineChartDiv" style="width: 100vw;height: 70vh"></div>
      </van-tab>
    </van-tabs>
    <el-row type="flex" justify="center" class="echartsLinkRow">
      <el-col :span="24" class="echartsLinkCol">Powered By ECharts</el-col>
    </el-row>
  </div>
</template>

<script>
import { httpGet } from '../js/api'
export default {
  name: 'ChartsView',
  data () {
    return {
      isInit: false,
      playerHistory: {},
      historyLoading: true,
      playerId: 'null',
      lastUpdateTime: '无数据',
      activeTab: 0,
      maxKdLen: 30,
      selectedKdDays: 30,
      selectedKillsDays: 30,
      maxKillsLen: 30,
      selectedSpmDays: 30,
      maxSpmLen: 30,
      isGetDataSuccessfully: true,
      kdLineOption: {
        itemStyle: {
          color: '#409EFF'
        },
        grid: {
          left: 60
        },
        textStyle: {
          color: '#c23531'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ],
        dataset: {
          source: []
        },
        xAxis: {
          type: 'time',
          axisLabel: {
            rotate: 90
          }
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          scale: true,
          axisLabel: {
            padding: [0, 0, 0, 10]
          }
        },
        series: [
          {
            type: 'line',
            encode: {
              x: 'gameTime',
              y: 'kd'
            }
          }
        ]
      },
      killsLineOption: {
        itemStyle: {
          color: '#409EFF'
        },
        grid: {
          left: 60
        },
        textStyle: {
          color: '#c23531'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ],
        dataset: {
          source: []
        },
        xAxis: {
          type: 'time',
          axisLabel: {
            rotate: 90
          }
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          scale: true
        },
        series: [
          {
            type: 'line',
            encode: {
              x: 'gameTime',
              y: 'kills'
            }
          }
        ]
      },
      spmLineOption: {
        itemStyle: {
          color: '#409EFF'
        },
        grid: {
          left: 60
        },
        textStyle: {
          color: '#c23531'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ],
        dataset: {
          source: []
        },
        xAxis: {
          type: 'time',
          axisLabel: {
            rotate: 90
          }
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          scale: true
        },
        series: [
          {
            type: 'line',
            encode: {
              x: 'gameTime',
              y: 'spm'
            }
          }
        ]
      },
      kdLineChart: null,
      killsLineChart: null,
      spmLineChart: null
    }
  },
  created () {
    this.clearData()
    this.getPlayerHistory()
    this.setPlayerId()
    this.getLastUpdateTime()
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.drawKDLineChart()
    // })
  },
  methods: {
    goBack () {
      window.history.back()
    },
    clearData () {
      this.kdLineOption.dataset.source.length = 0
      this.killsLineOption.dataset.source.length = 0
      this.spmLineOption.dataset.source.length = 0
    },
    setPlayerId () {
      this.playerId = this.$store.getters.getUsername
    },
    raiseError (titleStr, msgStr) {
      this.$notify.error({
        title: titleStr,
        message: msgStr
      })
    },
    getPlayerHistory () {
      var params = {
        url: 'https://api.tracker.gg/api/v2/bfv/standard/profile/' + this.$store.getters.getPlatform + '/' + this.$store.getters.getUsername + '/history'
      }
      var thisView = this
      var onSuccess = function (res) {
        thisView.playerHistory = JSON.parse(res)
        thisView.$store.commit('setHistory', res)
        thisView.historyLoading = false
        if (JSON.stringify(thisView.playerHistory.data.series) !== '{}') {
          thisView.isGetDataSuccessfully = true
          thisView.setMaxLen()
          thisView.setInitSelectedValue()
          thisView.kdDataInit()
          thisView.killsDataInit()
          thisView.spmDataInit()
          thisView.drawKDLineChart()
        } else {
          thisView.isGetDataSuccessfully = false
        }
      }
      var onError = function (res) {
        thisView.historyLoading = false
        thisView.raiseError('数据表生成失败', '没有找到该用户')
        window.history.back()
      }
      var onTimeout = function (res) {
        thisView.raiseError('数据表生成失败', '连接超时')
        thisView.historyLoading = false
        window.history.back()
      }
      httpGet(params, onSuccess, onError, onTimeout, 45000)
    },
    setInitSelectedValue () {
      this.selectedKdDays = this.maxKdLen
      this.selectedKillsDays = this.maxKillsLen
      this.selectedSpmDays = this.maxSpmLen
      this.isInit = true
    },
    setMaxLen () {
      this.maxKdLen = this.playerHistory.data.series.KdRatio.data.length
      this.maxKillsLen = this.playerHistory.data.series.Kills.data.length
      this.maxSpmLen = this.playerHistory.data.series.ScorePerMinute.data.length
    },
    kdDataInit () {
      var kdData = this.deepClone(this.playerHistory.data.series.KdRatio.data)
      kdData.reverse()
      this.kdLineOption.dataset.source.push(['gameTime', 'kd'])
      for (var i = 0; i < this.selectedKdDays; i++) {
        this.kdLineOption.dataset.source.push([kdData[i][0], kdData[i][1].value])
      }
    },
    killsDataInit () {
      var killsData = this.deepClone(this.playerHistory.data.series.Kills.data)
      killsData.reverse()
      this.killsLineOption.dataset.source.push(['gameTime', 'kills'])
      for (var i = 0; i < this.selectedKillsDays; i++) {
        this.killsLineOption.dataset.source.push([killsData[i][0], killsData[i][1].value])
      }
    },
    spmDataInit () {
      var spmData = this.deepClone(this.playerHistory.data.series.ScorePerMinute.data)
      spmData.reverse()
      this.spmLineOption.dataset.source.push(['gameTime', 'spm'])
      for (var i = 0; i < this.selectedSpmDays; i++) {
        this.spmLineOption.dataset.source.push([spmData[i][0], spmData[i][1].value])
      }
    },
    getLastUpdateTime () {
      var playerData = this.$store.getters.getJSONData
      var lastUpdateDate = new Date(playerData.data.metadata.lastUpdated.displayValue)
      this.lastUpdateTime = lastUpdateDate.toLocaleString()
    },
    drawKDLineChart () {
      this.kdLineChart = this.$echarts.init(document.getElementById('kdLineChartDiv'), null, {renderer: 'svg'})
      this.kdLineChart.setOption(this.kdLineOption)
    },
    drawKillsLineChart () {
      this.killsLineChart = this.$echarts.init(document.getElementById('killsLineChartDiv'), null, {renderer: 'svg'})
      this.killsLineChart.setOption(this.killsLineOption)
    },
    drawSpmLineChart () {
      this.spmLineChart = this.$echarts.init(document.getElementById('spmLineChartDiv'), null, {renderer: 'svg'})
      this.spmLineChart.setOption(this.spmLineOption)
    },
    deepClone (originData) {
      var _obj = JSON.stringify(originData)
      var dataClone = JSON.parse(_obj)
      return dataClone
    }
  },
  watch: {
    'activeTab': function (newVal, oldVal) {
      if (newVal === 0) {
        this.$nextTick(() => {
          this.drawKDLineChart()
        })
      } else if (newVal === 1) {
        this.$nextTick(() => {
          this.drawKillsLineChart()
        })
      } else if (newVal === 2) {
        this.$nextTick(() => {
          this.drawSpmLineChart()
        })
      } else {
        this.$nextTick(() => {
          this.drawKDLineChart()
        })
      }
    },
    'selectedKdDays': function (newVal, oldVal) {
      this.kdLineOption.dataset.source.length = 0
      this.kdDataInit()
      if (this.kdLineChart) this.kdLineChart.setOption(this.kdLineOption)
    },
    'selectedKillsDays': function (newVal, oldVal) {
      this.killsLineOption.dataset.source.length = 0
      this.killsDataInit()
      if (this.killsLineChart) this.killsLineChart.setOption(this.killsLineOption)
    },
    'selectedSpmDays': function (newVal, oldVal) {
      this.spmLineOption.dataset.source.length = 0
      this.spmDataInit()
      if (this.spmLineChart) this.spmLineChart.setOption(this.spmLineOption)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.chartsView-wrap {
  background-color #ffffff
  min-height 100vh
  .pageHeader {
    padding-top 5px
    margin-bottom 10px
  }
  .updateTimeRow {
    margin 10px 0px 10px 0px
    text-align center
  }
  .echartsLinkRow {
    margin 10px 0px 0px 0px
    text-align center
    .echartsLinkCol {
      font-size 10px
      color #909399
    }
  }
}
</style>
