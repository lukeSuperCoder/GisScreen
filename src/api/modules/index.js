/*
 * @Author: daidai
 * @Date: 2021-12-23 11:18:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-28 15:10:45
 * @FilePath: \web-pc\src\api\modules\index.js
 */
import * as API from "../api";

export const paramType ={
    'big1':"/bigscreen/countUserNum", //用户总览
    'big2':"/bigscreen/countDeviceNum", //设备总览 
    'big3':"/bigscreen/sbtx", //设备提醒
    'big4':"/api/weibo/time_stats", //报警次数
    'big5':'/api/weibo',//实时预警 
    'big6':'/bigscreen/installationPlan',// 安装计划
    'big7':'/api/weibo_geom/ip_stats',// 报警排名
    'big8':'/bigscreen/centermap',// //中间地图
    'mapList': '/api/weibo_geom/all_points', //地图上点
    'getListById': '/api/weibo/with_geom', //根据类型获取列表
    'getListByGeom': '/api/weibo_geom/within', //查询范围内舆情
}
/******************      通用增删改查       ********************* */
/**
 * 通用列表
 * @param {*} param 
 */
 export const currentList =  (key,param)=> {
    return API.GET(paramType[key]+"/list", param)
}
export const currentPage =  (key,param)=> {
    return API.GET(paramType[key]+"/page", param)
}
/**
 * 查询可选择的列表
 * @param {*} param 
 */
 export const currentSelectList=  (key,param)=> {
    return API.GET(paramType[key]+"/selectList", param)
}


/**
 * 通用新增
 * @param {*} param 
 */
 export const currentSave= (key,param)=> {
    return API.POST(paramType[key]+"/save", param)
}
/**
 * 通用修改
 * @param {*} param 
 */
 export const currentUpdate=  (key,param) => {
    return API.POST(paramType[key]+"/update", param)
}

/**
 * 通用删除
 * @param {*} param 
 */
 export const currentDelete= (key,param) => {
    return API.POST(paramType[key]+"/delete", param)
}

/**
 * 通用获取所有不分页
 * @param {*} param 
 */
 export const currentSelect=  (key,param)=> {
    return API.GET(paramType[key]+"/select", param)
}

/**
 * 通用GET
 * @param {*} param 
 */
 export const currentGET=  (key,param)=> {
    return API.GET(paramType[key], param)
}
/**
 * 通用POST
 * @param {*} param 
 */
 export const currentPOST=  (key,param)=> {
    return API.POST(paramType[key], param)
}
export const currentGETById=  (key,id)=> {
    return API.GET(paramType[key]+'/'+id)
}
// 通用接口集合
export const currentApi={
    currentList,
    currentPage,
    currentSave,
    currentUpdate,
    currentDelete,
    currentSelect,
    currentSelectList,
    currentPOST,
    currentGET,
    currentGETById
}