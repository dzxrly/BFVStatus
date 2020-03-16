<template>
  <div class="chartsView-wrap">
    <el-page-header content="游戏数据统计表" class="pageHeader" @back="goBack"></el-page-header>
    <el-row class="playerIdRow" type="flex" justify="center">
      <el-col :span="24" class="playerIdCol">{{playerId}}</el-col>
    </el-row>
    <el-row class="updateTimeRow" type="flex" justify="center">
      <el-col :span="24" class="updateTimeCol">
        <el-tag size="mini">更新于{{lastUpdateTime}}</el-tag>
      </el-col>
    </el-row>
    <van-tabs v-model="activeTab" v-loading="historyLoading" class="vanTabs">
      <van-tab title="K/D折线图" class="vanTab">
        <div id="kdLineChartDiv" style="width: 100vw;height: 70vh"></div>
      </van-tab>
      <van-tab title="击杀数折线图" class="vanTab">
        <div id="killsLineChartDiv" style="width: 100vw;height: 70vh"></div>
      </van-tab>
      <van-tab title="SPM折线图" class="vanTab">
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
      playerHistory: {},
      historyLoading: true,
      playerId: 'null',
      lastUpdateTime: '无数据',
      activeTab: 0,
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
      }
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
      this.$router.push({name: 'PlayerStatusInfoView'})
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
        thisView.kdDataInit()
        thisView.killsDataInit()
        thisView.spmDataInit()
        thisView.drawKDLineChart()
        thisView.historyLoading = false
      }
      var onError = function (res) {
        thisView.historyLoading = false
        thisView.raiseError('数据表生成失败', '没有找到该用户')
      }
      var onTimeout = function (res) {
        thisView.raiseError('数据表生成失败', '连接超时')
        thisView.historyLoading = false
      }
      httpGet(params, onSuccess, onError, onTimeout, 45000)
    },
    kdDataInit () {
      var kdData = this.playerHistory.data.series.KdRatio.data
      this.kdLineOption.dataset.source.push(['gameTime', 'kd'])
      for (var i = 14; i < kdData.length; i++) {
        this.kdLineOption.dataset.source.push([kdData[i][0], kdData[i][1].value])
      }
    },
    killsDataInit () {
      var killsData = this.playerHistory.data.series.Kills.data
      this.killsLineOption.dataset.source.push(['gameTime', 'kills'])
      for (var i = 14; i < killsData.length; i++) {
        this.killsLineOption.dataset.source.push([killsData[i][0], killsData[i][1].value])
      }
    },
    spmDataInit () {
      var spmData = this.playerHistory.data.series.ScorePerMinute.data
      this.spmLineOption.dataset.source.push(['gameTime', 'spm'])
      for (var i = 0; i < spmData.length; i++) {
        this.spmLineOption.dataset.source.push([spmData[i][0], spmData[i][1].value])
      }
    },
    getLastUpdateTime () {
      var playerData = this.$store.getters.getJSONData
      var lastUpdateDate = new Date(playerData.data.metadata.lastUpdated.displayValue)
      this.lastUpdateTime = lastUpdateDate.toLocaleString()
    },
    drawKDLineChart () {
      let kdLineChart = this.$echarts.init(document.getElementById('kdLineChartDiv'), null, {renderer: 'svg'})
      kdLineChart.setOption(this.kdLineOption)
    },
    drawKillsLineChart () {
      let killsLineChart = this.$echarts.init(document.getElementById('killsLineChartDiv'), null, {renderer: 'svg'})
      killsLineChart.setOption(this.killsLineOption)
    },
    drawSpmLineChart () {
      let spmLineChart = this.$echarts.init(document.getElementById('spmLineChartDiv'), null, {renderer: 'svg'})
      spmLineChart.setOption(this.spmLineOption)
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

    .playerIdRow {
        margin 20px 0px 0px 0px
        text-align center
        .playerIdCol {
            font-size 24px
            font-weight bolder
        }
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
