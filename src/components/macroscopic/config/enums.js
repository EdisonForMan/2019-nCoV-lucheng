const {
    macroscopic
} = window.nCov_luchengData;
const {
    lc,
    lc_yt
} = macroscopic;
export const leftOptions = [{
    label: "疫情分布",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: `确诊病例 (${lc.qzbl}例)`,
        id: "qzbl",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "1",
        icon: "确诊病例",
        check: false
    }, {
        name: `密切接触者 (${lc.mj}例)`,
        ytd: "IdentityType like '%银泰%'",
        id: "mj",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "1",
        icon: "密接",
        check: false
    }, {
        name: `集中隔离者 (${lc.gld_list}个)`,
        id: "gld_list",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "2",
        icon: "治愈",
        check: false
    }, {
        name: `疫点 (${lc.gld}个)`,
        id: "gld",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "3",
        icon: "治愈",
        check: false
    }
    ]
}, {
    label: "医疗资源",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: `发热门诊 (${macroscopic.clinic_type_1}家)`,
        id: "clinic_type_1",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        sublayers: "1",
        icon: "发热门诊",
        check: false
    }, {
        name: `定点救治医院 (${macroscopic.clinic_type_2}家)`,
        id: "clinic_type_2",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        sublayers: "2",
        icon: "定点医院",
        check: false
    }, {
        name: `其他专科医院 (${macroscopic.clinic_type_3}家)`,
        id: "clinic_type_3",
        url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
        sublayers: "8",
        definitionExpression: "TAG LIKE '%专科医院%'",
        icon: "其他专科医院",
        check: false
    },
        {
            name: "乡镇卫生医院 (7129家)",
            id: "clinic_type_4",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "8",
            definitionExpression: "TAG LIKE '%医疗卫生%'",
            icon: "乡镇卫生院",
            check: false
        },
        {
            name: `医保药房 (${macroscopic.clinic_type_5}家)`,
            id: "clinic_type_5",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "8",
            definitionExpression: "TAG LIKE '%药房/保健品%'",
            icon: "药店",
            check: false
        },
        {
            name: "其他医疗机构 (7129家)",
            id: "clinic_type_6",
            sublayers: "8",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            icon: "其他医疗机构",
            check: false
        },
        {
            name: `疾控中心 (${macroscopic.clinic_type_7}家)`,
            id: "clinic_type_7",
            sublayers: "0",
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
            icon: "疾控中心",
            check: false
        }
    ]
},
    {
        label: "网格管理",
        sflabel: -1,
        check: false,
        show: true,
        children: [{
            name: "街镇网格",
            id: "chanyePlate",
            sublayers: "0",
            // isImg: true,
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/xzjd/MapServer",
            check: true
        }, {
            name: "小区、大厦、物业",
            id: "xq",
            sublayers: "12",
            // isImg: true,
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            check: false
        }, {
            name: "社区网格",
            id: "wg",
            sublayers: "14",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            check: false
        }]
    }, {
        label: "人员密集场所",
        sflabel: -1,
        check: false,
        show: true,
        children: [{
            name: `佛道宗教活动场所 (${macroscopic.people_type_1}个)`,
            id: "people_type_1",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "2",
            icon: "宗教",
            check: false
        }, {
            name: `天基宗教活动场所 (${macroscopic.people_type_2}个)`,
            id: "people_type_2",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "3",
            icon: "宗教",
            check: false
        }, {
            name: `伊斯兰教宗教活动场所 (${macroscopic.people_type_13}个)`,
            id: "people_type_13",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "12",
            icon: "宗教",
            check: false
        }, {
            name: `旅馆名单 (${macroscopic.people_type_3}个)`,
            id: "people_type_3",
            url: "http://172.20.89.59/server/rest/services/lcjjdt/jjts/MapServer",
            sublayers: "3",
            icon: "市场",
            check: false
        }, {
            name: `城市书房 (${macroscopic.people_type_6}个)`,
            id: "people_type_6",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "6",
            icon: "城市书房",
            check: false
        }, {
            name: `健身房 (${macroscopic.people_type_7}个)`,
            id: "people_type_7",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "5",
            icon: "健身房",
            check: false
        },
            {
                name: `民办培训机构 (${macroscopic.people_type_12}个)`,
                id: "people_type_12",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "13",
                icon: "民办培训机构",
                check: false
            },
            {
                name: `博物馆 (${macroscopic.people_type_10}个)`,
                id: "people_type_10",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "7",
                icon: "博物馆",
                check: false
            }, {
                name: `文化场所 (${macroscopic.people_type_11}个)`,
                id: "people_type_11",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "8",
                icon: "文化",
                check: false
            },
            {
                name: `体育(游泳池) (${macroscopic.people_type_10}个)`,
                id: "people_type_10",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "7",
                icon: "健身房",
                check: false
            },
            {
                name: `商场超市 (${macroscopic.people_type_10}个)`,
                id: "people_type_10",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "7",
                icon: "市场",
                check: false
            },
            {
                name: `农贸市场 (${macroscopic.people_type_10}个)`,
                id: "people_type_10",
                url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
                sublayers: "7",
                icon: "市场",
                check: false
            }
        ]
    },
    {
        label: "三返专题",
        sflabel: -1,
        check: false,
        show: true,
        children: [{
            name: `企业 (${macroscopic.jzgd}家)`,
            id: "jzgd",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            sublayers: "13",
            icon: "建筑工地",
            check: false
        }, {
            name: `学校 (${macroscopic.nj_zdqy}家)`,
            id: "nj_zdqy",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/nanjiao/MapServer",
            sublayers: "4",
            icon: "重点企业",
            check: false
        }, {
            name: `宗教 (${macroscopic.nj_xm_1}家)`,
            id: "nj_xm_1",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/nanjiao/MapServer",
            sublayers: "1",
            definitionExpression: "CompanyType = '南郊街道自建项目企业'",
            icon: "自建项目",
            check: false
        }, {
            name: `事业单位 (${macroscopic.nj_xm_2}家)`,
            id: "nj_xm_2",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/nanjiao/MapServer",
            sublayers: "1",
            definitionExpression: "CompanyType = '南郊街道辖区在建项目企业'",
            icon: "在建项目",
            check: false
        }]
    }
]