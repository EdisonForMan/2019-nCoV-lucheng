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
        url: "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/fangkong_wz/MapServer",
        sublayers: "0",
        icon: "确诊病例",
        check: true
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
}
]