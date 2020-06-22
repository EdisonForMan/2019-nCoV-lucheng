/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// eslint-disable-next-line camelcase
const WRT_config = {
  title: "后台系统",
  title_A050: "新系统",
  title_1111: "数据汇聚更新",
  server: "http://172.20.89.88:5001",
  serverCompatible: "http://172.20.89.88:5001",

  // server:"http://192.168.0.200:9003",
  //serverCompatible:"http://192.168.199.167:9003",
  // defaultT:"1itDLWTywJs=",
  // defaultT:"MaX9493sw5w=",// 70
  // defaultT:"Pg6Ldllrwgk=", // 65
  // defaultT : "AqGm50KRtGc=",
  defaultT: "+mOUb1hDtJA=", // 888
  etlT: "MaX9493sw5w=",
  etlServer: "http://s2.wzzh.info:5000",
  appname: "JdwEdit",
  res: 'testsjk',
  qyzgSever: "http://172.20.89.88:5001",
  loginSever: 'http://172.20.89.88:5001',
  lcSever: 'http://172.20.89.88:5001',
  lcManagerSever: "http://172.20.89.88:5001",
  // 以下为动态数据：
  user_type: '', // 登录类型，默认 ""
  au_userid: 0, // 用户  ID
  au_username: '', // 用户名
  user: {}, // 登录的用户对象，根据不同的登录类型，可能不同。
  access_token: '',
  lng: {}, // 语言配置
  menus: {
    default: []
  }, // 菜单配置
  routes: {
    default: []
  }, // 路由配置
  permissions: [],

  // 项目配置, 项目_
  // 例如： qyzg_res 企业
  etl_res: 'testsql_lc', // testsjk testsql_lc
  // 丽人阁
  lrg_res: 'lrg'
}

window.WRT_config = WRT_config