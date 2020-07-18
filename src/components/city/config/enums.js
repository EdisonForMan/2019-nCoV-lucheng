console.log(window.user)

const a = window.user



export const leftOptions = [{
    label: "考察场所",
    check: false,
    show: true,
    children: [{
        name: `街道办事处 (1个)`,
        id: "jdbsc",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '街道办事处'`,
        icon: true,
        check: false
    }, {
        name: `街道综合文化站 (1个)`,
        id: "jdwhz",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '街道综合文化站'`,
        icon: true,
        check: false
    }, {
        name: `社区 (7个)`,
        id: "sq",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '社区'`,
        icon: true,
        check: false
    }, {
        name: `社区综合文化服务中心 (4个)`,
        id: "sqfwzx",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '社区综合文化服务中心'`,
        icon: true,
        check: false
    }, {
        name: `主干道 (2条)`,
        id: "zgd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '主干道'`,
        icon: true,
        check: false
    }, {
        name: `次干道 (2条)`,
        id: "cgd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '次干道'`,
        icon: true,
        check: false
    }, {
        name: `幼儿园 (2个)`,
        id: "yey",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '幼儿园'`,
        icon: true,
        check: false
    }, {
        name: `中学 (1个)`,
        id: "zx",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '中学'`,
        icon: true,
        check: false
    }, {
        name: `长途汽车客运站（码头） (1个)`,
        id: "mt",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '长途汽车客运站'`,
        icon: true,
        check: false
    }, {
        name: `政务大厅（行政服务中心） (1个)`,
        id: "zwdt",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '政务大厅'`,
        icon: true,
        check: false
    }, {
        name: `农贸（集贸）市场 (1个)`,
        id: "nm",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '农贸市场'`,
        icon: true,
        check: false
    }, {
        name: `银行网点 (1个)`,
        id: "yh",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '银行网点'`,
        icon: true,
        check: false
    }, {
        name: `医院 (1个)`,
        id: "yy",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '医院'`,
        icon: true,
        check: false
    }, {
        name: `主要交通路口 (2个)`,
        id: "jtlk",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '主要交通路口'`,
        icon: true,
        check: false
    }, {
        name: `电影院 (1个)`,
        id: "dyy",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '电影院'`,
        icon: true,
        check: false
    }, {
        name: `建筑工地 (3个)`,
        id: "jzgd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
        sublayers: "1",
        definitionExpression: `TYPE = '建筑工地'`,
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