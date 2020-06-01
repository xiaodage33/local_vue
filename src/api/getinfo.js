import service from "@/utils/request"

//获取所有
export function Getinfo(data){
    return service.request({
        method:"get",
        url:"/__api__/index",
        data,
    })

}
//一个单独接口
export function Getinfo1(data){
    return service.request({
        method:"post",
        url:"/__api__/getinfo",
        data,
    })
}

//添加一条数据

export function addinfo(data){
    return service.request({
        method:"post",
        url:"/__api__/add",
        data,
    })
}
