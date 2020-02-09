function timestampToTime (timestamp) {
  var date = new Date(timestamp * 1000)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes()
  return Y + M + D + h + m
} // 时间戳转换函数
function mapCodeToCN (mapKey) {
  switch (mapKey) {
    case 'MP_Jungle':
      return '所罗门群岛'
    case 'MP_Halfaya':
      return '岩漠'
    case 'MP_Hannut':
      return '战车风暴'
    case 'MP_SandAndSea':
      return '艾尔舒丹'
    case 'MP_Rotterdam':
      return '鹿特丹'
    case 'MP_Foxhunt':
      return '小型机场'
    case 'MP_TropicIslands':
      return '太平洋风暴'
    case 'MP_Escaut':
      return '扭曲钢铁'
    case 'MP_GOps_Chapter2_Arras':
      return '阿拉斯(大行动)'
    case 'MP_Devastation':
      return '毁灭'
    case 'MP_IwoJima':
      return '硫磺岛'
    case 'MP_Arras':
      return '阿拉斯'
    case 'MP_Bunker':
      return '地下行动'
    case 'MP_ArcticFjord':
      return '纳尔维克'
    case 'MP_Kalamas':
      return '马瑞塔'
    case 'MP_Crete':
      return '水星'
    case 'MP_WakeIsland':
      return '威客岛'
    case 'MP_ArcticFjell':
      return '菲耶尔652'
    case 'MP_WE_Grind_Rotterdam':
      return '鹿特丹(鏖战)'
    case 'MP_WE_Grind_Escaut':
      return '扭曲钢铁(鏖战)'
    case 'MP_WE_Grind_Devastation':
      return '毁灭(鏖战)'
    default:
      return mapKey
  }
} // 地图名称转换函数
function modeNameToCN (modeKey) {
  switch (modeKey) {
    case 'Breakthrough0':
      return '突破'
    case 'Conquest0':
      return '征服'
    case 'Airborne0':
      return '空降'
    case 'RushLarge0':
      return '突袭'
    case 'Frontlines0':
      return '前线'
    case 'TeamDeathMatch0':
      return '团队死斗'
    case 'FinalStand0':
      return '最终一战'
    case 'FrontlinesMedium0':
      return '前线(中型)'
    default:
      return modeKey
  }
}
function countryNameConvert (name) {
  switch (name) {
    case 'Germany':
      return '德国'
    case 'United Kingdom':
      return '英国'
    case 'United States':
      return '美国'
    case 'Japan':
      return '日本'
    default:
      return '未知阵营'
  }
}
function timeENGToCN (time) {
  return time.replace('d', '天').replace('h', '小时').replace('m', '分钟').replace('s', '秒').replace(/ /g, '')
}
function weaponNameConvert (name) {
  switch (name) {
    case 'Boys AT Rifle':
      return '博伊斯反坦克步枪'
    case 'Panzerbüchse 39':
      return '39 反坦克步枪'
    case 'Breda M1935 PG':
      return '贝达M1935'
    case 'Ribeyrolles 1918':
      return '利贝罗勒 1918'
    case 'Commando Carbine':
      return '突击队卡宾枪'
    case 'Jungle Carbine':
      return '丛林卡宾枪'
    case 'M28 con Tromboncino':
      return 'M28 步枪榴弹发射器'
    case 'Ross Rifle Mk III':
      return '罗斯 MK 3'
    case 'Lee-Enfield No.4 Mk I':
      return '李-恩菲尔德 No.4 Mk I'
    case 'Type 99':
      return '99式步枪'
    case 'Bren Gun':
      return '布伦轻机枪'
    case 'FG-42':
      return 'FG-42 伞兵机枪'
    case 'Lewis Gun':
      return '刘易斯机枪'
    case 'LS/26':
      return '拉提 M26'
    case 'Madsen MG':
      return '麦德森机枪'
    case 'Trench Carbine':
      return '战壕卡宾枪'
    case 'P08 Carbine':
      return 'P08 卡宾枪'
    case 'Model 8':
      return 'Model 8 半自动步枪'
    case 'Gewehr 1-5':
      return '格韦尔 1-5 半自动步枪'
    case 'Sturmgewehr 1-5':
      return '格韦尔 1-5 突击步枪'
    case 'Gewehr 43':
      return '格韦尔 43 步枪'
    case 'M1A1 Carbine':
      return 'M1A1 卡宾枪'
    case 'M1 Garand':
      return 'M1 伽兰德步枪'
    case 'Turner SMLE':
      return '特纳 SMLE 步枪'
    case 'Liberator':
      return '解放者'
    case 'Model 27':
      return 'Model 27 左轮手枪'
    case 'P08 Pistol':
      return 'P08 手枪'
    case 'Ruby':
      return '红宝石半自动手枪'
    case 'Type 94':
      return '94式手枪'
    case 'Mk VI Revolver':
      return '韦伯利 Mk VI 转轮手枪'
    case 'P38 Pistol':
      return 'P38 手枪'
    case 'MAB 38':
      return '伯莱塔 38型冲锋枪'
    case 'Suomi KP/-31':
      return '索米 KP/-31'
    case 'STEN':
      return '斯登冲锋枪'
    case 'Type 100':
      return '百式冲锋枪'
    case 'M1928A1':
      return 'M1928A1 冲锋枪'
    case 'M1907 SF':
      return '温彻斯特 1907型半自动步枪'
    case 'Selbstlader 1916':
      return '毛瑟 1916半自动步枪'
    case 'EMP':
      return '埃尔马 EMP 冲锋枪'
    case '12g Automatic':
      return '12口径自动霰弹枪'
    case 'Selbstlader 1906':
      return '鲁格 1906 半自动步枪'
    case 'Repetierpistole M1912':
      return '斯太尔M1912手枪'
    case 'EGW Survival Knife':
      return 'EGW求生小刀'
    case 'MKIII(S) Elite Combat Dagger':
      return 'MKIII(S)精英战斗匕首'
    case 'Hatchet':
      return '短柄斧'
    case 'Arditi Dagger':
      return '敢死队匕首'
    case 'Club':
      return '棍棒'
    case 'Pickaxe':
      return '尖嘴镐'
    case 'Fallschirmjäger Switchblade':
      return '空降猎兵弹簧刀'
    case 'Kukri':
      return '廓尔喀弯刀'
    case 'Shovel':
      return '铁铲'
    case 'Barbed Baseball Bat':
      return '铁丝网棒球棍'
    case 'Fire Axe':
      return '消防斧'
    case 'Scout Knife M1916':
      return '侦察兵小刀 M1916'
    default:
      return name
  }
}
function vehicleNameConvert (name) {
  switch (name) {
    case 'HACHI':
      return '八八式高射炮'
    case 'TYPE 97':
      return '九七式中战车'
    case 'CHURCHILL CROCODILE':
      return '丘吉尔鳄鱼'
    case 'CHURCHILL CROCODILE (S)':
      return '丘吉尔鳄鱼'
    case 'CHURCHILL GUN CARRIER':
      return '丘吉尔自行火炮'
    case 'CHURCHILL MK VII':
      return '丘吉尔 MK VII 坦克'
    case 'FLAKPANZER IV':
      return '四号自行高射炮'
    case 'KA-MI':
      return '特二式内火艇'
    case 'PANZER IV':
      return '四号坦克'
    case 'PANZER IV (S)':
      return '四号坦克'
    case 'PANZER 38T':
      return '38T 坦克'
    case 'SHERMAN':
      return '谢尔曼坦克'
    case 'T34 CALLIOPE':
      return 'T34 卡利欧波'
    case 'STAGHOUND T17E1 (S)':
      return 'T17E1 猎鹿犬装甲车'
    case 'STAGHOUND T17E1':
      return 'T17E1 猎鹿犬装甲车'
    case 'STURMGESCHUTZ IV':
      return '四号突击炮'
    case 'TIGER I':
      return '虎 I 坦克'
    case 'STURMTIGER':
      return '突击虎'
    case 'VALENTINE AA MK I':
      return '防空MK I型瓦伦丁坦克'
    case 'VALENTINE ARCHER':
      return '弓箭手反坦克炮'
    case 'VALENTINE MK VIII (S)':
      return 'MK VIII型瓦伦丁坦克'
    case 'VALENTINE MK VIII':
      return 'MK VIII型瓦伦丁坦克'
    case 'BLENHEIM MKI':
      return 'MKI型布伦亨氏轰炸机'
    case 'BLENHEIM MK IF':
      return '布伦海姆 MK IF 轰炸机'
    case 'CORSAIR F4U-1A':
      return 'F4U-1A 海盗式战斗机'
    case 'CORSAIR F4U-1C':
      return 'F4U-1C 海盗式战斗机'
    case 'MOSQUITO MKII':
      return 'MKII型蚊式战斗机'
    case 'MOSQUITO FB MKVI':
      return 'FB MKVI型蚊式轰炸机'
    case 'SPITFIRE MK VA':
      return 'MK VA 喷火式战斗机'
    case 'SPITFIRE MK VB':
      return 'MK VB 喷火式战斗机'
    case 'STUKA B-1':
      return '斯图卡 B-1'
    case 'STUKA B-2':
      return '斯图卡 B-2'
    case 'ZERO A6M2':
      return '零式战斗机一一型'
    case 'ZERO A6M5':
      return '零式战斗机五二型'
    case 'BF 109 G-2':
      return 'BF 109 G-2 战斗机'
    case 'BF 109 G-6':
      return 'BF 109 G-6 战斗机'
    case 'JU-88 A':
      return 'JU-88 A 轰炸机'
    case 'JU-88 C':
      return 'JU-88 C 轰炸机'
    case 'SD. KFZ 251 HALFTRACK':
      return 'SD.KFZ 251 半履带车'
    case 'M3':
      return 'M3冲锋车'
    case 'KUBELWAGEN':
      return '水桶车'
    case 'UNIVERSAL CARRIER':
      return '通用运兵车'
    case 'SD. KFZ. 251 PAKWAGEN':
      return 'SD. KFZ. 251 PAKWAGEN战车'
    case 'KETTENKRAD':
      return '半履带摩托车'
    case 'TYPE 95 CAR':
      return '九五式小型乘用车'
    case 'DINGHY':
      return '小艇'
    default:
      return name
  }
}
function gadgetNameConvert (name) {
  switch (name) {
    case 'Ammo Crate':
      return '弹药箱'
    case 'Sniper Decoy':
      return '狙击手诱饵'
    case 'Sticky Dynamite':
      return '粘性炸药'
    case 'Medical Crate':
      return '医疗箱'
    case 'Bandages':
      return '绷带'
    case 'AT Mine':
      return '反坦克地雷'
    case 'Spawn Beacon':
      return '重生信标'
    case 'AP Mine':
      return '反人员地雷'
    case 'Flare Gun':
      return '信号枪'
    case 'M2 Flamethrower':
      return 'M2 火焰喷射器'
    case 'AT Grenade Pistol':
      return '反坦克榴弹手枪'
    case 'Frag Grenade Rifle':
      return '破片榴弹步枪'
    case 'Smoke Grenade Rifle':
      return '烟雾弹步枪'
    case 'Fliegerfaust':
      return '防空铁拳(刺拳)'
    case 'Panzerfaust':
      return '反坦克火箭筒(铁拳)'
    case 'Spotting Scope':
      return '标记瞄准镜'
    case 'Anti-Tank Bundle Grenade':
      return '反坦克捆绑式手雷'
    case 'Incendiary Grenade':
      return '燃烧手雷'
    case 'Frag Grenade':
      return '破片手雷'
    case 'Impact Grenade':
      return '冲击手雷'
    case 'Smoke Grenade':
      return '烟雾手雷'
    case 'Sticky Grenade':
      return '粘性手雷'
    case 'Throwing Blade':
      return '飞刀'
    case 'Medical Syringe':
      return '医疗注射器'
    case 'Katana':
      return '武士刀'
    default:
      return name
  }
}
function secondsFormat (s) {
  var day = Math.floor(s / (24 * 3600)) // Math.floor() 向下取整
  var hour = Math.floor((s - day * 24 * 3600) / 3600)
  var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60)
  var second = s - day * 24 * 3600 - hour * 3600 - minute * 60
  return hour + '小时' + minute + '分钟' + second + '秒'
}
export {
  timestampToTime,
  mapCodeToCN,
  modeNameToCN,
  countryNameConvert,
  timeENGToCN,
  weaponNameConvert,
  vehicleNameConvert,
  gadgetNameConvert,
  secondsFormat
}
