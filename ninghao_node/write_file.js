const fs=require('fs');
fs.writeFile('logs/hello.log','你好 ~ \n',(error)=>{
    if(error){
    console.log(error);
    }else{
        console.log('成功写入文件');
    }
});

 const EventEditter=require('event');
 class 
player.on('play', (track)=>{
  fs.appendFile('logs/play.log', `play: ${track} \n`, (error)=>{
    if(error){
      console.log(error);
    }else{
      console.log('成功写入文件');
    }
  });
});


