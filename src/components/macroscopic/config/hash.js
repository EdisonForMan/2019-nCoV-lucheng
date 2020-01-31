export const tipHash = {
    qzbl: "illHash",
    zzbl: "illHash",
    yydc: "illHash",
    sqdc: "illHash",
    gld: "gldHash",
    lg: "lgHash",
    mj: "mjHash",
    people_type_1: "cultureHash",
    people_type_2: "cultureHash",
    // people_type_2: "marketHash",
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
    xqjck: "xqjckHash",
    wg: "wgHash"
}

const wgHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "Name",
        label: "名称"
    },
    {
        fieldName: "QZ_Count",
        label: "确诊人数统计"
    }, {
        fieldName: "Type",
        label: "类型"
    }, {
        fieldName: "Note",
        label: "备注"
    }]
}]
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
// 留观
const lgHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "Name",
        label: "集中隔离点名称"
    }, {
        fieldName: "Address",
        label: "地点"
    }, {
        fieldName: "Rooms",
        label: "房间数"
    }, {
        fieldName: "Using",
        label: "是否启用"
    }]
}]
// 密接
const mjHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "姓名",
        label: "姓名"
    }, {
        fieldName: "性别",
        label: "性别"
    }, {
        fieldName: "年龄",
        label: "年龄"
    }, {
        fieldName: "是否监管",
        label: "是否监管"
    }, {
        fieldName: "隔离地点",
        label: "隔离地点"
    }, {
        fieldName: "开始隔离时间",
        label: "开始隔离时间"
    }, {
        fieldName: "病人",
        label: "病人"
    }, {
        fieldName: "身份类型",
        label: "身份类型"
    }, {
        fieldName: "关系",
        label: "关系"
    }, {
        fieldName: "电话",
        label: "电话"
    }, {
        fieldName: "现住址_工作单位",
        label: "现住址_工作单位"
    }, {
        fieldName: "责任街道",
        label: "责任街道"
    }, {
        fieldName: "属地所属卫生院",
        label: "属地所属卫生院"
    }, {
        fieldName: "开始观察日期",
        label: "开始观察日期"
    }, {
        fieldName: "备注",
        label: "备注"
    }]
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
        fieldName: "MansionName",
        label: "小区（大厦）名称"
    }, {
        fieldName: "Country_1",
        label: "所属街道"
    }, {
        fieldName: "Community",
        label: "所属社区"
    }, {
        fieldName: "CommunityLink",
        label: "街道社区联系人、电话"
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
    }, {
        fieldName: "问题",
        label: "问题"
    }]
}]
// 火车
const subwayHash = [{
    type: "fields",
    fieldInfos: [{
        fieldName: "Name",
        label: "名称"
    },]
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
        fieldName: "Classify",
        label: "教别"
    },
    {
        fieldName: "ChargeMan",
        label: "负责人"
    },
    {
        fieldName: "ChargeManPhone",
        label: "联系电话"
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
    },]
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
    gldHash,
    lgHash,
    mjHash,
    wgHash
}