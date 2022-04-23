
exports.responseData=function(code,data){

    let msg='';
    if(code==0){
        msg="成功"
    }
    else if(code==1){
        msg="网络不稳定"
    }
    else if(code==2){
        msg="账号已注册,不可重复注册"
    }
    else if(code==-1){
        msg="数据获取失败,数据可能为空"
    }
    return{
        code:code,
        msg:msg,
        data:data
    }
};