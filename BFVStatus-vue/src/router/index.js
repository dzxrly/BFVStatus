import Vue from 'vue'
import Router from 'vue-router'
import UserSearchView from '@/components/UserSearchView'
import PlayerStatusInfoView from '@/components/PlayerStatusInfoView'
import PlayerGameInfo from '@/components/PlayerGameInfo'
import ChartsView from '@/components/ChartsView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserSearchView',
      component: UserSearchView
    },
    {
      path: '/PlayerStatusInfo',
      name: 'PlayerStatusInfoView',
      component: PlayerStatusInfoView
    },
    {
      path: '/PlayerGameInfo',
      name: 'PlayerGameInfo',
      component: PlayerGameInfo
    },
    {
      path: '/ChartsView',
      name: 'ChartsView',
      component: ChartsView
    }
  ]
})
