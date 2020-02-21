import {
  getDefaultAxios
} from "@/api/index.js";
const RES = "sql_wzxgfy";

/**
 * [lc_xqcrjl]小区出入记录
 */
export const lc_xqcrjl = async () => {
  const axios = getDefaultAxios();
  const params = ["id", "xm", "dh", "sfzh", "ssxq", "mph", "cmsj", "fhsj", "bz", "cjr"]
  const name = "community_crjl";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [lc_xqryxx]小区人员信息
 */
export const lc_xqryxx = async () => {
  const axios = getDefaultAxios();
  const params = ["id", "xm", "dh", "sfzh", "xb", "sfjh", "ssxq", "mph", "cjr", "cjsj", "bz"]
  const name = "community_ryxx";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [lc_zdjzxx]做地进展信息
 */
export const lc_zdjzxx = async () => {
  const axios = getDefaultAxios();
  const params = [
    "Id",
    "DKMC",
    "TDZSZJS1",
    "JTYY1",
    "ZRR1",
    "TDSYQ2",
    "JTYY2",
    "ZRR2",
    "JZW3",
    "JTYY3",
    "ZRR3",
    "TDZ4",
    "JTYY4",
    "ZRR4",
    "GX5",
    "JTYY5",
    "ZRR5",
    'DBFZW6',
    "JTYY6",
    "ZRR6",
    "TDWR7",
    "JTYY7",
    "ZRR7",
    "CD8",
    "JTYY8",
    "ZRR8",
    "SY9",
    "JTYY9",
    "ZRR9",
    "WQFY10",
    "JTYY10",
    "ZRR10",
    "TDSC11",
    "JTYY11",
    "ZRR11",
    "GP12",
    "JTYY12",
    "ZRR12",
    "SFZDWC",
    "ZDWCSJ",
    "ZYCZWT",
    "SSJD",
    "JDJBR",
    "JDFZR",
    "GLZD",
    "ZDWCSX"
  ]
  const name = "lc_zdjzb";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [lc_dkjbxx]地块基本信息
 */
export const lc_dkjbxx = async () => {
  const axios = getDefaultAxios();
  const params = [
    "Id",
    "SSJD",
    "DKDJ",
    "DKLX",
    "QKMC",
    "DKBH",
    "DKMC",
    "TDYT",
    "TDMJ",
    "JZMJ",
    "JZYT",
    "RJL",
    "QSJ",
    "QSLMJ",
    "CJJ",
    "PTYFMJ",
    "CJLMJ",
    "YJL",
    "JDDWMGS",
    "ZDWCSJ",
    "JHCRJE",
    "SHJCJE",
    "WTXX",
    "WTXKQD",
    "ZDXQ",
    "QKYS",
    "ZRDW",
    "ZRR",
    "ZRRLXFS",
    "CRQK",
    "GLZD",
    "ZDWCSX",
    "CRCJSJ"
  ]
  const name = "lc_dkjbxxb";
  return await axios.post("/dw/ds", option_concat(name, params));
}


/**
 * 配置
 * @param {*} name 
 * @param {*} cols 
 * @param {*} where 
 * @param {*} count 
 */
const option_concat = (name, cols, where = "", count) => {
  const option = {
    module: "dwbean",
    action: "001",
    res: RES,
    ds: {
      buffers: [],
      tables: [{
        alias: "f",
        orm: "",
        name,
        updateflag: 1
      }],
      cols: cols.map(item => {
        return {
          name: item,
          raw: `f.${item}`
        }
      }),
      module: RES,
      where,
    }
  };
  count && (option.count = count);
  return option;
}