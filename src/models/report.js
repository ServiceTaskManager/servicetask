import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'report',
    titleProp: 'date',
    meta: {
      icon: 'outlined_flag',
      color: 'lime'
    },
    routes: [{
      path: 'reports',
      name: 'reports',
      component: () => import('../pages/StListPage'),
      meta: {
        title: 'Reports',
        menu: true,
        createRoute: 'report'
      }
    }, {
      path: 'report/:id',
      name: 'report',
      component: () => import('../pages/Report'),
      meta: {
        title: 'Report'
      }
    }]
  }
}
