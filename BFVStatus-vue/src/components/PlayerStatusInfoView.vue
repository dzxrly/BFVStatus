<template>
  <div class="playerStatus-wrap">
    <el-page-header @back="goBack" content="战绩" class="pageHeader"></el-page-header>
    <el-divider class="topDivider"></el-divider>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" :disabled="banRefresh">
    <el-row class="playerStatusRow-wrap" type="flex" justify="center">
      <el-col :span="24">
        <el-row type="flex" justify="center">
          <el-col :span="5"><el-avatar :src="avatarSrc" :size="avatarSize"></el-avatar></el-col>
          <el-col :span="10" class="playerMainInfoCol">
            <el-row type="flex" justify="center">
              <el-col :span="24" class="playername">{{playerID}}</el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="24" class="playerTime">
                {{playerTime}}
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="24" class="playerrank">
                <el-image style="width: 12px; height: 12px" :src="playerRankImg" fit="fill">
                  <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                {{playerRank}}{{playerRankPercentage}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mainInfoRow">
      <el-col :span="24">
        <el-carousel height="80px" arrow="always" :interval="3000">
          <el-carousel-item v-for="playerMainInfo in this.playerMainInfos" :key="playerMainInfo.key">
            <h3 class="small">{{playerMainInfo.key}}&nbsp;:&nbsp;{{playerMainInfo.value}}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <van-tabs @click="eltabClick" v-loading="tabLoading" stretch v-model="vanTabActive">
      <van-tab title="战绩概览">
        <el-form class="statusMainInfo" label-position="left">
          <el-form-item label="每分钟得分">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.spm}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.spmRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="击杀/死亡比">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.kd}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.kdRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="杀敌数">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.kills}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.killsRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="每分钟击杀">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.kpm}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.kpmRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="最高连杀">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.killStreak}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.killStreakRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="爆头数量">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.headShot}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.headShotRank}}%&nbsp;&nbsp;</span>
              <el-tag v-if="playerInfoOverview.headShotPer <= 30" type="primary" size="mini">爆头率{{playerInfoOverview.headShotPer}}%</el-tag>
              <el-tag v-else-if="playerInfoOverview.headShotPer > 30 && playerInfoOverview.headShotPer < 50" type="warning" size="mini">爆头率{{playerInfoOverview.headShotPer}}%</el-tag>
              <el-tag v-else-if="playerInfoOverview.headShotPer >= 50" type="danger" size="mini">爆头率{{playerInfoOverview.headShotPer}}%</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="最远爆头距离">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.longestHeadShot}}米</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.longestHeadShotRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="胜率">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.winPercentage}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.winPerRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="胜利次数">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.wins}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.winsRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="死亡数">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.deaths}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.deathsRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="助攻数">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.assists}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.assistsRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="总伤害">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.dmg}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.dmgRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="治疗量">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.heals}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.healsRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="扶起队友数量">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.revives}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.revivesRank}}%</span>
            </div>
          </el-form-item>
          <el-form-item label="重新补给次数">
            <div>
              <span style="color: #409EFF">{{playerInfoOverview.resupplies}}</span>
              <span>&nbsp;&nbsp;排名&nbsp;>&nbsp;{{playerInfoOverview.resuppliesRank}}%</span>
            </div>
          </el-form-item>
        </el-form>
      </van-tab>
      <van-tab title="兵种信息">
          <el-table :data="playerClassInfos" style="width: 100%" class="classInfoTable">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form :label-position="labelPosition" class="demo-table-expand" size="mini">
                  <el-form-item>
                    <el-image :src="props.row.imageUrl" style="width: 50px; height: 50px" fit="fill"></el-image>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">时长</template>
                    <span>{{props.row.time}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">兵种等级</template>
                    <span>{{props.row.rank}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">总得分</template>
                    <span>{{props.row.score}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">SPM</template>
                    <span>{{props.row.spm}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">击杀数</template>
                    <span>{{props.row.kills}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">KPM</template>
                    <span>{{props.row.kpm}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label" class="classFormLabel">K/D</template>
                    <span>{{props.row.kd}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="兵种" width="55px">
              <template slot-scope="scope">
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column label="等级" prop="rank" width="55px"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
          </el-table>
      </van-tab>
      <van-tab title="游戏记录" class="gameReportPane">
        <el-table :data="gameReports" v-loading="gameReportsTabPaneLoading" size="mini" border v-el-table-infinite-scroll="load" max-height="100%" stripe>
          <el-table-column label="操作" width="55px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleClick(scope.row)">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="模式" width="65px">
            <template slot-scope="scope">
              <span>{{scope.row.modeKey | convertModeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地图" width="110px">
            <template slot-scope="scope">
              <span>{{scope.row.mapKey | convertMapName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="180px">
            <template slot-scope="scope">
              <span>{{scope.row.timestamp | convertTimestamp}}</span>
            </template>
          </el-table-column>
        </el-table>
      </van-tab>
      <van-tab title="武器信息">
        <el-table v-loading="weaponsInfoLoading" :data="weaponsInfo" size="mini" border stripe>
          <el-table-column type="expand" width="40px" fixed="left">
            <template slot-scope="props">
              <el-form size="mini" label-position="left" class="weaponInfoForm">
                <el-form-item label="击杀">
                  <span style="color: #409EFF">{{props.row.stats[0].displayValue}}</span>
                </el-form-item>
                <el-form-item label="每分钟击杀">
                  <span style="color: #409EFF">{{props.row.stats[1].displayValue}}</span>
                </el-form-item>
                <el-form-item label="使用时长">
                  <span style="color: #409EFF">{{props.row.stats[2].displayValue | convertTimeLan}}</span>
                </el-form-item>
                <el-form-item label="爆头数">
                  <span style="color: #409EFF">{{props.row.stats[6].displayValue}}</span>
                  <el-tag type="primary" size="mini" v-if="((props.row.stats[6].value / props.row.stats[0].value) * 100) < 30">爆头率{{((props.row.stats[6].value / props.row.stats[0].value) * 100).toFixed(1)}}%</el-tag>
                  <el-tag type="warning" size="mini" v-else-if="((props.row.stats[6].value / props.row.stats[0].value) * 100) >= 30 && ((props.row.stats[6].value / props.row.stats[0].value) * 100) < 50">爆头率{{((props.row.stats[6].value / props.row.stats[0].value) * 100).toFixed(1)}}%</el-tag>
                  <el-tag type="danger" size="mini" v-else-if="((props.row.stats[6].value / props.row.stats[0].value) * 100) >= 50">爆头率{{((props.row.stats[6].value / props.row.stats[0].value) * 100).toFixed(1)}}%</el-tag>
                </el-form-item>
                <el-form-item label="开火次数">
                  <span style="color: #409EFF">{{props.row.stats[3].displayValue}}</span>
                </el-form-item>
                <el-form-item label="命中次数">
                  <span style="color: #409EFF">{{props.row.stats[4].displayValue}}</span>
                  <el-tag type="primary" size="mini" v-if="props.row.stats[5].value < 30">命中率{{props.row.stats[5].displayValue}}%</el-tag>
                  <el-tag type="warning" size="mini" v-else-if="props.row.stats[5].value >= 30 && props.row.stats[5].value < 50">命中率{{props.row.stats[5].displayValue}}%</el-tag>
                  <el-tag type="danger" size="mini" v-else-if="props.row.stats[5].value >= 50">命中率{{props.row.stats[5].displayValue}}%</el-tag>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="名称" :filters="weaponTypeOptions" :filter-method="filterHandler" filter-placement="bottom-end" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.metadata.name | convertWeaponName | convertGadgetName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="使用时长" prop="stats[2]" sortable :formatter="weaponTimeFormatter" :sort-method="weaponTimeSort" width="150px"></el-table-column>
          <el-table-column label="击杀数" prop="stats[0]" sortable :formatter="weaponKillsFormatter" :sort-method="weaponKillsSort" width="120px"></el-table-column>
        </el-table>
      </van-tab>
      <van-tab title="载具信息">
        <el-table :data="vehicleInfo" v-loading="vehicleInfoLoading" stripe border size="mini">
          <el-table-column type="expand" fixed="left" width="40px">
            <template slot-scope="props">
              <el-form size="mini" label-position="left" class="vehicleInfoForm">
                <el-form-item label="击杀">
                  <span style="color: #409EFF">{{props.row.stats[0].displayValue}}</span>
                </el-form-item>
                <el-form-item label="每分钟击杀">
                  <span style="color: #409EFF">{{props.row.stats[1].displayValue}}</span>
                </el-form-item>
                <el-form-item label="使用时长">
                  <span style="color: #409EFF">{{props.row.stats[2].displayValue | convertTimeLan}}</span>
                </el-form-item>
                <el-form-item label="摧毁">
                  <span style="color: #409EFF">{{props.row.stats[3].displayValue}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="名称" :filters="vehicleTypeOptions" :filter-method="vehicleFilterHandler" filter-placement="bottom-end" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.metadata.name | convertVehicleName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="使用时长" prop="stats[2]" sortable :formatter="vehicleTimeFormatter" :sort-method="vehicleTimeSort" width="150px"></el-table-column>
          <el-table-column label="击杀数" prop="stats[0]" sortable :formatter="vehicleKillsFormatter" :sort-method="vehicleKillsSort" width="120px"></el-table-column>
        </el-table>
      </van-tab>
    </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import {timestampToTime, mapCodeToCN, modeNameToCN, weaponNameConvert, gadgetNameConvert, timeENGToCN, vehicleNameConvert} from '../js/convertPackage.js'
import elTableInfiniteScroll from 'el-table-infinite-scroll'

export default {
  name: 'PlayerStatusInfoView',
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  data () {
    return {
      vanTabActive: 0,
      banRefresh: false,
      isLoading: false,
      tabLoading: false,
      labelPosition: 'right',
      playerData: {},
      avatarSize: 64,
      avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      playerID: 'unknown player',
      playerRank: 'Lv.0',
      playerRankImg: '#',
      playerRankPercentage: '(0%)',
      playerTime: '00天00小时00分钟',
      playerMainInfos: [
        {key: 'K/D', value: '0.0'},
        {key: 'KPM', value: '0.0'},
        {key: '胜率', value: '0.0'},
        {key: 'SPM', value: '0.0'}
      ],
      playerClassInfos: [
        {id: 0, type: '突击', imageUrl: require('../assets/assu.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%'},
        {id: 1, type: '医疗', imageUrl: require('../assets/mediv.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%'},
        {id: 2, type: '飞机', imageUrl: require('../assets/ju88a.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%'},
        {id: 3, type: '侦察', imageUrl: require('../assets/recon.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%'},
        {id: 4, type: '支援', imageUrl: require('../assets/support.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%'},
        {id: 5, type: '坦克', imageUrl: require('../assets/tanker.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%'}
      ],
      playerInfoOverview: {
        spm: '0',
        spmRank: '0',
        kd: '0',
        kdRank: '0',
        kills: '0',
        killsRank: '0',
        kpm: '0',
        kpmRank: '0',
        killStreak: '0',
        killStreakRank: '0',
        headShot: '0',
        headShotRank: '0',
        headShotPer: '0',
        longestHeadShot: '0',
        longestHeadShotRank: '0',
        winPercentage: '0%',
        winPerRank: '0',
        wins: '0',
        winsRank: '0',
        deaths: '0',
        deathsRank: '0',
        assists: '0',
        assistsRank: '0',
        dmg: '0',
        dmgRank: '0',
        heals: '0',
        healsRank: '0',
        revives: '0',
        revivesRank: '0',
        resupplies: '0',
        resuppliesRank: '0'
      },
      gameReports: [],
      gameReportsToken: '',
      gameReportsTabPaneLoading: true,
      weaponTypeOptions: [
        {
          value: 'assaultrifle',
          text: '突击步枪'
        }, {
          value: 'smg',
          text: '冲锋枪'
        }, {
          value: 'mmg',
          text: '固定式机枪'
        }, {
          value: 'selfloading',
          text: '自动装填步枪'
        }, {
          value: 'semi',
          text: '半自动步枪'
        }, {
          value: 'shotgun',
          text: '霰弹枪'
        }, {
          value: 'boltactioncarbine',
          text: '手动枪机卡宾枪'
        }, {
          value: 'rifle',
          text: '单动式步枪'
        }, {
          value: 'sidearm',
          text: '手枪'
        }, {
          value: 'gadget',
          text: '装备'
        }, {
          value: 'lmg',
          text: '轻机枪'
        }, {
          value: 'pistolcarbine',
          text: '手枪型卡宾枪'
        }, {
          value: 'antimaterielrifle',
          text: '反器材步枪'
        }, {
          value: 'melee',
          text: '近战武器'
        }],
      weaponsInfo: [],
      weaponsInfoLoading: true,
      vehicleInfo: [],
      vehicleInfoLoading: true,
      vehicleTypeOptions: [
        {
          value: 'planes',
          text: '飞机'
        },
        {
          value: 'tanks',
          text: '坦克'
        },
        {
          value: 'transport',
          text: '运输载具'
        }
      ]
    }
  },
  created () {
    this.updateData()
  },
  methods: {
    updateData () {
      this.getTabActive()
      this.playerData = this.$store.getters.getJSONData
      this.playerID = this.playerData.data.platformInfo.platformUserIdentifier
      this.playerRank = 'Lv.' + this.playerData.data.segments[0].stats.rank.value
      this.avatarSrc = this.playerData.data.platformInfo.avatarUrl
      this.playerRankImg = this.playerData.data.segments[0].stats.rank.metadata.imageUrl
      this.playerRankPercentage = '(' + this.playerData.data.segments[0].stats.rankProgression.value.toFixed(1) + '%)'
      this.playerTime = this.convertTime(this.playerData.data.segments[0].stats.timePlayed.displayValue)
      this.convertMainInfosData()
      this.convertOverviewInfo()
      this.getAndSetGameReports()
      this.getWeaponsInfo()
      this.getVehiclesInfo()
      this.getClassData(0, 'Assault')
      this.getClassData(1, 'Medic')
      this.getClassData(2, 'Pilot')
      this.getClassData(3, 'Recon')
      this.getClassData(4, 'Support')
      this.getClassData(5, 'Tanker')
    },
    goBack () {
      this.$router.push({name: 'UserSearchView'})
    },
    convertMainInfosData () {
      this.playerMainInfos[0].value = this.playerData.data.segments[0].stats.kdRatio.displayValue
      this.playerMainInfos[1].value = this.playerData.data.segments[0].stats.killsPerMinute.displayValue
      this.playerMainInfos[2].value = this.playerData.data.segments[0].stats.wlPercentage.displayValue
      this.playerMainInfos[3].value = this.playerData.data.segments[0].stats.scorePerMinute.displayValue
    },
    getClassData (id, type) {
      var tempClassInfos = this.playerData.data.segments
      for (var i = 0; i < 16; i++) {
        if (tempClassInfos[i].metadata.name === type) {
          this.playerClassInfos[id].time = this.convertTime(tempClassInfos[i].stats.timePlayed.displayValue)
          this.playerClassInfos[id].rank = tempClassInfos[i].stats.rank.displayValue
          this.playerClassInfos[id].score = tempClassInfos[i].stats.score.displayValue
          this.playerClassInfos[id].spm = tempClassInfos[i].stats.scorePerMinute.displayValue
          this.playerClassInfos[id].kills = tempClassInfos[i].stats.kills.displayValue
          this.playerClassInfos[id].kpm = tempClassInfos[i].stats.killsPerMinute.displayValue
          this.playerClassInfos[id].kd = tempClassInfos[i].stats.kdRatio.displayValue
          break
        } else continue
      }
    },
    convertTime (time) {
      var tempStr = ''
      tempStr = time
      return tempStr.replace('d', '天').replace('h', '小时').replace('m', '分钟').replace('s', '秒').replace(/ /g, '')
    },
    convertOverviewInfo () {
      var temp = this.playerData.data.segments[0].stats
      var overview = this.playerInfoOverview
      var totalKills = 0
      var totalHeadshot = 0

      overview.spm = temp.scorePerMinute.displayValue
      overview.spmRank = temp.scorePerMinute.percentile
      overview.kd = temp.kdRatio.displayValue
      overview.kdRank = temp.kdRatio.percentile
      overview.kills = temp.kills.displayValue
      totalKills = temp.kills.value
      overview.killsRank = temp.kills.percentile
      overview.kpm = temp.killsPerMinute.displayValue
      overview.kpmRank = temp.killsPerMinute.percentile
      overview.killStreak = temp.killStreak.displayValue
      overview.killStreakRank = temp.killStreak.percentile
      overview.headShot = temp.headshots.displayValue
      totalHeadshot = temp.headshots.value
      overview.headShotRank = temp.headshots.percentile
      overview.headShotPer = ((totalHeadshot / totalKills) * 100).toFixed(1)
      overview.longestHeadShot = temp.longestHeadshot.displayValue
      overview.longestHeadShotRank = temp.longestHeadshot.percentile
      overview.winPercentage = temp.wlPercentage.displayValue
      overview.winPerRank = temp.wlPercentage.percentile
      overview.wins = temp.wins.displayValue
      overview.winsRank = temp.wins.percentile
      overview.deaths = temp.deaths.displayValue
      overview.deathsRank = temp.deaths.percentile
      overview.assists = temp.assists.displayValue
      overview.assistsRank = temp.assists.percentile
      overview.dmg = temp.damage.displayValue
      overview.dmgRank = temp.damage.percentile
      overview.heals = temp.heals.displayValue
      overview.healsRank = temp.heals.percentile
      overview.revives = temp.revives.displayValue
      overview.revivesRank = temp.revives.percentile
      overview.resupplies = temp.resupplies.displayValue
      overview.resuppliesRank = temp.resupplies.percentile
    },
    raiseError (titleStr, msgStr) {
      this.$notify.error({
        title: titleStr,
        message: msgStr
      })
    },
    httpGetGameReports (params) {
      var thisView = this
      var xhr = new XMLHttpRequest()
      xhr.open('get', params.url)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var res = xhr.responseText
          thisView.gameReports = JSON.parse(res).data.reports
          thisView.gameReportsToken = JSON.parse(res).data.paginationToken
          clearTimeout(timeout)
          thisView.gameReportsTabPaneLoading = false
        } else if (xhr.status === 404) {
          thisView.gameReportsTabPaneLoading = false
          thisView.raiseError('查询失败', '未找到用户的游戏记录')
          clearTimeout(timeout)
        }
      }
      var timeout = setTimeout(function () {
        xhr.abort()
        thisView.raiseError('查询失败', '连接超时')
        thisView.gameReportsTabPaneLoading = false
      }, 45 * 1000)
      xhr.send()
    },
    httpGetNextGameReports (params) {
      var thisView = this
      var xhr = new XMLHttpRequest()
      if (params.data) {
        params.url += '?' + params.data
      }
      xhr.open('get', params.url)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var res = xhr.responseText
          thisView.gameReports = thisView.gameReports.concat(JSON.parse(res).data.reports)
          thisView.gameReportsToken = JSON.parse(res).data.paginationToken
          clearTimeout(timeout)
        }
        thisView.gameReportsTabPaneLoading = false
      }
      var timeout = setTimeout(function () {
        xhr.abort()
        thisView.raiseError('查询失败', '连接超时')
        thisView.gameReportsTabPaneLoading = false
      }, 45 * 1000)
      xhr.send()
    },
    httpGetGameWholeInfo (params, id) {
      var storeData = this.$store
      var thisView = this
      var xhr = new XMLHttpRequest()
      // console.log('before open')
      xhr.open('get', params.url)
      // console.log('after open')
      xhr.onreadystatechange = function () {
        // console.log('onreadystate')
        if (xhr.readyState === 4 && xhr.status === 200) {
          // console.log('success')
          var res = xhr.responseText
          thisView.gameReportsTabPaneLoading = false
          storeData.commit('setLastPageName', 'PlayerStatusInfoView')
          storeData.commit('setGameWholeInfo', res)
          clearTimeout(timeout)
          thisView.$router.push({name: 'PlayerGameInfo', params: {gameReportId: id}})
        } else if (xhr.status === 404) {
          thisView.gameReportsTabPaneLoading = false
          thisView.raiseError('查询失败', '未找到用户的游戏记录')
          clearTimeout(timeout)
        }
      }
      var timeout = setTimeout(function () {
        xhr.abort()
        thisView.raiseError('查询失败', '连接超时')
        thisView.gameReportsTabPaneLoading = false
      }, 45 * 1000)
      xhr.send()
    },
    httpGetWeaponOrVehicleInfo (params, infoType, errorMsg) {
      var thisView = this
      var xhr = new XMLHttpRequest()
      xhr.open('get', params.url)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var res = xhr.responseText
          thisView.$store.commit(infoType, res)
          clearTimeout(timeout)
          if (infoType === 'setWeaponInfo') {
            thisView.weaponsInfoLoading = false
            // console.log(thisView.$store.getters.getWeaponInfo.data.children)
            thisView.weaponsInfo = thisView.$store.getters.getWeaponInfo.data.children.sort(thisView.weaponTimeSort).reverse()
          }
          if (infoType === 'setVehicleInfo') {
            thisView.vehicleInfoLoading = false
            thisView.vehicleInfo = thisView.$store.getters.getVehicleInfo.data.children.sort(thisView.vehicleTimeSort).reverse()
          }
        } else if (xhr.status === 404) {
          clearTimeout(timeout)
          if (infoType === 'setWeaponInfo') thisView.weaponsInfoLoading = false
          if (infoType === 'setVehicleInfo') thisView.vehicleInfoLoading = false
          thisView.raiseError('查询失败', errorMsg)
        }
      }
      var timeout = setTimeout(function () {
        xhr.abort()
        thisView.raiseError('查询失败', '连接超时')
        if (infoType === 'setWeaponInfo') thisView.weaponsInfoLoading = false
        if (infoType === 'setVehicleInfo') thisView.vehicleInfoLoading = false
      }, 45 * 1000)
      xhr.send()
    },
    eltabClick (name, title) {
      console.log(name)
      this.setTabActive(name)
      if (name === 2) {
        this.banRefresh = true
        this.getAndSetGameReports()
      } else if (name === 3) {
        this.banRefresh = true
        this.getWeaponsInfo()
      } else if (name === 4) {
        this.banRefresh = true
        this.getVehiclesInfo()
      } else {
        this.banRefresh = false
      }
    },
    getAndSetGameReports () {
      this.gameReportsTabPaneLoading = true
      var tempStore = this.$store
      this.httpGetGameReports({url: 'https://api.tracker.gg/api/v1/bfv/gamereports/' + tempStore.getters.getPlatform + '/latest/' + tempStore.getters.getUsername})
      // console.log(this.gameReportsToken)
    },
    load () {
      this.gameReportsTabPaneLoading = true
      var tempStore = this.$store
      this.httpGetNextGameReports({url: 'https://api.tracker.gg/api/v1/bfv/gamereports/' + tempStore.getters.getPlatform + '/latest/' + tempStore.getters.getUsername, data: 'paginationToken=' + this.gameReportsToken})
    },
    handleClick (row) {
      this.gameReportsTabPaneLoading = true
      var tempStore = this.$store
      this.httpGetGameWholeInfo({url: 'https://api.tracker.gg/api/v1/bfv/gamereports/' + tempStore.getters.getPlatform + '/direct/' + row.gameReportId}, row.gameReportId)
    },
    getWeaponsInfo () {
      var tempStore = this.$store
      this.weaponsInfoLoading = true
      this.httpGetWeaponOrVehicleInfo({url: 'https://api.tracker.gg/api/v1/bfv/profile/' + tempStore.getters.getPlatform + '/' + tempStore.getters.getUsername + '/weapons'}, 'setWeaponInfo', '未找到用户的武器使用记录')
    },
    getVehiclesInfo () {
      var tempStore = this.$store
      this.vehicleInfoLoading = true
      this.httpGetWeaponOrVehicleInfo({url: 'https://api.tracker.gg/api/v1/bfv/profile/' + tempStore.getters.getPlatform + '/' + tempStore.getters.getUsername + '/vehicles'}, 'setVehicleInfo', '未找到用户的载具使用记录')
    },
    weaponTimeFormatter (row, col) {
      return timeENGToCN(row.stats[2].displayValue)
    },
    weaponTimeSort (obj1, obj2) {
      var val1 = obj1.stats[2].value
      var val2 = obj2.stats[2].value
      return val1 - val2
    },
    vehicleTimeSort (obj1, obj2) {
      var val1 = obj1.stats[2].value
      var val2 = obj2.stats[2].value
      return val1 - val2
    },
    vehicleTimeFormatter (row, col) {
      return timeENGToCN(row.stats[2].displayValue)
    },
    weaponKillsFormatter (row, col) {
      return row.stats[0].displayValue
    },
    weaponKillsSort (obj1, obj2) {
      var val1 = obj1.stats[0].value
      var val2 = obj2.stats[0].value
      return val1 - val2
    },
    vehicleKillsFormatter (row, col) {
      return row.stats[0].displayValue
    },
    vehicleKillsSort (obj1, obj2) {
      var val1 = obj1.stats[0].value
      var val2 = obj2.stats[0].value
      return val1 - val2
    },
    filterHandler (value, row, column) {
      const rowWeaponType = row.metadata.categoryKey
      return rowWeaponType === value
    },
    vehicleFilterHandler (value, row, column) {
      const rowVehicleType = row.metadata.categoryKey
      return rowVehicleType === value
    },
    onRefresh () {
      this.updateData()
      this.isLoading = false
    },
    getTabActive () {
      this.vanTabActive = this.$store.getters.getTabActive
      console.log('get:' + this.vanTabActive)
    },
    setTabActive (index) {
      this.$store.commit('setTabActive', index)
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
    'convertWeaponName': function (value) {
      return weaponNameConvert(value)
    },
    'convertGadgetName': function (value) {
      return gadgetNameConvert(value)
    },
    'convertTimeLan': function (value) {
      return timeENGToCN(value)
    },
    'convertVehicleName': function (value) {
      return vehicleNameConvert(value)
    }
  },
  watch: {
    weaponType: function (newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.playerStatus-wrap {
  background-color #ffffff
  min-height 100vh
  .pageHeader {
    padding-top 5px
  }

  .topDivider {
    margin 5px 0 10px 0
  }
  .playerStatusRow-wrap {
    margin-top 20px
    margin-bottom 20px

    .playerMainInfoCol {
      .plaayername {
        margin 2px 0 2px 0
        font-size 20px
      }
      .playerrank {
        margin 2px 0 2px 0
        font-size 14px
      }
      .playerTime {
        margin 2px 0 2px 0
        font-size 14px
      }
    }
  }
  .mainInfoRow {
    .el-carousel {
      .el-carousel__item h3{
        text-align center
      }
      .el-carousel__item:nth-child(2n) {
        background-color #99a9bf
      }
      .el-carousel__item:nth-child(2n+1) {
        background-color #d3dce6
      }
    }
  }
  .statusMainInfo {
    padding-left 10px
    .el-form-item {
      margin 0 0 0 0
    }
  }
  .classInfoTable {
    width 100%
    .demo-table-expand {
      .classFormLabel {
        color #409EFF
      }
      .el-form-item {
        margin-right 0
        margin-bottom 0
        width 100%
      }
    }
  }
  .weaponInfoForm {
    .el-form-item {
      margin 0 0 0 0
    }
  }
  .vehicleInfoForm {
    .el-form-item {
      margin 0 0 0 0
    }
  }
  // .weaponTypeSelect {
  //   margin-bottom 10px
  // }
}
</style>
