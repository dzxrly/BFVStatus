import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    data: null,
    lastPageName: '',
    platform: '',
    username: '',
    gameWholeInfo: null,
    weaponInfo: null,
    vehicleInfo: null,
    tabActive: 0
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
    getGameWholeInfo (state) {
      if (state.gameWholeInfo) {
        return JSON.parse(state.gameWholeInfo)
      } else return null
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
    }
  },
  mutations: {
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
    setGameWholeInfo (state, gameWholeInfo) {
      state.gameWholeInfo = gameWholeInfo
    },
    setWeaponInfo (state, weaponInfo) {
      state.weaponInfo = weaponInfo
    },
    setVehicleInfo (state, vehicleInfo) {
      state.vehicleInfo = vehicleInfo
    },
    setTabActive (state, tabActive) {
      state.tabActive = tabActive
    }
  }
})
