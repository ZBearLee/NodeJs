const fs=require('fs');

fs.readFile('logs/hello.log',(error,data)=>{
/*fs.readFile('logs/hello.log','utf8',(error,data)=>{*/
    if(error){
        console.log('error');
    }else{
      /*  console.log(data);  与uft8结合使用*/
           console.log(data.toString());
    }
})