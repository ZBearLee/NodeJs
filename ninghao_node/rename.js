const fs=require('fs');
fs.rename('logs/gretting.log','logs/hello.log',(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('重命名成功');
    }
})