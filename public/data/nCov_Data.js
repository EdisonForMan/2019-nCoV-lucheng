/**
 * daily update
 * created by eds 2020/2/2
 */
const nCov_luchengData = {
    /** 防疫布控  */
    macroscopic: {
        updateTime: "2020年2月2日24点",
        /** daily  */
        death: 0,               //  死亡
        cure: 1,                //  治愈
        /** leftOptions  */
        lc: {
            qzbl: 41,           //  确诊病例
            zzbl: 18,           //  疑似病例 
            // yydc: 26,
            // sqdc: 7,
            gld: 38,            //  隔离点
            gld_list: 1350,     //  隔离点人员
            jjgl: 2314,         //  居家隔离人员
            mj: 337,            //  密切接触者
            hbhw: 1305          //  湖北回鹿人员信令
        },
        lc_yt: {
            qzbl: 20,           //  确诊病例（银泰）
            zzbl: 5,            //  疑似病例（银泰）
            ytyg: 575,          //  银泰员工（银泰）
            gld: 38,            //  隔离点 
            gld_list: 1350,     //  隔离点人员
            mj: 193             //  密切接触者（银泰）
        },
        highway_type_1: 4,      //  高速卡口
        highway_type_2: 1,      //  火车站
        people_type_1: 110,     //  佛道宗教活动场所
        people_type_2: 91,      //  天基宗教活动场所
        people_type_3: 10,      //  专业市场
        people_type_6: 93,      //  城市书房
        people_type_7: 28,      //  健身房
        people_type_8: 24,      //  商场超市
        people_type_9: 41,      //  农贸市场
        people_type_10: 14,     //  博物馆
        people_type_11: 4,      //  文化场所
        people_type_12: 251,    //  民办培训机构
        people_type_13: 1,      //  伊斯兰教宗教活动场所
        clinic_type_1: 8,       //  发热门诊
        clinic_type_2: 1,       //  定点救治医院
        clinic_type_3: 122,     //  其他专科医院
        clinic_type_5: 8,       //  医保药房
        clinic_type_7: 1,       //  疾控中心
        jzgd: 195,              //  建筑工地信息
        nj_zdqy: 30,            //  南郊重点企业
        nj_xm_1: 5,             //  南郊街道自建项目企业
        nj_xm_2: 14,            //  南郊街道在建项目企业
    },
}

window.nCov_luchengData = nCov_luchengData;