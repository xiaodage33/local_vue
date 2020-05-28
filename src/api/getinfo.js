import service from "@/utils/request"

export function Getinfo(data){
    return service.request({
        method:"get",
        url:"/__api__/index",
        data
    })

}

