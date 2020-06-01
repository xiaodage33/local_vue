$.ajax({
    suc: function(){
        foo(function(){

        })

    }
})

function sync() {
    return new Promise(function(resolve, reject){
    $.ajax({
        success:function(res){
            resolve(res)
        },
        error:function(e){
            reject(e)
        }
    })
})
}

sync().then(function(res){
    return res.data
}).then(function(data){}).catch(e)
