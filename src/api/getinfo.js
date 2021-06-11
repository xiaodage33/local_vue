import service from "@/utils/request"
//学生Student
export function Getinfo_Stu(data){
    return service.request({
        method:"get",
        url:"/__api__/stu/index",
        data,
    })
}
//一个单独接口sousuo 搜索
export function Getinfo1(data){
    return service.request({
        method:"post",
        url:"/__api__/stu/getinfo",
        data,
    })
}
//添加一条数据
export function addinfo(data){
    return service.request({
        method:"post",
        url:"/__api__/stu/add",
        data,
    })
}
//del删除
export function delinfo(data){
    return service.request({
        method:"post",
        url:"/__api__/stu/del",
        data,
    })
}
//修改学生信息
export function editinfo(data){
    return service.request({
        method:"post",
        url:"/__api__/stu/edit",
        data,
    })
}
//公司测试系统后台运维平台
//获取所有查询所有 traefik的ingress
export function Getinfo(data){
    return service.request({
        method:"get",
        url:"/__api__/trae/trae",
        data,
    })
}
export function k8slog(data){
    return service.request({
        method:"get",
        url:"/__api__/k8s/log",   //显示所有pod名字和状态
        data,
    })
}
export function LogInfo(data){
    return service.request({
        method:"post",
        url:"/__api__/k8s/loginfo",   //显示日志
        data,
    })
}
export function getError(data){
    return service.request({
        method:"get",
        url:"/__api__/k8s/errorlog",   //显示pod错误数量和名字
        data,
    })
}
export function getError_file(data){
    return service.request({
        method:"get",
        url:"/__api__/k8s/errorlogfile",   //显示pod错误数量和名字在文件中查询不是实时那么慢
        data,
    })
}
export function getTraceId(data){
    return service.request({
        method:"post",
        url:"/__api__/k8s/traceid",   //显示traceId 链路
        data,
    })
}