export const mapImageLayerList = {
    gdjt: {
        url: "http://61.153.29.236:8111/arcgis/rest/services/wzztt/MapServer",
        sublayers: [1],
        order: 2,
        id: "gdjt",
        legend: "轨道交通",
        tag: "gdjtTag"
    },
    ylzy: {
        url: "http://172.20.83.215:6080/arcgis/rest/services/WZZD/POI/MapServer",
        sublayers: [0],
        order: 2,
        id: "ylzy",
        legend: "医疗资源",
        tag: "ylzyTag"
    },
    jyzy: {
        url: "http://172.20.83.215:6080/arcgis/rest/services/WZZD/POI/MapServer",
        sublayers: [1],
        order: 2,
        id: "jyzy",
        legend: "教育资源",
        tag: "jyzyTag"
    }
}