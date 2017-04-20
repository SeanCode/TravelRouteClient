export default {
  NET: {
    END_POINT_RELEASE: 'http://localhost:8080',
    END_POINT_DEBUG: 'http://localhost:8080',
    API_PATH: '/api/v1',
    API: {
      USER_LOGIN: '/user/login',
      USER_REGISTER: '/user/register',
      USER_UPDATE: '/user/update',
      USER_ADD_ADMIN: '/user/add-admin',
      USER_LIST: '/user/list',
      USER_DELETE: '/user/delete',
      DEST_LIST: '/dest',
      DEST_DETAIL: '/dest/{id}',
      DEST_SAVE: '/dest/save',
      DEST_DELETE: '/dest/delete',
      ROUTE_LIST: '/route/list',
      ROUTE_DETAIL: '/route/{id}',
      ROUTE_SAVE: '/route/save',
      ROUTE_DELETE: '/route/delete',
      ORDER_CREATE: '/order/create',
      ORDER_LIST_CREATED: '/order/list-created',
      ORDER_LIST_RECEIVED: '/order/list-received',
      ORDER_UPDATE_STATUS: '/order/update-status',
      ORDER_DELETE: '/order/delete',
      UPLOAD_IMG: '/upload/img'
    }
  },
  SYSTEM: {
    LOG_LEVEL_ERROR: 1,
    LOG_LEVEL_WARN: 2,
    LOG_LEVEL_INFO: 3,
    LOG_LEVEL_TRACE: 4,
    LOG_LEVEL_DEBUG: 5
  },
  DATA: {
    KEY_PREFIX: 'chenlei.travel.data',
    KEY_COOKIE: '.cookie',
    KEY_TOKEN: '.token',
    KEY_USER: '.user',
    KEY_ADMIN: '.admin'
  }
}
