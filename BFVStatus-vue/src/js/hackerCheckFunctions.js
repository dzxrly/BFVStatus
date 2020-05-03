let checkedWeaponTypes = ['assaultrifle', 'smg', 'mmg', 'semi', 'lmg', 'pistolcarbine', 'sidearm']
let checkedSniperWeaponType = ['boltactioncarbine', 'rifle']
function checkIsWeapon (weaponType) {
  var res = checkedWeaponTypes.indexOf(weaponType)
  if (res === -1) return false
  else return true
}
function checkIsSniper (weaponType) {
  var res = checkedSniperWeaponType.indexOf(weaponType)
  if (res === -1) return false
  else return true
}
function checkIsKilled100 (weaponObj) {
  if (weaponObj.stats[0].value >= 100) return true
  else return false
}
function checkHeadShotRate (weaponObj, headshotRate) {
  var kills = weaponObj.stats[0].value
  var headshot = weaponObj.stats[6].value
  if ((headshot / kills) >= headshotRate) return true
  else return false
}
function checkKPM (weaponObj, kpm) {
  var originalKpm = weaponObj.stats[1].value
  if (originalKpm > kpm) return true
  else return false
}
function isAllChecked (weaponObj) {
  if (checkIsKilled100(weaponObj)) {
    if (checkHeadShotRate(weaponObj)) return true
    else return false
  } else return false
}
function checkIsHacker (weaponArr, judge, headshotRate, sniperJudge, sniperHSRate, sniperKpm) {
  var returnList = [false, 0, 0, 0, 0, true]
  var checkedWeaponCount = 0 // 达到指定爆头率的百杀以上武器数
  var weaponTotalCount = 0 // 百杀以上武器数
  var checkedSniperWeaponCount = 0
  var sniperWeaponTotalCount = 0
  for (var i = 0; i < weaponArr.length; i++) {
    // console.log(weaponArr[i])
    if (checkIsWeapon(weaponArr[i].metadata.categoryKey)) {
      if (checkIsKilled100(weaponArr[i])) {
        weaponTotalCount++
        if (checkHeadShotRate(weaponArr[i], headshotRate)) {
          checkedWeaponCount++
        }
      }
    }
    if (checkIsSniper(weaponArr[i].metadata.categoryKey)) {
      if (checkIsKilled100(weaponArr[i])) {
        sniperWeaponTotalCount++
        if (checkHeadShotRate(weaponArr[i], sniperHSRate) && checkKPM(weaponArr[i], sniperKpm)) {
          checkedSniperWeaponCount++
        }
      }
    }
  }
  var res = checkedWeaponCount / weaponTotalCount
  var sniperRes = checkedSniperWeaponCount / sniperWeaponTotalCount
  // For Test
  console.log(sniperWeaponTotalCount)
  console.log(checkedSniperWeaponCount)
  console.log(res)
  // --------
  if (res > judge) {
    returnList[0] = true
    returnList[1] = checkedWeaponCount
    returnList[2] = weaponTotalCount
  } else {
    returnList[0] = false
    returnList[1] = checkedWeaponCount
    returnList[2] = weaponTotalCount
  }
  if (sniperRes > sniperJudge) {
    returnList[3] = sniperWeaponTotalCount
    returnList[4] = checkedSniperWeaponCount
    returnList[5] = true
  } else {
    returnList[3] = sniperWeaponTotalCount
    returnList[4] = checkedSniperWeaponCount
    returnList[5] = false
  }
  return returnList
}
export {
  checkIsWeapon,
  checkIsKilled100,
  checkHeadShotRate,
  isAllChecked,
  checkIsHacker,
  checkKPM,
  checkIsSniper
}
