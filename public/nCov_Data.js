/**
 * daily update
 * created by eds 2020/2/2
 */
const nCov_luchengData = {
    /** 防疫布控  */
    macroscopic: {
        /** daily  */
        death: 0,               //  死亡
        cure: 1,                //  治愈
        /** leftOptions  */
        lc: {
            qzbl: 41,           //  确诊病例
            zzbl: 24,           //  疑似病例 
            yydc: 26,
            sqdc: 7,
            gld: 18,
            jjgl: 2416,
            mj: 337,
            hbhw: 1305
        },
        lc_yt: {
            qzbl: 20,
            zzbl: 5,
            ytyg: 575,
            gld: 18,
            mj: 193
        },
        highway_type_1: 4,
        highway_type_2: 1,
        people_type_1: 110,
        people_type_2: 91,
        people_type_3: 10,
        people_type_6: 93,
        people_type_7: 28,
        people_type_8: 24,
        people_type_9: 41,
        people_type_10: 14,
        people_type_11: 4,
        people_type_12: 251,
        clinic_type_1: 8,
        clinic_type_2: 1,
        clinic_type_3: 122,
        clinic_type_5: 8,
        clinic_type_7: 1,
        jzgd: 195,
        nj_zdqy: 30,
        nj_xm_1: 5,
        nj_xm_2: 14,
    },
}

window.nCov_luchengData = nCov_luchengData;