const fs=require('fs');

/*有可能会出错，先亮出    第二个参数为返回的结果*/
fs.stat('index.js',(error,stats)=>{
    /*发生错误时怎么办*/
    if(error){
        /*文件不存在  文件异常   路径错误  死机  io忙*/
     console.log(error);
    }else{
        console.log(stats);
        console.log(`文件:${stats.isFile()?'是':'否'}`);
        console.log(`文件夹:${stats.isDirectory()?'是':'否'}`);
    }
})

fs.mkdir('logs',(error)=>{
    if(error){
        console.log(JSON.stringify(error));
    }else{
        console.log('成功创建目录:logs');
    }
});
