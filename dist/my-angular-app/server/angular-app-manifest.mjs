
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/login"
  },
  {
    "renderMode": 1,
    "route": "/menu"
  },
  {
    "renderMode": 1,
    "route": "/menu/lessonCourse/*"
  },
  {
    "renderMode": 1,
    "route": "/menu/courses"
  },
  {
    "renderMode": 1,
    "route": "/menu/showCourse/*"
  },
  {
    "renderMode": 1,
    "route": "/menu/myCourses"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23618, hash: '1417d7c3757742ca1c1fb5b4602064a3d9753cd7de74095d1123137254f00cd1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17192, hash: 'cb5128b75890e3ed1fb7274087cc9af7c34056237ead03c4626c4b1adbf6e661', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
