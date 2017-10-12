/*require模块引入*/
/*EventEmitter是一个抽象类*/
const EventEmitter=require('events');
/*es6中JavaScript有了class类*/
class Player extends EventEmitter{}


/*var player实例化*/
let player=new Player();
/*  player.once('play',(track)=>{只执行一次,只能输出一个结果*/
  player.on('play',(track)=>{
      console.log(`正在播放:《${track}》`);
  }) ;

/*触发事件*/
  player.emit('play','光辉岁月');
  player.emit('play','海阔天空');

