
//构造随机食物函数
(function(w){
	//声明一个list来存放食物
	var list=[];
	function Food(width,height,bgColor,x,y){
		this.width=width||20;
		this.height=height||20;
		this.bgColor=bgColor||'green';
		this.x=x||0;
		this.y=y||0;
	}
	//创造一个div来存放食物信息
	Food.prototype.render=function(map){
		remove(map);
		this.x=Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
		this.y=Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
		var div1=document.createElement('div');
		div1.style.width=this.width+'px';
		div1.style.height=this.height+'px';
		div1.style.backgroundColor=this.bgColor;
		div1.style.position='absolute';
		div1.style.left=this.x+'px';
		div1.style.top=this.y+'px';
		map.appendChild(div1);

		list.push(div1);
	}

	//删除老食物
	function remove(map){
		for(var i=0;i<list.length;i++){
			map.removeChild(list[i]);
		}
		list.length=0;

	}


	var map=document.getElementById('map');
	var f1=new Food();
	f1.render(map);
	w.f1=f1;
}(window));//封装食物函数

//创建蛇

	var list=[];
	function snake(width,height,direction){
		this.width=width||20;
		this.height=height||20;
		this.direction=direction||'right';//移动方向默认向右
		//用数组来表示蛇的身体，方便蛇吃到食物后方便直接在数组尾部添加元素
    	this.body=[
    	{x:3,y:1,bgColor:"red"},
    	{x:2,y:1,bgColor:"blue"},
    	{x:1,y:1,bgColor:"yellow"},
    	];
	}


	//把创建的蛇渲染到地图上
	snake.prototype.render=function(map){
		remove(map);
		for(var i=0;i<this.body.length;i++){
			var div1=document.createElement('div');
			div1.style.width=this.width+'px';
			div1.style.height=this.height+'px';
			div1.style.backgroundColor=this.body[i].bgColor;
			div1.style.position='absolute';
			div1.style.left=this.body[i].x*this.width+'px';
			div1.style.top=this.body[i].y*this.height+'px';
			map.appendChild(div1);
		
			list.push(div1);
		}
	};
	snake1=new snake();
	snake1.render(map);




	//删除老蛇
	function remove(map){
		for(var i=0;i<list.length;i++){
			map.removeChild(list[i]);
		}
		list.length=0;
	}

	
(function(w){


	//让蛇移动起来
	snake.prototype.move=function(food){
		//蛇身体移动
		for(var i=this.body.length-1;i>0;i--){
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}
		//蛇头移动
		switch(this.direction){
			case 'right':
				this.body[0].x++;
				break;
			case 'left':
				this.body[0].x--;
				break;
			case 'top':
				this.body[0].y--;
				break;
			case 'bottom':
				this.body[0].y++;
				break;
		}
	}
	//调用蛇的移动
	snake1.move();
	//用新蛇坐标重新渲染地图
	snake1.render(this.map);

	//让蛇不停动起来
	setInterval(function(){
		snake1.move();
		//判断蛇是否出界
		var snakeHeadx=this.snake1.body[0].x*this.snake1.width;
		var snakeHeady=this.snake1.body[0].y*this.snake1.height;
		if(snakeHeadx<0||snakeHeady<0||snakeHeadx>=this.map.offsetWidth||snakeHeady>=this.map.offsetHeight){

			alert('游戏结束！！！');
			return;
		}

		//吃食物长身体
		var foodx=f1.x;
		var foody=f1.y;
		var lastsnakeUnit=this.snake1.body[this.snake1.body.length-1];
		
		if(snakeHeadx==foodx&&snakeHeady==foody) {
			this.snake1.body.push({
				x:lastsnakeUnit.x,
				y:lastsnakeUnit.y,
				bgColor:randomColor()//长出随机颜色的身体
			});
			//食物被吃之后产生新的随机的食物
			f1.render(map);
		}


		//产生随机颜色
		function randomColor(){
			var arr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
			var str='#';
			for(var i=0;i<6;i++){
				var num=Math.floor(Math.random()*16);
				str+=arr[num];
			}
			return str;
		}

		snake1.render(this.map);//将动起来的蛇传入地图

	},200);//控制蛇的移速 单位毫秒 每多少毫秒移动一格


	

	//键盘控制蛇
	document.onkeydown=function(e){
		e=e||window.event;
		switch(e.keyCode){
			case 37:
				snake1.direction='left';
				break;
			case 38:
				snake1.direction='top';
				break;
			case 39:
				snake1.direction='right';
				break;
			case 40:
				snake1.direction='bottom';
				break;
		}
	};


}(window));//封装蛇的函数


