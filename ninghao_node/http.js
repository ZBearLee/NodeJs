const http = require('http');
/*一个url*/
const options = {
    protocal: 'http',
    hostname: 'api.douban.com',
    port: '80',
    method: 'GET',
    path: '/v2/movie/top250',
};
  let responseDate='';//空字符串不是null
/*response带回输出从开始到结束过程中的结果*/
const request = http.request(options, (response) => {
   // console.log(response.statusCode);
    //statusCode为请求码，返回请求的状况，返回值为200,200表示成功请求回了数据
    //console.log(response.headers);
    //文件有多大，文件类型等信息，希望在头部告知
     response.setEncoding('utf8');  //相当于toString()方法
    response.on('data', (chunk) => {
      responseDate +=chunk;  //字符串的拼接,json字符串
        console.log(chunk);
        /*  console.log(chunk.toString());*/
        }) 
  
   response.on('end',()=>{
       console.log(JSON.parse(responseData).subjects);
   })

});


request.on('error', (error) => {
    console.log(error);
})

request.end();