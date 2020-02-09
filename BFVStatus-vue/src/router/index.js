import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserSearchView from '@/components/UserSearchView'
import PlayerStatusInfoView from '@/components/PlayerStatusInfoView'
import PlayerGameInfo from '@/components/PlayerGameInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserSearchView',
      component: UserSearchView
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/PlayerStatusInfo',
      name: 'PlayerStatusInfoView',
      component: PlayerStatusInfoView
    },
    {
      path: '/PlayerGameInfo/:gameReportId',
      name: 'PlayerGameInfo',
      component: PlayerGameInfo,
      params: true
    }
  ]
})
