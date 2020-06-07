import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    data: null,
    lastPageName: '',
    platform: '',
    username: '',
    weaponInfo: null,
    vehicleInfo: null,
    tabActive: 0,
    history: null,
    playerIdHistory: [],
    versionCheckedDate: 0,
    versionCheckedRes: 1
  },
  getters: {
    getJSONData (state) {
      if (state.data) {
        return JSON.parse(state.data)
      } else return null
    },
    getLastPageName (state) {
      if (state.lastPageName) {
        return state.lastPageName
      } else return ''
    },
    getPlatform (state) {
      if (state.platform) {
        return state.platform
      } else return ''
    },
    getUsername (state) {
      if (state.username) {
        return state.username
      } else return ''
    },
    getWeaponInfo (state) {
      if (state.weaponInfo) {
        return JSON.parse(state.weaponInfo)
      } else return null
    },
    getVehicleInfo (state) {
      if (state.vehicleInfo) {
        return JSON.parse(state.vehicleInfo)
      } else return null
    },
    getTabActive (state) {
      if (state.tabActive) {
        return state.tabActive
      } else return 0
    },
    getHistory (state) {
      if (state.history) return JSON.parse(state.history)
      else return null
    },
    getPlayerIdHistory (state) {
      if (state.playerIdHistory) return state.playerIdHistory
      else return null
    },
    getVersionCheckedDate (state) {
      return state.versionCheckedDate
    },
    getVersionCheckedRes (state) {
      return state.versionCheckedRes
    }
  },
  mutations: {
    setVersionCheckedRes (state, versionCheckedRes) {
      state.versionCheckedRes = versionCheckedRes
    },
    setVersionCheckedDate (state, versionCheckedDate) {
      state.versionCheckedDate = versionCheckedDate
    },
    setData (state, data) {
      state.data = data
    },
    setLastPageName (state, lastPageName) {
      state.lastPageName = lastPageName
    },
    setPlatform (state, platform) {
      state.platform = platform
    },
    setUsername (state, username) {
      state.username = username
    },
    setWeaponInfo (state, weaponInfo) {
      state.weaponInfo = weaponInfo
    },
    setVehicleInfo (state, vehicleInfo) {
      state.vehicleInfo = vehicleInfo
    },
    setTabActive (state, tabActive) {
      state.tabActive = tabActive
    },
    setHistory (state, history) {
      state.history = history
    },
    setPlayerIdHistory (state, playerIdHistory) {
      let flag = false
      for (let index in state.playerIdHistory) {
        if (
          state.playerIdHistory[index].value === (JSON.parse(playerIdHistory)).value
        ) {
          flag = true
          break
        }
      }
      if (!flag) {
        if (state.playerIdHistory.length < 5) {
          state.playerIdHistory.push(JSON.parse(playerIdHistory))
        } else {
          state.playerIdHistory.shift()
          state.playerIdHistory.push(JSON.parse(playerIdHistory))
        }
      }
    }
  },
  plugins: [createPersistedState({
    reducer (val) {
      return {
        playerIdHistory: val.playerIdHistory,
        versionCheckedDate: val.versionCheckedDate,
        versionCheckedRes: val.versionCheckedRes
      }
    }
  })]
})
