import { get, list } from './controllers/file.js'

export const routes = (router) => {
  router.route('/files/data')
    .get(get)

  router.route('/files/list')
    .get(list)

  return router
}
