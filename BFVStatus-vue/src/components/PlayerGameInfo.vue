<template>
  <div class="playerGameInfo-wrap">
    <div class="load" v-if="gameReportsTabPaneLoading">
      <Loading></Loading>
    </div>
    <el-page-header @back="goBack" content="本局游戏详情" class="pageHeader"></el-page-header>
    <div v-if="!gameReportsTabPaneLoading">
    <el-row class="serverInfo-name" type="flex" justify="center">
        <el-col :span="24">{{gameWholeInfo.data.metadata.serverName}}</el-col>
    </el-row>
    <el-row class="serverInfo-modeAndMap" type="flex" justify="center">
        <el-col :span="24">{{gameWholeInfo.data.metadata.modeKey | convertModeName}}&nbsp;&nbsp;-&nbsp;&nbsp;{{gameWholeInfo.data.metadata.mapKey | convertMapName}}</el-col>
    </el-row>
    <el-row class="serverInfo-timeAndPlayerCount" type="flex" justify="center">
        <el-col :span="24">
            {{gameWholeInfo.data.metadata.timestamp | convertTimestamp}}
            <el-divider direction="vertical"></el-divider>
            {{playerCount}}人
        </el-col>
    </el-row>
    <el-tabs class="infoTabs" stretch>
      <el-tab-pane v-for="(child, index) in gameWholeInfo.data.children" :key="index">
          <span slot="label">{{child.metadata.name | convertCountryName}}</span>
          <el-table :data="child.children" size="mini" border :row-class-name="tableRowClassName">
            <el-table-column type="expand" width="40px" fixed="left">
                <template slot-scope="props">
                    <!-- <el-button type="text" @click="goToOtherPlayer">点此查看&nbsp;{{props.row.metadata.name}}&nbsp;的详细战绩</el-button> -->
                    <el-divider>游玩时长</el-divider>
                    <el-form label-position="left" size="mini" class="timeForm">
                      <el-form-item label="时长">
                          <span style="color: #409EFF">{{props.row.metadata.timePlayed | convertSecondToTime}}</span>
                      </el-form-item>
                    </el-form>
                    <el-divider>分数</el-divider>
                    <el-form label-position="left" size="mini" class="scoreForm">
                      <el-form-item label="总分">
                          <span style="color: #409EFF">{{props.row.stats[24].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="每分钟得分">
                          <span style="color: #409EFF">{{props.row.stats[25].displayValue}}</span>
                      </el-form-item>
                    </el-form>
                    <el-divider>战斗</el-divider>
                    <el-form label-position="left" size="mini" class="combatForm">
                        <el-form-item label="击杀">
                            <span style="color: #409EFF">{{props.row.stats[0].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="死亡">
                            <span style="color: #409EFF">{{props.row.stats[1].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="击杀/死亡">
                            <span style="color: #409EFF">{{props.row.stats[2].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="每分钟击杀">
                            <span style="color: #409EFF">{{props.row.stats[3].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="造成伤害">
                            <span style="color: #409EFF">{{props.row.stats[4].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="爆头数量">
                            <span style="color: #409EFF">{{props.row.stats[5].displayValue}}</span>
                            <el-tag type="primary" size="mini" v-if="((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100) < 30">爆头率{{((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100).toFixed(1)}}%</el-tag>
                            <el-tag type="warning" size="mini" v-else-if="((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100) >= 30 && ((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100) < 50">爆头率{{((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100).toFixed(1)}}%</el-tag>
                            <el-tag type="danger" size="mini" v-else-if="((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100) >= 50">爆头率{{((props.row.stats[5].displayValue / props.row.stats[0].displayValue) * 100).toFixed(1)}}%</el-tag>
                        </el-form-item>
                        <el-form-item label="助攻击杀">
                            <span style="color: #409EFF">{{props.row.stats[6].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="复仇击杀">
                            <span style="color: #409EFF">{{props.row.stats[7].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="掩护击杀">
                            <span style="color: #409EFF">{{props.row.stats[8].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="射击次数">
                            <span style="color: #409EFF">{{props.row.stats[9].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="命中次数">
                            <span style="color: #409EFF">{{props.row.stats[10].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="命中率">
                            <span style="color: #409EFF">{{props.row.stats[11].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="狗牌获取数">
                            <span style="color: #409EFF">{{props.row.stats[12].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="最远爆头距离">
                            <span style="color: #409EFF">{{props.row.stats[13].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="最高连杀数">
                            <span style="color: #409EFF">{{props.row.stats[14].displayValue}}</span>
                        </el-form-item>
                        <el-form-item label="最高多重击杀">
                            <span style="color: #409EFF">{{props.row.stats[15].displayValue}}</span>
                        </el-form-item>
                    </el-form>
                    <el-divider>团队</el-divider>
                    <el-form label-positon="left" size="mini" class="teamForm">
                      <el-form-item label="治疗量">
                          <span style="color: #409EFF">{{props.row.stats[16].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="扶起队友数量">
                          <span style="color: #409EFF">{{props.row.stats[17].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="被扶起次数">
                          <span style="color: #409EFF">{{props.row.stats[18].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="重新补给">
                          <span style="color: #409EFF">{{props.row.stats[19].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="载具修复">
                          <span style="color: #409EFF">{{props.row.stats[20].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="小队重生">
                          <span style="color: #409EFF">{{props.row.stats[21].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="团灭小队">
                          <span style="color: #409EFF">{{props.row.stats[22].displayValue}}</span>
                      </el-form-item>
                      <el-form-item label="命令完成次数">
                          <span style="color: #409EFF">{{props.row.stats[23].displayValue}}</span>
                      </el-form-item>
                    </el-form>
                    <el-divider>武器</el-divider>
                    <div class="weaponInfo-wrap" v-for="(child, index) in props.row.children" :key="index">
                        <div v-if="child.metadata.categoryKey !== 'gadget' && child.metadata.categoryKey !== 'tanks' && child.metadata.categoryKey !== 'planes' && child.metadata.categoryKey !== 'transport'" style="margin-top: 10px">
                            <span style="font-size: 18px; color: #409EFF">{{child.metadata.name | convertWeaponName}}</span>
                            <el-form label-position="left" class="weaponForm" size="mini">
                                <el-form-item label="使用时长">
                                    <span style="color: #409EFF">{{child.stats[0].displayValue | convertTimeLan}}</span>
                                </el-form-item>
                                <el-form-item label="击杀">
                                    <span style="color: #409EFF">{{child.stats[1].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="得分">
                                    <span style="color: #409EFF">{{child.stats[2].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="每分钟得分">
                                    <span style="color: #409EFF">{{child.stats[3].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="爆头数量">
                                    <span style="color: #409EFF">{{child.stats[5].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="开火次数">
                                    <span style="color: #409EFF">{{child.stats[6].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="命中次数">
                                    <span style="color: #409EFF">{{child.stats[7].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="命中率">
                                    <span style="color: #409EFF">{{child.stats[8].displayValue}}</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <el-divider>载具</el-divider>
                    <div class="vehicleInfo-wrap" v-for="(child, index) in props.row.children" :key="index">
                        <div v-if="child.metadata.categoryKey === 'tanks' || child.metadata.categoryKey === 'planes' || child.metadata.categoryKey === 'transport'" style="margin-top: 10px">
                            <span style="font-size: 18px; color: #409EFF">{{child.metadata.name | convertVehicleName}}</span>
                            <el-form class="vehicleForm" label-position="left" size="mini">
                                <el-form-item label="使用时长">
                                    <span style="color: #409EFF">{{child.stats[0].displayValue | convertTimeLan}}</span>
                                </el-form-item>
                                <el-form-item label="击杀">
                                    <span style="color: #409EFF">{{child.stats[1].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="摧毁敌方载具数量">
                                    <span style="color: #409EFF">{{child.stats[2].displayValue}}</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <el-divider>装备</el-divider>
                    <div class="gadgetInfo-wrap" v-for="(child, index) in props.row.children" :key="index">
                        <div v-if="child.metadata.categoryKey === 'gadget'" style="margin-top: 10px">
                            <span style="font-size: 18px; color: #409EFF">{{child.metadata.name | convertGadgetName}}</span>
                            <el-form label-position="left" class="gadgetForm" size="mini">
                                <el-form-item label="使用时长">
                                    <span style="color: #409EFF">{{child.stats[0].displayValue | convertTimeLan}}</span>
                                </el-form-item>
                                <el-form-item label="击杀">
                                    <span style="color: #409EFF">{{child.stats[1].displayValue}}</span>
                                </el-form-item>
                                <el-form-item label="使用次数">
                                    <span style="color: #409EFF">{{child.stats[4].displayValue}}</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="名称" width="120px">
              <template slot-scope="scope">
                <span>{{scope.row.metadata.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="分数" width="75px">
              <template slot-scope="scope">
                <span>{{scope.row.stats[24].displayValue}}</span>
              </template>
            </el-table-column>
            <el-table-column label="K/D" width="65px">
              <template slot-scope="scope">
                <span>{{scope.row.stats[2].displayValue}}</span>
              </template>
            </el-table-column>
            <el-table-column label="杀敌" width="55px">
              <template slot-scope="scope">
                <span>{{scope.row.stats[0].displayValue}}</span>
              </template>
            </el-table-column>
            <el-table-column label="死亡" width="55px">
              <template slot-scope="scope">
                <span>{{scope.row.stats[1].displayValue}}</span>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import {timestampToTime, mapCodeToCN, modeNameToCN, countryNameConvert, timeENGToCN, weaponNameConvert, vehicleNameConvert, gadgetNameConvert, secondsFormat} from '../js/convertPackage.js'
import { httpGet } from '../js/api'
export default {
  name: 'PlayerGameInfo',
  data () {
    return {
      gameWholeInfo: {},
      playerCount: 0,
      playerId: 'null',
      gameReportsTabPaneLoading: true
    }
  },
  created () {
    this.popstateListener()
  },
  mounted () {
    this.getGameInfo()
  },
  methods: {
    getGameInfo () {
      this.gameReportsTabPaneLoading = true
      var thisView = this
      var params = {
        url: 'https://api.tracker.gg/api/v1/bfv/gamereports/' + thisView.$route.query.platform + '/direct/' + thisView.$route.query.id
      }
      var onSuccess = function (res) {
        thisView.gameReportsTabPaneLoading = false
        thisView.gameWholeInfo = JSON.parse(res)
        thisView.getPlayerCount()
        thisView.getPlayerId()
      }
      var onError = function () {
        thisView.gameReportsTabPaneLoading = false
        thisView.raiseError('查询失败', '未找到用户的游戏记录')
      }
      var onTimeOut = function () {
        thisView.raiseError('查询失败', '连接超时')
        thisView.gameReportsTabPaneLoading = false
      }
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    getPlayerId () {
      this.playerId = this.$store.getters.getUsername
    },
    goBack () {
      this.$router.push({name: 'PlayerStatusInfoView'})
    },
    getPlayerCount () {
      for (var i = 0; i < this.gameWholeInfo.data.children.length; i++) {
        this.playerCount += this.gameWholeInfo.data.children[i].children.length
      }
    },
    goToOtherPlayer () {
      // TODO
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.metadata.name === this.playerId) {
        console.log('res:' + (row.metadata.name === this.playerId))
        return 'success-row'
      } else return ''
    },
    popstateListener () {
      window.addEventListener('popstate', () => {
        console.log('pop')
      })
    }
  },
  filters: {
    'convertMapName': function (value) {
      return mapCodeToCN(value)
    },
    'convertModeName': function (value) {
      return modeNameToCN(value)
    },
    'convertTimestamp': function (value) {
      return timestampToTime(value)
    },
    'convertCountryName': function (value) {
      return countryNameConvert(value)
    },
    'convertTimeLan': function (value) {
      return timeENGToCN(value)
    },
    'convertWeaponName': function (value) {
      return weaponNameConvert(value)
    },
    'convertVehicleName': function (value) {
      return vehicleNameConvert(value)
    },
    'convertGadgetName': function (value) {
      return gadgetNameConvert(value)
    },
    'convertSecondToTime': function (value) {
      return secondsFormat(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
/deep/ .el-table .success-row {
  background #f0f9eb
}
.playerGameInfo-wrap {
  background-color #ffffff
  min-height 100vh
  .pageHeader {
    padding-top 5px
  }
  .topDivider {
    margin 5px 0 10px 0
  }
  .serverInfo-name {
    text-align center
    font-size 20px
    margin-top 10px
    color #303133
  }
  .serverInfo-modeAndMap {
      text-align center
      font-size 14px
      margin-top 10px
      color #606266
  }
  .serverInfo-timeAndPlayerCount {
      margin-top 10px
      text-align center
      font-size 12px
      color #909399
  }
  .infoTabs {
      margin-top 10px
      .el-divider {
          margin 20px 0 20px 0
      }
      .timeForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
      .scoreForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
      .combatForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
      .teamForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
      .weaponForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
      .gadgetForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
      .vehicleForm {
          .el-form-item {
              margin 0 0 0 0
          }
      }
  }
}
</style>
