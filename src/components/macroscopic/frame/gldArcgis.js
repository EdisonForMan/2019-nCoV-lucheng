import {
  tipHash,
  Hash
} from "../config/hash.js";
import {
  loadModules
} from "esri-loader";
import {
  OPTION
} from "@/components/common/Tmap";
const server = "http://172.20.89.68:5001/s";

export const gldChartUpdate = (context, name, bid) => {
  loadModules(
    ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
    OPTION
  ).then(async ([QueryTask, Query]) => {
    const queryTask = new QueryTask({
      url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/5`
    });
    const query = new Query();
    query.outFields = ["*"];
    query.returnGeometry = true;
    query.where = `Bid = '${bid}'`;
    const {
      fields,
      features
    } = await queryTask.execute(query);
    const fieldAliases = {};
    fields.map(item => {
      fieldAliases[item.name] = item.alias;
    });
    const list = features.map(item => {
      item.fieldAliases = fieldAliases;
      return item;
    });
    context.$parent.$refs.gldxq.list = [...list];
    context.$parent.$refs.gldxq.title = name;
  });
};