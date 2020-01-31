export const leftOptions = [{
        label: "疫情分布",
        check: false,
        show: true,
        children: [{
            name: "确诊病例 (27例)",
            id: "qzbl",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            sublayers: "0",
            icon: "确诊病例",
            check: true
        }, {
            name: "疑似病例 (3例)",
            id: "zzbl",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            sublayers: "1",
            icon: "疑似病例",
            check: false
        }, {
            name: "医院发热待查 (15例)",
            id: "yydc",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            sublayers: "2",
            icon: "医院待查",
            check: false
        }, {
            name: "社区发热排查 (8例)",
            id: "sqdc",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
            sublayers: "3",
            icon: "社区待查",
            check: false
        }, {
            name: "集中隔离点 (14例)",
            id: "gld",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
            sublayers: "2",
            icon: "治愈",
            check: false
        }, {
            name: "居家隔离人员 (23例)",
            id: "",
            icon: "死亡",
            check: false
        }, {
            name: "留观场所 (例)",
            id: "",
            icon: "留观",
            check: false
        }, {
            name: "密切接触者 (例)",
            id: "",
            icon: "密接",
            check: false
        }]
    },
    {
        label: "网格管理",
        check: false,
        show: true,
        children: [{
            name: "街镇网格",
            id: "chanyePlate",
            sublayers: "0",
            isImg: true,
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/xzjd/MapServer",
            check: true
        }, {
            name: "社区网格",
            id: "wg",
            sublayers: "0",
            url: "http://218.75.25.52:6082/arcgis/rest/services/WZ_WeiFang/t_WeiFang_WG_TJ/MapServer",
            check: false
        }, {
            name: "小区、大厦、物业",
            id: "xq",
            sublayers: "8",
            url: "http://10.36.245.203/server/rest/services/theme/D_HAZARDS_CROWDED/MapServer",
            check: false
        }, {
            name: "小区进出口点",
            id: "xqjck",
            sublayers: "0",
            icon: "进出口",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            check: false
        }]
    },
    {
        label: "卡口值班",
        check: false,
        show: true,
        children: [{
            name: "高速卡口 (4个)",
            id: "highway_type_1",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/zhiban/MapServer",
            sublayers: "0",
            icon: "高速",
            check: false
        }, {
            name: "汽车站 (4个)",
            id: "highway_type_3",
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/crowded/MapServer",
            sublayers: "0",
            icon: "汽车站",
            check: false
        }, {
            name: "火车站 (1个)",
            id: "highway_type_2",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
            sublayers: "1",
            icon: "火车站",
            check: false
        }]
    },
    {
        label: "人员密集场所",
        check: false,
        show: true,
        children: [{
            name: "佛道宗教活动场所 (110个)",
            id: "people_type_1",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "2",
            icon: "宗教",
            check: false
        }, {
            name: "天基宗教活动场所 (91个)",
            id: "people_type_2",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "3",
            icon: "宗教",
            check: false
        }, {
            name: "专业市场 (10个)",
            id: "people_type_3",
            url: "http://172.20.89.59/server/rest/services/lcjjdt/jjts/MapServer",
            sublayers: "3",
            icon: "市场",
            check: false
        }, {
            name: "学校 (288个)",
            id: "people_type_4",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "7",
            icon: "学校",
            check: false
        }, {
            name: "旅馆 (4289个)",
            id: "people_type_5",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "2",
            icon: "旅馆",
            check: false
        }, {
            name: "城市书房 (93个)",
            id: "people_type_6",
            url: "https://services.wzmap.gov.cn/server/rest/services/MEIZHOUYT/WZ_MZYT_2019/MapServer",
            sublayers: "9",
            icon: "城市书房",
            check: false
        }, {
            name: "健身房 (71个)",
            id: "people_type_7",
            url: "https://services.wzmap.gov.cn/server/rest/services/MEIZHOUYT/WZ_MZYT_2019/MapServer",
            sublayers: "7",
            icon: "健身房",
            check: false
        }, {
            name: "民办培训机构 (1个)",
            id: "",
            icon: "民办培训机构",
            check: false
        }, {
            name: "商场超市 (24个)",
            id: "people_type_8",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
            sublayers: "3",
            icon: "商场超市",
            check: false
        }, {
            name: "农贸市场 (41个)",
            id: "people_type_9",
            url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
            sublayers: "4",
            icon: "农贸市场",
            check: false
        }, {
            name: "博物馆 (1个)",
            id: "",
            icon: "博物馆",
            check: false
        }, {
            name: "文化场所 (55个)",
            id: "",
            icon: "文化",
            check: false
        }]
    },
    {
        label: "医疗资源",
        check: false,
        show: true,
        children: [{
            name: "发热门诊 (35家)",
            id: "clinic_type_1",
            url: "http://218.75.26.61:6081/arcgis/rest/services/MZYT/温州市发热门诊医疗地图/MapServer",
            sublayers: "0",
            definitionExpression: "TYPE = '发热门诊医疗机构'",
            icon: "发热门诊",
            check: false
        }, {
            name: "定点救治医院 (10家)",
            id: "clinic_type_2",
            url: "http://218.75.26.61:6081/arcgis/rest/services/MZYT/温州市发热门诊医疗地图/MapServer",
            sublayers: "0",
            definitionExpression: "TYPE = '定点医疗机构'",
            icon: "定点医院",
            check: false
        }, {
            name: "其他专科医院 (122家)",
            id: "clinic_type_3",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "8",
            definitionExpression: "TAG LIKE '%专科医院%'",
            icon: "其他专科医院",
            check: false
        }, {
            name: "乡镇卫生医院 (7129家)",
            id: "clinic_type_4",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "8",
            definitionExpression: "TAG LIKE '%医疗卫生%'",
            icon: "乡镇卫生院",
            check: false
        }, {
            name: "医保药房 (8家)",
            id: "clinic_type_5",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            sublayers: "8",
            definitionExpression: "TAG LIKE '%药房/保健品%'",
            icon: "药店",
            check: false
        }, {
            name: "其他医疗机构 (7129家)",
            id: "clinic_type_6",
            sublayers: "8",
            url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
            icon: "其他医疗机构",
            check: false
        }, {
            name: "疾控中心 (1家)",
            id: "clinic_type_7",
            sublayers: "0",
            url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
            icon: "疾控中心",
            check: false
        }]
    },
    {
        label: "其它",
        check: false,
        show: true,
        children: [{
            name: "建筑工地信息",
            id: "",
            icon: "建筑工地",
            check: false
        }, {
            name: "南郊重点企业",
            id: "",
            icon: "重点企业",
            check: false
        }, {
            name: "南郊街道自建项目企业排查表",
            id: "",
            icon: "自建项目",
            check: false
        }, {
            name: "南郊街道辖区在建项目企业排查表",
            id: "",
            icon: "在建项目",
            check: false
        }]
    }
]

