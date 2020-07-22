// console.log(window.user)

// const a = window.user



export const leftOptions = [{
    label: "考察场所",
    check: false,
    show: true,
    children: [{
        name: `街道办事处(建成区内)`,
        id: "jdbsc",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 1`,
        icon: true,
        check: false
    }, {
        name: `街道综合文化站`,
        id: "jdwhz",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 2`,
        icon: true,
        check: false
    }, {
        name: `社区`,
        id: "sq",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 3`,
        icon: true,
        check: false
    }, {
        name: `社区综合文化服务中心`,
        id: "sqfwzx",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 4`,
        icon: true,
        check: false
    }, {
        name: `小区`,
        id: "xqd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 5`,
        icon: true,
        check: false
    }, {
        name: `城乡结合部`,
        id: "cxjhb",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 6`,
        icon: true,
        check: false
    }, {
        name: `建成区外乡镇或街道办事处(乡镇综合文化站)`,
        id: "yey",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 7`,
        icon: true,
        check: false
    }, {
        name: `建成区外的行政村或社区`,
        id: "xzc",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 8`,
        icon: true,
        check: false
    }, {
        name: `主次干道、商业大街`,
        id: "sydj",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 9`,
        icon: true,
        check: false
    }, {
        name: `背街小巷`,
        id: "bjxx",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 10`,
        icon: true,
        check: false
    }, {
        name: `公共广场、公园`,
        id: "gy",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 11`,
        icon: true,
        check: false
    }, {
        name: `公共卫生间`,
        id: "gc",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 12`,
        icon: true,
        check: false
    }, {
        name: `公共文化设施`,
        id: "ggwhss",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 13`,
        icon: true,
        check: false
    }, {
        name: `景点景区`,
        id: "jq",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 14`,
        icon: true,
        check: false
    }, {
        name: `实体书店`,
        id: "stsd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 15`,
        icon: true,
        check: false
    }, {
        name: `饭店、三星级及以上宾馆`,
        id: "fd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 16`,
        icon: true,
        check: false
    }, {
        name: `农贸市场(专业市场)`,
        id: "nmsc",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 17`,
        icon: true,
        check: false
    }, {
        name: `餐馆、餐饮店`,
        id: "cg",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 18`,
        icon: true,
        check: false
    }, {
        name: `窗口单位`,
        id: "ckdw",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 19`,
        icon: true,
        check: false
    }, {
        name: `商场、超市`,
        id: "cs",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 20`,
        icon: true,
        check: false
    }, {
        name: `交通路口、主要交通路口、示范样板路`,
        id: "jtlk",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 21`,
        icon: true,
        check: false
    }, {
        name: `电影院`,
        id: "dyy",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 22`,
        icon: true,
        check: false
    }, {
        name: `建筑工地`,
        id: "jzgd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 23`,
        icon: true,
        check: false
    }, {
        name: `河道`,
        id: "hd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 24`,
        icon: true,
        check: false
    }, {
        name: `学校周边环境(中学、小学、幼儿园)`,
        id: "xxzb",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 25`,
        icon: true,
        check: false
    }, {
        name: `学校校内(中学、小学、幼儿园)`,
        id: "xxxn",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 26`,
        icon: true,
        check: false
    }, {
        name: `校外教育、校外培训机构`,
        id: "pxjg",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 27`,
        icon: true,
        check: false
    }, {
        name: `未成年人心理健康指导中心(辅导站)`,
        id: "fdz",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 28`,
        icon: true,
        check: false
    }, {
        name: `网吧`,
        id: "wb",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "0",
        definitionExpression: `TAG = 29`,
        icon: true,
        check: false
    }]
}, {
    label: "网格管理",
    check: false,
    show: true,
    children: [{
        name: "行政区划",
        id: "chanyePlate",
        sublayers: "0",
        isImg: true,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/xzjd_ws/MapServer",
        check: true
    }, {
        name: "社区网格",
        id: "wg",
        sublayers: "12",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        check: false
    }, {
        name: "小区、大厦",
        id: "xq",
        sublayers: "14",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        check: false
    }]
}]