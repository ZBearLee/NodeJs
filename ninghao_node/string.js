/*node.js中有一些核心库  fs专门处理文件   
 打理的不再是浏览器dom，而是打理操作系统，网络，数据库*/
const fs=require('fs');
/*压缩一下，然后往外传*/
const zlib=require('zlib');
/*文件如此之大，所以我们用文件流控制  如大视频变缓冲边播放*/
let fileReadStream=fs.createReadStream('data.json');

/*let fileWriteStream=fs.createWriteStream('data1.json');*/

let fileWriteStream=fs.createWriteStream('data1.json.gz');

/*pipe为管子，将写和读接在一起，之间为数据的流动*/
/*fileReadStream.pipe(fileWriteStream);*/
/*source 原流 */
fileWriteStream.on('pipe',(source)=>{
    console.log(source);
})
/*压缩一下   还可以继续流，所以还可以再pipe()*/
fileReadStream
.pipe(zlib.createGzip())
.pipe(fileWriteStream);
//let count=0;
/*当有数据流到达  ，node.js  读大文件   是一块一块读  文件是二进制的所有可以分块读*/
/*chunk 一个数据块*/
///fileReadStream.once('data',(chunk)=>{
    /*console.log(chunk);*/
    /*toString会输出data.json中的字符串内容*/
   //console.log(chunk.toString());

    /*写入*/
   // fileWriteStream.write(chunk);
    
//});
/*fileReadStream.once('data',(chunk)=>{*/
    /*200+kb大小分6次传输完成,读出来，读出到内存中*/
//fileReadStream.on('data',(chunk)=>{
   // console.log(`${++count}当前接收到:${chunk.length}`);
//});
/*end为结束事件*/
//fileReadStream.on('end',()=>{
   // console.log('读取完成...');
//});

//fileReadStream.on('error',(error)=>{
  //  console.log(error);
//});