export const tipHash = {
    qzbl: "illHash",
    zzbl: "illHash",
    yydc: "illHash",
    sqdc: "illHash",
    gld: "gldHash",
    people_type_1: "cultureHash",
    people_type_2: "marketHash",
    people_type_3: "scHash",
    people_type_6: "sfHash",
    people_type_7: "jsHash",
    highway_type_1: "subwayHash",
    highway_type_2: "subwayHash",
    highway_type_3: "carHash",
    clinic_type_1: "hospitalHash",
    clinic_type_2: "hospitalHash",
    clinic_type_3: "hospitalHash",
    clinic_type_4: "hospitalHash",
    clinic_type_5: "hospitalHash",
    clinic_type_6: "hospitalHash",
    clinic_type_7: "hospitalHash",
    xq: "xqHash",
    xqjck: "xqjckHash"
}
const gldHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "Name",
            label: "集中隔离点名称"
        },
        {
            fieldName: "Country",
            label: "街道"
        }, {
            fieldName: "Address",
            label: "地点"
        },
        {
            fieldName: "Rooms",
            label: "房间数"
        }, {
            fieldName: "UseNumber",
            label: "使用人数"
        }, {
            fieldName: "Linkman",
            label: "联络人"
        }, {
            fieldName: "Phone",
            label: "联络电话"
        }, {
            fieldName: "RemainRooms",
            label: "剩余可用房间数"
        }, {
            fieldName: "HBtoLCNumber",
            label: "其中湖北回鹿人数"
        },
    ]
}]
// 专业市场
const scHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "NAME",
        label: "名称"
    }]
}]
// 书房
const sfHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "NAME",
            label: "名称"
        },
        {
            fieldName: "ADDRESS",
            label: "地址"
        },
        {
            fieldName: "SUMMARY",
            label: "简介"
        },
    ]
}]
// 健身房
const jsHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "NAME",
            label: "名称"
        },
        {
            fieldName: "ADDRESS",
            label: "地址"
        },
        {
            fieldName: "PZQK",
            label: "器械用具"
        },
    ]
}]
// 小区出入口
const xqjckHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "NAME",
        label: "名称"
    }]
}]
// 小区
const xqHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "name",
        label: "名称"
    }, {
        fieldName: "short_name",
        label: "简称"
    }, {
        fieldName: "town",
        label: "街道"
    }, {
        fieldName: "charge_man",
        label: "负责人"
    }, {
        fieldName: "charge_man_tel",
        label: "负责人电话"
    }, {
        fieldName: "country",
        label: "所在区"
    }, {
        fieldName: "type",
        label: "类型"
    }]
}]
// 火车
const subwayHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "Name",
        label: "名称"
    }, ]
}]
//  汽车
const carHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "name",
            label: "名称"
        },
        {
            fieldName: "address",
            label: "地点"
        },
        {
            fieldName: "type",
            label: "类型"
        },
    ]
}]
//  市场
const marketHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "name",
            label: "名称"
        },
        {
            fieldName: "ssjd",
            label: "街道"
        },
    ]
}]
//  文化
const cultureHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "NAME",
            label: "名称"
        },
        {
            fieldName: "ADDRESS",
            label: "地址"
        },
        {
            fieldName: "SHORTNAME",
            label: "简称"
        },
    ]
}]
//  医院诊所
const hospitalHash = [{
    type: "fields",
    fieldInfos: [{
            fieldName: "NAME",
            label: "名称"
        },
        {
            fieldName: "ADDRESS",
            label: "地址"
        },
        {
            fieldName: "TYPE",
            label: "类型"
        },
        {
            fieldName: "GRADE",
            label: "等级"
        }
    ]
}]


// 学校
// const schoollHash = [{
//     type: "fields",
//     fieldInfos: [{
//             fieldName: "NAME",
//             label: "名称"
//         }
//     ]
// }]



//  病例
const illHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "Name",
        label: "姓名"
    }, {
        fieldName: "Sex",
        label: "性别"
    }, {
        fieldName: "Age",
        label: "年龄"
    }, {
        fieldName: "Profession",
        label: "职业"
    }, {
        fieldName: "Country",
        label: "街道"
    }, {
        fieldName: "Address",
        label: "现住址"
    }, {
        fieldName: "DiseaseTime",
        label: "发病时间"
    }, {
        fieldName: "Hospital",
        label: "现住医院"
    }, {
        fieldName: "ContactHistory",
        label: "接触史"
    }, {
        fieldName: "InWZTime",
        label: "到温时间"
    }, {
        fieldName: "WarehousingTime",
        label: "入库时间"
    }, ]
}]

export const Hash = {
    hospitalHash,
    illHash,
    cultureHash,
    marketHash,
    subwayHash,
    carHash,
    xqHash,
    xqjckHash,
    scHash,
    sfHash,
    jsHash,
    gldHash
}