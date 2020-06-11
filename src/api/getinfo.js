import service from "@/utils/request"

//获取所有查询所有 traefik的ingress
export function Getinfo(data){
    return service.request({
        method:"get",
        url:"/__api__/trae/trae",
        data,
    })
}


//学生Student
export function Getinfo_Stu(data){
    return service.request({
        method:"get",
        url:"/__api__/stu/index",
        data,
    })

}

//一个单独接口sousuo
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
//修改
export function editinfo(data){
    return service.request({
        method:"post",
        url:"/__api__/stu/edit",
        data,
    })
}

export function k8slog(data){
    return service.request({
        method:"get",
        url:"/__api__/k8s/log",   //显示pod
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

