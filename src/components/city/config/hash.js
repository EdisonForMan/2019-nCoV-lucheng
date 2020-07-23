export const tipHash = {
    jdbsc: "pointHash",
    jdwhz: "pointHash",
    sq: "pointHash",
    sqzhfw: "pointHash",
    xqd: "pointHash",
    cxjhb: "pointHash",
    yey: "pointHash",
    xzc: "pointHash",
    sydj: "pointHash",
    bjxx: "pointHash",
    gy: "pointHash",
    gc: "pointHash",
    ggwhss: "pointHash",
    jq: "pointHash",
    stsd: "pointHash",
    fd: "pointHash",
    nmsc: "pointHash",
    cg: "pointHash",
    ckdw: "pointHash",
    cs: "pointHash",
    jtlk: "pointHash",
    dyy: "pointHash",
    jzgd: "pointHash",
    hd: "pointHash",
    xxzb: "pointHash",
    xxxn: "pointHash",
    pxjg: "pointHash",
    fdz: "pointHash",
    wb: "pointHash",

    xq: "xqHash",
    wg: "wgHash",
}


// 点
const pointHash = [{
    fieldName: "NAME",
    label: "名称"
}, {
    fieldName: "TYPE",
    label: "类型"
}, {
    fieldName: "District",
    label: "所属街道"
}]


// 线
const lineHash = [{
    fieldName: "NAME",
    label: "名称"
}, {
    fieldName: "TYPE",
    label: "类型"
}]


// 建筑工地
const jzgdHash = [{
    fieldName: "NAME",
    label: "名称"
}, {
    fieldName: "备注",
    label: "地址"
}, {
    fieldName: "TYPE",
    label: "类型"
}]


// 社区
const wgHash = [{
    fieldName: "Name",
    label: "名称"
}, {
    fieldName: "jd",
    label: "街镇"
}, {
    fieldName: "jwh",
    label: "居委会、村委会名称"
}, {
    fieldName: "sq",
    label: "社（小）区、自然村名称"
}, {
    fieldName: "wgpzlxdh",
    label: "网格片长（街镇领导）联系电话"
}, {
    fieldName: "wgpzxm",
    label: "网格片长（街镇领导）姓名"
}, {
    fieldName: "wgzdylxdh",
    label: "网格指导员（楼栋长）联系电话"
}, {
    fieldName: "wgzdyxm",
    label: "网格指导员（楼栋长）姓名"
}, {
    fieldName: "wgzlxdh",
    label: "网格长（社区主任）联系电话"
}, {
    fieldName: "wgzxm",
    label: "网格长（社区主任）姓名"
}]

// 小区
const xqHash = [{
    fieldName: "MansionName",
    label: "小区（大厦）名称"
}, {
    fieldName: "Country_1",
    label: "所属街道"
}, {
    fieldName: "Community",
    label: "所属社区"
}, {
    fieldName: "HousingAuthorityChargeMan",
    label: "房管中心联系人"
}, {
    fieldName: "HousingAuthorityChargeManPhone",
    label: "房管中心联系电话"
}, {
    fieldName: "MansionChargeMan",
    label: "小区管理处负责人"
}, {
    fieldName: "MansionChargeMan",
    label: "小区管理处负责人"
}, {
    fieldName: "MansionChargeManPhone",
    label: "小区管理处负责人联系方式"
}, {
    fieldName: "PropertyName",
    label: "物业服务企业名称"
}]



export const Hash = {
    pointHash,
    lineHash,
    jzgdHash,
    wgHash,
    xqHash
}





export const csSortHash = {
    街道办事处: 0,
    街道综合文化站: 1,
    社区: 2,
    社区综合文化服务中心: 3,
    主干道: 4,
    次干道: 5,
    幼儿园: 6,
    中学: 7,
    "长途汽车客运站（码头）": 8,
    "政务大厅（行政服务中心）": 9,
    "农贸（集贸）市场": 10,
    银行网点: 11,
    医院: 12,
    主要交通路口: 13,
    电影院: 14,
    建筑工地: 15
}



export const countryList = [
    "全区",
    "南郊街道",
    "南汇街道",
    "五马街道",
    "山福镇",
    "藤桥镇",
    "仰义街道",
    "丰门街道",
    "双屿街道",
    "广化街道",
    "松台街道",
    "大南街道",
    "蒲鞋市街道",
    "滨江街道",
    "七都街道"
]


/* export const csMap = {
    街道办事处: "街道办事处",
    街道综合文化站: "街道综合文化站",
    社区: "社区",
    社区综合文化服务中心: "社区综合文化服务中心",
    主干道: "主干道",
    次干道: "次干道",
    幼儿园: "幼儿园",
    中学: "中学",
    长途汽车客运站: "长途汽车客运站（码头）",
    政务大厅: "政务大厅（行政服务中心）",
    农贸市场: "农贸（集贸）市场",
    银行网点: "银行网点",
    医院: "医院",
    主要交通路口: "主要交通路口",
    电影院: "电影院",
    建筑工地: "建筑工地"
} */

export const csMap = {
    街道办事处: {
        name: `街道办事处`,
        id: "jdbsc"
    },
    街道综合文化站: {
        name: `街道综合文化站`,
        id: "jdwhz"
    },
    社区: {
        name: `社区`,
        id: "sq"
    },
    社区综合文化服务中心: {
        name: `社区综合文化服务中心`,
        id: "sqfwzx"
    },
    主干道: {
        name: `主干道`,
        id: "zgd"
    },
    次干道: {
        name: `次干道`,
        id: "cgd"
    },
    幼儿园: {
        name: `幼儿园`,
        id: "yey"
    },
    中学: {
        name: `中学`,
        id: "zx"
    },
    长途汽车客运站: {
        name: `长途汽车客运站（码头）`,
        id: "mt"
    },
    政务大厅: {
        name: `政务大厅（行政服务中心）`,
        id: "zwdt"
    },
    农贸市场: {
        name: `农贸（集贸）市场`,
        id: "nm"
    },
    银行网点: {
        name: `银行网点`,
        id: "yh"
    },
    医院: {
        name: `医院`,
        id: "yy"
    },
    主要交通路口: {
        name: `主要交通路口`,
        id: "jtlk"
    },
    电影院: {
        name: `电影院`,
        id: "dyy"
    },
    建筑工地: {
        name: `建筑工地`,
        id: "jzgd"
    }
}





export const TypeHash = {
    "街道办事处": 1,
    "街道综合文化站": 2,
    "社区": 3,
    "社区综合文化服务中心": 4,
    "小区": 5,
    "城乡结合部": 6,
    "乡镇综合文化站": 7,
    "建成区外社区": 8,
    "主次干道": 9,
    "背街小巷": 10,
    "公共广场、公园": 11,
    "公共卫生间": 12,
    "公共文化设施": 13,
    "景点景区": 14,
    "实体书店": 15,
    "饭店、宾馆": 16,
    "农贸市场": 17,
    "餐馆、餐饮店": 18,
    "窗口单位": 19,
    "商场、超市": 20,
    "交通路口": 21,
    "电影院": 22,
    "建筑工地": 23,
    "河道": 24,
    "学校周边环境": 25,
    "学校校内": 26,
    "校外培训机构": 27,
    "辅导站": 28,
    "网吧": 29
}