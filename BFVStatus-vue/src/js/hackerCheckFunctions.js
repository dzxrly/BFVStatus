let checkedWeaponTypes = ['assaultrifle', 'smg', 'mmg', 'semi', 'lmg', 'pistolcarbine', 'sidearm']
function checkIsWeapon (weaponType) {
  var res = checkedWeaponTypes.indexOf(weaponType)
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
function isAllChecked (weaponObj) {
  if (checkIsKilled100(weaponObj)) {
    if (checkHeadShotRate(weaponObj)) return true
    else return false
  } else return false
}
function checkIsHacker (weaponArr, judge, headshotRate) {
  var returnList = [false, 0, 0]
  var checkedWeaponCount = 0 // 达到指定爆头率的百杀以上武器数
  var weaponTotalCount = 0 // 百杀以上武器数
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
  }
  var res = checkedWeaponCount / weaponTotalCount
  // For Test
  console.log(checkedWeaponCount)
  console.log(weaponTotalCount)
  console.log(res)
  // --------
  if (res > judge) {
    returnList[0] = true
    returnList[1] = checkedWeaponCount
    returnList[2] = weaponTotalCount
    return returnList
  } else {
    returnList[0] = false
    returnList[1] = checkedWeaponCount
    returnList[2] = weaponTotalCount
    return returnList
  }
}
export {
  checkIsWeapon,
  checkIsKilled100,
  checkHeadShotRate,
  isAllChecked,
  checkIsHacker
}
