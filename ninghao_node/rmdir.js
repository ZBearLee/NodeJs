const fs=require('fs');


/*
文件夹里还有内容不能删除文件夹
两件事，删除目录，之前先将内部的目录或文件清空   
另外一件事就是清空文件夹的内部*/
fs.readdirSync('logs').map((file)=>{
    fs.unlink(`logs/${file}`,(error)=>{
        if(error){
        console.log(error);
        }else{
            console.log(`成功删除了文件:${file}`);
        }
    })
})



fs.rmdir('logs',(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('成功删除了目录:logs');
    }
})