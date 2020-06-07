<template>
  <div class="playerStatus-wrap">
    <el-page-header @back="goBack"
                    content="战绩"
                    class="pageHeader"></el-page-header>
    <van-pull-refresh v-model="isLoading"
                      @refresh="onRefresh"
                      success-text="刷新成功"
                      disabled>
      <el-row type="flex"
              justify="center">
        <el-col :span="24"
                style="text-align: center;">
          <span style="font-size: 12px">更新于{{lastUpdateTime}}</span>
          <el-button type="text"
                     size="mini"
                     @click="onRefresh">刷新</el-button>
        </el-col>
      </el-row>
      <el-row class="playerStatusRow-wrap"
              type="flex"
              justify="center">
        <el-col :span="24">
          <el-row type="flex"
                  justify="center">
            <el-col :span="5">
              <el-avatar :src="avatarSrc"
                         :size="avatarSize"></el-avatar>
            </el-col>
            <el-col :span="10"
                    class="playerMainInfoCol">
              <el-row type="flex"
                      justify="center">
                <el-col :span="24"
                        class="playername">{{playerID}}</el-col>
              </el-row>
              <el-row type="flex"
                      justify="center">
                <el-col :span="24"
                        class="playerTime">游戏内时长:&nbsp;{{gameTimeByHours}}小时</el-col>
              </el-row>
              <el-row type="flex"
                      justify="center">
                <el-col :span="24"
                        class="playerrank">
                  <el-image style="width: 12px; height: 12px"
                            :src="playerRankImg"
                            fit="fill">
                    <div slot="error"
                         class="image-slot">
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
      <el-row type="flex"
              class="chartsLinkBtn-wrap"
              justify="center">
        <el-col :span="24"
                class="chartsLinkBtn">
          <van-button type="warning"
                      plain
                      hairline
                      size="small"
                      @click="goToChartsView">查看近期战绩统计图</van-button>
        </el-col>
      </el-row>
      <el-row type="flex"
              justify="center"
              class="hackerCheckRow">
        <el-col :span="24">
          <div class="hackerCheckCol">
            <span style="color: #409EFF;"
                  v-if="mayBeHacker === 'isChecking'">
              <i class="el-icon-loading"></i>正在检测是否疑似外挂...
            </span>
            <span style="color: #F56C6C;"
                  @click="showHackerCheckRes"
                  v-if="mayBeHacker === 'isHacker'">
              <i class="el-icon-warning-outline"></i>疑似外挂 点击查看详情
            </span>
            <span style="color: #67C23A;"
                  @click="showHackerCheckMethod"
                  v-if="mayBeHacker === 'isNotHacker'">
              <i class="el-icon-circle-check"></i>未发现外挂迹象 有疑问？
            </span>
            <span style="color: #E6A23C;"
                  v-if="mayBeHacker === 'isTimeout'">
              <i class="el-icon-warning-outline"></i>检测失败 未能获取玩家数据
            </span>
          </div>
        </el-col>
      </el-row>
      <van-tabs @click="eltabClick"
                v-loading="tabLoading"
                stretch
                v-model="vanTabActive">
        <van-tab title="战绩概览">
          <div class="statusOverview-Wrap">
            <div class="overviewData">
              <span class="statusDataType">每分钟得分</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.spm}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.spmRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">击杀死亡比</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.kd}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.kdRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">击杀数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.kills}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.killsRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">每分钟击杀数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.kpm}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.kpmRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">最高连杀数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.killStreak}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.killStreakRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">爆头数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.headShot}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.headShotRank}}%</span>
              <el-tag v-if="playerInfoOverview.headShotPer <= 30"
                      type="primary"
                      size="mini">爆头率{{playerInfoOverview.headShotPer}}%</el-tag>
              <el-tag v-else-if="playerInfoOverview.headShotPer > 30 && playerInfoOverview.headShotPer < 50"
                      type="warning"
                      size="mini">爆头率{{playerInfoOverview.headShotPer}}%</el-tag>
              <el-tag v-else-if="playerInfoOverview.headShotPer >= 50"
                      type="danger"
                      size="mini">爆头率{{playerInfoOverview.headShotPer}}%</el-tag>
            </div>
            <div class="overviewData">
              <span class="statusDataType">最远爆头距离</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.longestHeadShot}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.longestHeadShotRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">胜率</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.winPercentage}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.winPerRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">获胜次数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.wins}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.winsRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">死亡数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.deaths}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.deathsRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">助攻数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.assists}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.assistsRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">总伤害量</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.dmg}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.dmgRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">总治疗量</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.heals}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.healsRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">救起队友数量</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.revives}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.revivesRank}}%</span>
            </div>
            <div class="overviewData">
              <span class="statusDataType">重新补给次数</span>
              <span class="statusData">&nbsp;{{playerInfoOverview.resupplies}}&nbsp;</span>
              <span class="statusDataRank">>{{playerInfoOverview.resuppliesRank}}%</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="兵种信息">
          <el-table :data="playerClassInfos"
                    style="width: 100%"
                    class="classInfoTable"
                    border
                    stripe>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form :label-position="labelPosition"
                         class="demo-table-expand"
                         size="mini">
                  <el-form-item>
                    <el-image :src="props.row.imageUrl"
                              style="width: 50px; height: 50px"
                              fit="fill"></el-image>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">时长</template>
                    <span>{{props.row.time}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">兵种等级</template>
                    <span>{{props.row.rank}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">总得分</template>
                    <span>{{props.row.score}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">SPM</template>
                    <span>{{props.row.spm}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">击杀数</template>
                    <span>{{props.row.kills}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">KPM</template>
                    <span>{{props.row.kpm}}</span>
                  </el-form-item>
                  <el-form-item>
                    <template slot="label"
                              class="classFormLabel">K/D</template>
                    <span>{{props.row.kd}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="兵种"
                             width="55px">
              <template slot-scope="scope">
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column label="等级"
                             prop="rank"
                             width="55px"></el-table-column>
            <el-table-column label="时长"
                             prop="time"></el-table-column>
          </el-table>
        </van-tab>
        <van-tab title="游戏记录"
                 class="gameReportPane">
          <el-table :data="gameReports"
                    v-loading="gameReportsTabPaneLoading"
                    size="mini"
                    border
                    v-el-table-infinite-scroll="load"
                    max-height="100%"
                    stripe>
            <el-table-column label="操作"
                             width="55px">
              <template slot-scope="scope">
                <el-button type="text"
                           size="mini"
                           @click="handleClick(scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column label="服务器信息"
                             width="200">
              <template slot-scope="scope">
                <div>
                  <el-row type="flex"
                          justify="center">
                    <el-col :span="24">
                      <el-tag type="success"
                              size="mini">{{scope.row.modeKey | convertModeName}}</el-tag>
                      <span style="font-weight: bold;">{{scope.row.mapKey | convertMapName}}</span>
                    </el-col>
                  </el-row>
                  <el-row type="flex"
                          justify="center">
                    <el-col :span="24">
                      <span>{{scope.row.serverName}}</span>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="时间"
                             width="180px">
              <template slot-scope="scope">
                <span>{{scope.row.timestamp | convertTimestamp}}</span>
              </template>
            </el-table-column>
          </el-table>
        </van-tab>
        <van-tab title="武器信息">
          <Loading v-if="weaponsInfoLoading"></Loading>
          <div class="weaponList"
               v-if="!weaponsInfoLoading">
            <div class="weaponData"
                 v-for="(weaponData, index) in this.weaponsInfo"
                 :key="index">
              <el-row type="flex">
                <el-col :span="24">
                  <div class="weaponMainInfo">
                    <span class="weaponName">{{weaponData.metadata.name | convertWeaponName | convertGadgetName}}</span>
                    <el-tag type="success"
                            size="mini"
                            plain>
                      <span class="weaponKills">{{weaponData.stats[0].value}}杀</span>
                    </el-tag>
                    <el-tag type="warning"
                            size='mini'
                            plain>
                      <i class="el-icon-star-on"></i>
                      <span class="weaponStars">{{weaponData.stats[0].value | killStarsConvert}}</span>
                    </el-tag>
                    <el-tag type="info"
                            size="mini"
                            plain>
                      <span class="usingTime">{{(weaponData.stats[2].value / 60 / 60).toFixed(2)}}小时</span>
                    </el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row class="weaponInfoRow1"
                      type="flex"
                      justify="center">
                <el-col :span="8">
                  <div class="weaponInfoType">
                    爆头数：<span class="weaponHSNum">{{weaponData.stats[6].value}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="weaponInfoType">
                    爆头率：
                    <span class="weaponHSRateNormal"
                          v-if="(weaponData.stats[6].value / weaponData.stats[0].value) < 0.3">{{((weaponData.stats[6].value / weaponData.stats[0].value) * 100).toFixed(1)}}%</span>
                    <span class="weaponHSRateProblem"
                          v-if="(weaponData.stats[6].value / weaponData.stats[0].value) >= 0.3 && (weaponData.stats[6].value / weaponData.stats[0].value) < 0.5">{{((weaponData.stats[6].value / weaponData.stats[0].value) * 100).toFixed(1)}}%</span>
                    <span class="weaponHSRateHigh"
                          v-if="(weaponData.stats[6].value / weaponData.stats[0].value) >= 0.5">{{((weaponData.stats[6].value / weaponData.stats[0].value) * 100).toFixed(1)}}%</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="weaponInfoType">
                    每分钟击杀：<span class="wepaonKpmNum">{{(weaponData.stats[1].value).toFixed(2)}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row class="weaponInfoRow2"
                      type="flex"
                      justify="center">
                <el-col :span="8">
                  <div class="weaponInfoType">
                    开火数：<span class="weaponFireNum">{{weaponData.stats[3].value}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="weaponInfoType">
                    命中数：<span class="weaponHitNum">{{weaponData.stats[4].value}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="weaponInfoType">
                    命中率：
                    <span class="weaponHitRateNormal"
                          v-if="weaponData.stats[5].value < 30">{{weaponData.stats[5].displayValue}}%</span>
                    <span class="weaponHitRateProblem"
                          v-if="weaponData.stats[5].value >= 30 && weaponData.stats[5].value < 50">{{weaponData.stats[5].displayValue}}%</span>
                    <span class="weaponHitRateHigh"
                          v-if="weaponData.stats[5].value >= 50">{{weaponData.stats[5].displayValue}}%</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </van-tab>
        <van-tab title="载具信息">
          <Loading v-if="vehicleInfoLoading"></Loading>
          <div class="vehicleList"
               v-if="!vehicleInfoLoading">
            <div class="vehicleData"
                 v-for="(vehicleData, index) in vehicleInfo"
                 :key="index">
              <el-row type="flex"
                      justify="center">
                <el-col :span="24">
                  <div class="vehicleMainInfo">
                    <span class="vehicleName">{{vehicleData.metadata.name | convertVehicleName}}</span>
                    <el-tag type="success"
                            size="mini"
                            plain>{{vehicleData.stats[0].value}}杀</el-tag>
                    <el-tag type="warning"
                            size="mini"
                            plain>
                      <i class="el-icon-star-on"></i>
                      {{vehicleData.stats[0].value | killStarsConvert}}</el-tag>
                    <el-tag type="info"
                            size="mini"
                            plain>{{(vehicleData.stats[2].value / 60 / 60).toFixed(2)}}小时</el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row class="vehicleInfoRow"
                      type="flex"
                      justify="center">
                <el-col :span="8">
                  <div class="vehicleInfoType">
                    击杀数：<span class="vehicleKillsNum">{{vehicleData.stats[0].value}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="vehicleInfoType">
                    摧毁数：<span class="vehicleDesNum">{{vehicleData.stats[3].value}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="vehicleInfoType">
                    每分钟击杀：<span class="vehicleKpmNum">{{(vehicleData.stats[1].value).toFixed(2)}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <van-popup v-model="showIsHackerPopup"
               position="bottom"
               closeable
               close-icon-position="top-left">
      <div class="inIsHackerPopup">
        <el-row class="instructionRow"
                type="flex"
                justify="center">
          <el-col :span="24">
            <p>结果仅供参考</p>
            <p style="color: #F56C6C;">不推荐作为实锤或未开挂的证据！</p>
          </el-col>
        </el-row>
        <el-divider>检测依据</el-divider>
        <div class="isNotHackerRow">
          <el-row>
            <el-col :span="24">
              <p>
                根据超过100击杀的武器进行计算：1、针对武器类型为：
                <span style="font-weight: bolder">突击步枪、冲锋枪、固定式机枪、轻机枪、手枪型卡宾枪和手枪</span>。
                上述武器中如果爆头率高于50%或爆头率高于35%的武器数量超过30%将会被判定为外挂。
                2、针对武器类型为：
                <span style="font-weight: bolder">手动枪机卡宾枪、单动式步枪</span>。上述武器中如果爆头率高于80%且KPM高于2的武器数量超过50%将会被判定为外挂
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="checkRes">
          <el-divider>检测结果</el-divider>
          <el-row class="checkResRow"
                  type="flex"
                  justify="center">
            <el-col :span="24">
              <span>
                超过百杀的非栓狙武器数量：
                <span style="color: #409EFF">{{over100KillsWeaponCount}}</span>
              </span>
            </el-col>
          </el-row>
          <el-row class="checkResRow"
                  type="flex"
                  justify="center">
            <el-col :span="24">
              <span>
                其中爆头率高于35%的武器数量：
                <span style="color: #409EFF">{{overSetHeadshotWeaponCount}}</span>
              </span>
            </el-col>
          </el-row>
          <el-row class="checkResRow"
                  type="flex"
                  justify="center">
            <el-col :span="24">
              <span>
                其中爆头率高于50%的武器数量：
                <span style="color: #409EFF">{{over50HeadshotWeaponCount}}</span>
              </span>
            </el-col>
          </el-row>
          <el-row class="checkResRow"
                  type="flex"
                  justify="center">
            <el-col :span="24">
              <span>
                超过百杀的栓狙武器数量：
                <span style="color: #409EFF">{{over100KillsSnipersCount}}</span>
              </span>
            </el-col>
          </el-row>
          <el-row class="checkResRow"
                  type="flex"
                  justify="center">
            <el-col :span="24">
              <span>
                其中爆头率高于80%且KPM高于2的数量：
                <span style="color: #409EFF">{{over80HSAnd2KpmCount}}</span>
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { timestampToTime, mapCodeToCN, modeNameToCN, weaponNameConvert, gadgetNameConvert, timeENGToCN, vehicleNameConvert } from '../js/convertPackage.js'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import { httpGet } from '../js/api'
import { checkIsHacker } from '../js/hackerCheckFunctions.js'

export default {
  name: 'PlayerStatusInfoView',
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  data () {
    return {
      showIsHackerPopup: false,
      mayBeHacker: 'isChecking',
      gameTimeByHours: 0,
      vanTabActive: 0,
      banRefresh: false,
      isLoading: false,
      tabLoading: false,
      labelPosition: 'right',
      playerData: {},
      avatarSize: 64,
      avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      lastUpdateTime: '无数据',
      playerID: 'unknown player',
      playerRank: 'Lv.0',
      playerRankImg: '#',
      playerRankPercentage: '(0%)',
      playerTime: '00天00小时00分钟',
      playerClassInfos: [
        { id: 0, type: '突击', imageUrl: require('../assets/assu.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%' },
        { id: 1, type: '医疗', imageUrl: require('../assets/mediv.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%' },
        { id: 2, type: '飞机', imageUrl: require('../assets/ju88a.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%' },
        { id: 3, type: '侦察', imageUrl: require('../assets/recon.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%' },
        { id: 4, type: '支援', imageUrl: require('../assets/support.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%' },
        { id: 5, type: '坦克', imageUrl: require('../assets/tanker.png'), time: '00天00小时00分钟', rank: '0', score: '0', scoreRank: '0%', spm: '0.0', spmRank: '0%', kills: '0', killsRank: '0%', kpm: '0.0', kpmRank: '0%', kd: '0', kdRank: '0%' }
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
      over100KillsWeaponCount: 0,
      over50HeadshotWeaponCount: 0,
      overSetHeadshotWeaponCount: 0,
      over100KillsSnipersCount: 0,
      over80HSAnd2KpmCount: 0
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
      this.gameTimeByHours = ((this.playerData.data.segments[0].stats.timePlayed.value / 60) / 60).toFixed(0)
      this.getLastUpdateTime()
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
      window.history.back()
    },
    getLastUpdateTime () {
      var lastUpdateDate = new Date(this.playerData.data.metadata.lastUpdated.displayValue)
      this.lastUpdateTime = lastUpdateDate.toLocaleString()
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
    getAndSetGameReports () {
      this.gameReportsTabPaneLoading = true
      var tempStore = this.$store
      var thisView = this
      var params = {
        url: 'https://api.tracker.gg/api/v1/bfv/gamereports/' + tempStore.getters.getPlatform + '/latest/' + tempStore.getters.getUsername
      }
      var onSuccess = function (res) {
        thisView.gameReports = JSON.parse(res).data.reports
        thisView.gameReportsToken = JSON.parse(res).data.paginationToken
        thisView.gameReportsTabPaneLoading = false
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
    load () {
      this.gameReportsTabPaneLoading = true
      var tempStore = this.$store
      var thisView = this
      var params = {
        url: 'https://api.tracker.gg/api/v1/bfv/gamereports/' + tempStore.getters.getPlatform + '/latest/' + tempStore.getters.getUsername,
        data: 'paginationToken=' + this.gameReportsToken
      }
      var onSuccess = function (res) {
        thisView.gameReports = thisView.gameReports.concat(JSON.parse(res).data.reports)
        thisView.gameReportsToken = JSON.parse(res).data.paginationToken
        thisView.gameReportsTabPaneLoading = false
      }
      var onError = function () {
        thisView.gameReportsTabPaneLoading = false
        thisView.raiseError('查询失败', '未找到更多游戏记录')
      }
      var onTimeOut = function () {
        thisView.raiseError('查询失败', '连接超时')
        thisView.gameReportsTabPaneLoading = false
      }
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    handleClick (row) {
      var _this = this
      var id = row.gameReportId
      this.$router.push({
        path: '/PlayerGameInfo',
        query: {
          id: id,
          platform: _this.$store.getters.getPlatform
        }
      })
    },
    getWeaponsInfo () {
      var tempStore = this.$store
      var thisView = this
      var params = {
        url: 'https://api.tracker.gg/api/v1/bfv/profile/' + tempStore.getters.getPlatform + '/' + tempStore.getters.getUsername + '/weapons'
      }
      this.weaponsInfoLoading = true
      var onSuccess = function (res) {
        thisView.$store.commit('setWeaponInfo', res)
        thisView.weaponsInfoLoading = false
        thisView.weaponsInfo = thisView.$store.getters.getWeaponInfo.data.children.sort(thisView.weaponTimeSort).reverse()
        thisView.hackerChecker()
      }
      var onError = function () {
        thisView.weaponsInfoLoading = false
        thisView.raiseError('查询失败', '未找到用户的武器使用记录')
        thisView.mayBeHacker = 'isTimeout'
      }
      var onTimeOut = function () {
        thisView.raiseError('查询失败', '连接超时')
        thisView.weaponsInfoLoading = false
        thisView.mayBeHacker = 'isTimeout'
      }
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    getVehiclesInfo () {
      var tempStore = this.$store
      var thisView = this
      this.vehicleInfoLoading = true
      var params = {
        url: 'https://api.tracker.gg/api/v1/bfv/profile/' + tempStore.getters.getPlatform + '/' + tempStore.getters.getUsername + '/vehicles'
      }
      var onSuccess = function (res) {
        thisView.$store.commit('setVehicleInfo', res)
        thisView.vehicleInfoLoading = false
        thisView.vehicleInfo = thisView.$store.getters.getVehicleInfo.data.children.sort(thisView.vehicleTimeSort).reverse()
      }
      var onError = function () {
        thisView.vehicleInfoLoading = false
        thisView.raiseError('查询失败', '未找到用户的载具使用记录')
      }
      var onTimeOut = function () {
        thisView.raiseError('查询失败', '连接超时')
        thisView.vehicleInfoLoading = false
      }
      httpGet(params, onSuccess, onError, onTimeOut, 45000)
    },
    eltabClick (name, title) {
      this.setTabActive(name)
      if (name === 2) {
        this.banRefresh = true
        this.getAndSetGameReports()
      } else {
        this.banRefresh = false
      }
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
    onRefresh () {
      this.updateData()
      this.$toast('数据已刷新')
    },
    getTabActive () {
      this.vanTabActive = this.$store.getters.getTabActive
    },
    setTabActive (index) {
      this.$store.commit('setTabActive', index)
    },
    goToChartsView () {
      this.$router.push({ name: 'ChartsView' })
    },
    showHackerCheckRes () {
      this.showIsHackerPopup = true
    },
    showHackerCheckMethod () {
      this.showIsHackerPopup = true
    },
    hackerChecker () {
      var res1 = checkIsHacker(this.weaponsInfo, 0.3, 0.35, 0.5, 0.8, 2)
      var res2 = checkIsHacker(this.weaponsInfo, 0, 0.5, 0.5, 0.8, 2)
      this.over100KillsWeaponCount = res1[2]
      this.overSetHeadshotWeaponCount = res1[1]
      this.over50HeadshotWeaponCount = res2[1]
      this.over100KillsSnipersCount = res1[3]
      this.over80HSAnd2KpmCount = res1[4]
      if (res1[0] || res2[0] || res1[5]) this.mayBeHacker = 'isHacker'
      else this.mayBeHacker = 'isNotHacker'
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
    },
    'killStarsConvert': function (value) {
      // eslint-disable-next-line radix
      return parseInt(value / 100)
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
    margin-bottom 10px
  }
  .playerStatusRow-wrap {
    margin-top 20px
    margin-bottom 5px
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
  .chartsLinkBtn-wrap {
    text-align center
    margin 2px 0px 5px 0px
  }
  .hackerCheckRow {
    margin 10px 0px 10px 0px
    text-align center
    .hackerCheckCol {
      font-size 12px
    }
  }
  .mainInfoRow {
    .el-carousel {
      .el-carousel__item h3 {
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
  .statusOverview-Wrap {
    margin 20px 0 0 20px
    .overviewData {
      margin-top 15px
      .statusDataType {
        font-size 14px
      }
      .statusData {
        font-size 14px
        color #409EFF
      }
      .statusDataRank {
        font-size 12px
        font-weight lighter
      }
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
  .weaponList {
    .weaponData {
      box-shadow 1px 1px 1px #EBEEF5
      padding 8px 10px 8px 10px
      .weaponMainInfo {
        .weaponName {
          font-size 14px
          font-weight bold
        }
      }
      .weaponInfoRow1 {
        margin 5px 0 0 0
        justify-content center
        .weaponInfoType {
          font-size 12px
          color #909399
          .weaponHSNum, .wepaonKpmNum, .weaponHSRateNormal {
            color #409EFF
          }
          .weaponHSRateProblem {
            color #E6A23C
          }
          .weaponHSRateHigh {
            color #F56C6C
          }
        }
      }
      .weaponInfoRow2 {
        margin 5px 0 0 0
        justify-content center
        .weaponInfoType {
          font-size 12px
          color #909399
          .weaponFireNum, .weaponHitNum, .weaponHitRateNormal {
            color #409EFF
          }
          .weaponHitRateProblem {
            color #E6A23C
          }
          .weaponHitRateHigh {
            color #F56C6C
          }
        }
      }
    }
  }
  .vehicleList {
    .vehicleData {
      box-shadow 1px 1px 1px #EBEEF5
      padding 8px 10px 8px 10px
      .vehicleMainInfo {
        .vehicleName {
          font-size 14px
          font-weight bold
        }
      }
      .vehicleInfoRow {
        margin 5px 0 0 0
        justify-content center
        .vehicleInfoType {
          font-size 12px
          color #909399
          .vehicleKillsNum, .vehicleKpmNum, .vehicleDesNum {
            color #409EFF
          }
        }
      }
    }
  }
  // .vehicleInfoForm {
  // .el-form-item {
  // margin 0 0 0 0
  // }
  // }
  .inIsHackerPopup {
    margin 10px 10px 10px 10px
    .el-divier {
      margin 2px 10px 2px 10px
    }
    .instructionRow {
      text-align center
      font-size 14px
    }
    .isNotHackerRow {
      font-size 14px
    }
    .checkRes {
      .checkResRow {
        font-size 14px
      }
    }
  }
}
</style>
