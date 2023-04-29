
exports.hello = (ctx,next)=>{
    ctx.body = 'hello'
}


exports.user = (ctx,next)=>{
    ctx.body = {
        name:'name',
        age:'age'

    }
}