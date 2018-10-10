window.onload=function(){
	//header 导航栏切换
	
	//获取dom节点
	var liNodes = document.querySelectorAll('.headmain>.nav>.list>li');
	var upNodes = document.querySelectorAll('.headmain>.nav>.list>li>a .up');
	var arrow = document.querySelector('.arrow');
	var firstLiNodes = liNodes[0];
	var firstUpNodes = firstLiNodes.querySelector('.up');
	
	var head = document.querySelector("#head");
	var content = document.querySelector("#content");
	var cliNodes = document.querySelectorAll("#content .list > li");
	var clist = document.querySelector('#content .list');
	
	var aboutUL = document.querySelectorAll("#content .list .about .about3 .item>ul");
	
	//第一屏
	var home1liNodes =  document.querySelectorAll("#content .list .home .home1 > li");
	var home2liNodes =  document.querySelectorAll("#content .list .home .home2 > li");
	var home1 = document.querySelector("#content .list .home .home1");
	
	//第五屏
	var team3 = document.querySelector("#content .list .team .team3");
	var team3Ul = team3.querySelector("ul");
	var team3Lis = team3Ul.querySelectorAll("li");
	
	//右侧dot
	var dots = document.querySelectorAll(".dot>li");
	
	//当前显示的那个
	var now = 0;
	var timer = 0;
	
	//显示的上一个
	var prevIndex = 0;
	
	//3D转换
	var oldIndex = 0;
	var timer3D = "dhaoengha";
	var autoIndex = 0;
	
	
	//每一屏出入场动画
	 var anArr = [
	 //第一屏
	 	{
	 		inAn:function(){
	 			var home2 = document.querySelector("#content .list .home .home2");
	 			
	 			home1.style.transform = "translateY(0)";
	 			home2.style.transform = "translateY(0)";
	 			home1.style.opacity = 1;
	 			home2.style.opacity = 1;
	 		},
	 		outAn:function(){
	 			var home2 = document.querySelector("#content .list .home .home2");
	 			
	 			home1.style.transform = "translateY(-400px)";
	 			home2.style.transform = "translateY(100px)";
	 			home1.style.opacity = 0;
	 			home2.style.opacity = 0;
	 		}
	 	},
	 	//第二屏
	 	{
	 		inAn:function(){
	 			var plane1 = document.querySelector("#content .list .course .plane1");
	 			var plane2 = document.querySelector("#content .list .course .plane2");
	 			var plane3 = document.querySelector("#content .list .course .plane3");
	 			
	 			plane1.style.transform = "translate(0px,0px)";
	 			plane2.style.transform = "translate(0px,0px)";
	 			plane3.style.transform = "translate(0px,0px)";
	 		},
	 		outAn:function(){
	 			var plane1 = document.querySelector("#content .list .course .plane1");
	 			var plane2 = document.querySelector("#content .list .course .plane2");
	 			var plane3 = document.querySelector("#content .list .course .plane3");
	 			
	 			plane1.style.transform = "translate(-200px,-200px)";
	 			plane2.style.transform = "translate(-200px,200px)";
	 			plane3.style.transform = "translate(200px,-200px)";
	 			
	 		}
	 	},
	 	{
	 		inAn:function(){
	 			
	 		},
	 		outAn:function(){
	 			
	 		}
	 	},
	 	{
	 		inAn:function(){
	 			
	 		},
	 		outAn:function(){
	 			
	 		}
	 	},
	 	{
	 		inAn:function(){
	 			
	 		},
	 		outAn:function(){
	 			
	 		}
	 	}
	 ];
	 
	 for(var i = 0;i < anArr.length; i++ ) {
	 	anArr[i].outAn();
	 }
	 
	 setTimeout(function(){
	 	anArr[0].inAn();
	 },2000)
	
	//第五屏气泡效果
	pop();
	function pop() {
		var oc = null;
		var timer1 = 0;
		var timer2 = 0;
		for(var i = 0; i < team3Lis.length; i++) {
			team3Lis[i].onmouseenter = function() {
				for(var j = 0; j < team3Lis.length; j++) {
					team3Lis[j].style.opacity = 0.2;
				}
				this.style.opacity = 1;
				addCanvas();
				oc.style.left = this.offsetLeft + 'px';
			}
		}
		
		function addCanvas() {
			if(!oc) {
				oc = document.createElement("canvas");
				oc.width = team3Lis[0].offsetWidth;
				oc.height = team3Lis[0].offsetHeight * 2 / 3;
				
				team3.onmouseleave = function(){
					for(var k = 0; k < team3Lis.length; k++) {
						team3Lis[k].style.opacity = 1;
					}
					removeCanvas();
					
				}
				
				team3.appendChild(oc);
				Qipao();
			}
		}
		
		function removeCanvas(){
			oc.remove();
			oc = null;
			clearInterval(timer1);
			clearInterval(timer2);
			
		}
		
		function Qipao() {
			if(oc.getContext) {
				var ctx = oc.getContext("2d");
		
				var arr = [];
		
				//将数组中的圆绘制到画布上
				timer1 = setInterval(function() {
					ctx.clearRect(0, 0, oc.width, oc.height);
					//动画
					for(var i = 0; i < arr.length; i++) {
						arr[i].deg += 10;
						arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step * 2;
						arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step;
		
						if(arr[i].y <= 50) {
							arr.splice(i, 1)
						}
					}
		
					//绘制
					for(var i = 0; i < arr.length; i++) {
						ctx.save();
						ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].alp + ")";
						ctx.beginPath();
						ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);
						ctx.fill();
						ctx.restore();
					}
				}, 1000 / 60)
		
				//往arr中注入随机圆的信息
				timer2 = setInterval(function() {
					var r = Math.random() * 6 + 2;
					var x = Math.random() * oc.width;
					var y = oc.height - r;
					var red = Math.round(Math.random() * 255);
					var green = Math.round(Math.random() * 255);
					var blue = Math.round(Math.random() * 255);
					var alp = 1;
		
					var deg = 0;
					var startX = x;
					var startY = y;
					//曲线的运动形式
					var step = Math.random() * 20 + 10;
					arr.push({
						x: x,
						y: y,
						r: r,
						red: red,
						green: green,
						blue: blue,
						alp: alp,
						deg: deg,
						startX: startX,
						startY: startY,
						step: step
					})
				}, 50)
			}
		}
	}
	
	
	
	
	//第四屏图片切换
	picBoom();
	function picBoom(){
		for(var i = 0; i < aboutUL.length; i++) {
			change(aboutUL[i]);
		}
		
		function change(UL) {
			var src = UL.dataset.src;
			var w = UL.offsetWidth/2;
			var h = UL.offsetHeight/2;
			for(var i =0; i<4; i++) {
				var liNodes = document.createElement("li");
				liNodes.style.width = w + 'px';
				liNodes.style.height = h + 'px';
				var imgNode = document.createElement("img");
				
				imgNode.style.left = -(i%2)*w + 'px';
				imgNode.style.top = -Math.floor(i/2)*h + 'px';
				imgNode.src = src;
				
				liNodes.appendChild(imgNode);
				UL.appendChild(liNodes);
				
				UL.onmouseenter = function() {
					var imgNodes = this.querySelectorAll("li>img");
					
					imgNodes[0].style.top = h + 'px';
					imgNodes[1].style.left = -2*w + 'px';
					imgNodes[2].style.left = w + 'px';
					imgNodes[3].style.top = -2*h + 'px';
				}
				
				UL.onmouseleave = function() {
					var imgNodes = this.querySelectorAll("li>img");
					
					imgNodes[0].style.top = 0 + 'px';
					imgNodes[1].style.left = -w + 'px';
					imgNodes[2].style.left = 0 + 'px';
					imgNodes[3].style.top = -h + 'px';
				}
			}
		}
	}
	
	//第一屏点击切换
	home3D();
	function home3D() {
		for(var i = 0; i < home2liNodes.length; i++) {
			home2liNodes[i].index = i;
			home2liNodes[i].onclick = function(){
				clearInterval(timer3D);
				//循环将所有li的背景去掉
				for(var k = 0; k< home2liNodes.length;k++) {
					home2liNodes[k].classList.remove("on");
				}
				//为当前点击的li 添加背景
				this.classList.add("on");
				
				//判断 当前点击的li比老的li大小，大于则为当前li添加rightshow，小于则添加leftshow
				
				if(this.index > oldIndex) {
					home1liNodes[this.index].classList.remove("leftshow");
					home1liNodes[this.index].classList.remove("righthide");
					home1liNodes[this.index].classList.remove("lefthide");
					
					home1liNodes[this.index].classList.add("rightshow");
					
					home1liNodes[oldIndex].classList.remove("leftshow");
					home1liNodes[oldIndex].classList.remove("rightshow");
					home1liNodes[oldIndex].classList.remove("righthide");
					
					home1liNodes[oldIndex].classList.add("lefthide");
					
				}
				
				if(this.index < oldIndex) {
					home1liNodes[this.index].classList.remove("rightshow");
					home1liNodes[this.index].classList.remove("righthide");
					home1liNodes[this.index].classList.remove("lefthide");
					
					home1liNodes[this.index].classList.add("leftshow");
					
					home1liNodes[oldIndex].classList.remove("leftshow");
					home1liNodes[oldIndex].classList.remove("rightshow");
					home1liNodes[oldIndex].classList.remove("lefthide");
					
					home1liNodes[oldIndex].classList.add("righthide");
					
				}
				
				//切换后当前的就变成了老的
				oldIndex = this.index;
				
				
				//自动和手动联系，需要让自动的知道当前显示的是哪一个
				autoIndex = this.index;
			}
		}
	}
	
	move3D();
	function move3D() {
		clearInterval(timer3D);
		timer3D = setInterval(function(){
			autoIndex++;
			
			if(autoIndex == home1liNodes.length) {
				autoIndex = 0;
			}
			
			for(var k = 0; k < home2liNodes.length; k++) {
				home2liNodes[k].classList.remove("on");
			}
			
			home2liNodes[autoIndex].classList.add("on");
			
			home1liNodes[autoIndex].classList.remove("leftshow");
			home1liNodes[autoIndex].classList.remove("righthide");
			home1liNodes[autoIndex].classList.remove("lefthide");
			
			home1liNodes[autoIndex].classList.add("rightshow");
			
			home1liNodes[oldIndex].classList.remove("leftshow");
			home1liNodes[oldIndex].classList.remove("rightshow");
			home1liNodes[oldIndex].classList.remove("righthide");
			
			home1liNodes[oldIndex].classList.add("lefthide");
			
			oldIndex = autoIndex;
		},2000)
	}
	
	home1.onmouseenter = function(){
		clearInterval(timer3D);
	}
	
	home1.onmouseleave = function(){
		move3D();
	}
	
	
	//视窗改变时改变ul的top值完成动画切换。同时导航栏完成切换
	window.onresize = function(){
		contentbind();
		clist.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight) + 'px';
		arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
	}
	
	//为content 添加滚动监听时间
	//Firefox
	if(content.addEventListener) {
		content.addEventListener("DOMMouseScroll",function(ev){
			ev = ev || event;
			clearTimeout(timer);
			//这个延时保证用户滚多次下，页面只切换一次
			timer = setTimeout(function(){
				fn(ev);
			},200)
		});
	}
	
	//IE / Chrome
	content.onmousewheel = function(ev){
		ev = ev || event;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn(ev);
		}, 200)
	}
	
	//判断滚轮方向以及与页面滚动联动
	function fn(ev) {
		ev = ev || event;
		var dir = "";
		//IE / Chrome
		if(ev.wheelDelta) {	
			dir = ev.wheelDelta > 0? "up" : "down";
		}
		
		//Firefox
		else if (ev.detail) {
			dir = ev.detail < 0? "up" : "down";
		}
		
		prevIndex = now;
		switch(dir) {
			case "up":
				if(now > 0) {
					now--;
					move(now);
				}
				break;
			case "down":
				if(now < cliNodes.length - 1) {
					now++;
					move(now);
				}
		}
	}
	
	
	//动态计算content内容的高度
	contentbind();
	function contentbind(){
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		for(let i = 0; i < cliNodes.length; i++ ){
			cliNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		}
	}
	
	//导航的绑定切换
	headbind();
	function headbind(){
		firstUpNodes.style.width = '100%';
		arrow.style.left = firstLiNodes.offsetLeft + firstLiNodes.offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
		
		//为每个li 添加click 事件
		for(var i = 0; i < liNodes.length; i++) {
			liNodes[i].index = i;
			liNodes[i].onclick = function() {
				prevIndex = now;
				move(this.index);
				now = this.index;
			}
			
		}
		for(var i =0; i < dots.length; i++) {
			dots[i].index = i;
			dots[i].onclick = function(){
				prevIndex = now;
				move(this.index);
				now = this.index;
			}
		}
	}
	
	//up 切换 和 移动arrow
	function move (index){
		for(var j = 0; j < upNodes.length; j++) {
			upNodes[j].style.width = '0';
		}
		upNodes[index].style.width = '100%';
		arrow.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
		clist.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
		
		for(var k = 0; k < dots.length; k++) {
			dots[k].className = "";
		}
		
		dots[index].className = "active";
		
		
		//出入场函数判断执行
		if(anArr[index] && typeof anArr[index]["inAn"] === "function") {
			anArr[index]["inAn"]();
		}
		
		if(anArr[prevIndex] && typeof anArr[prevIndex]["outAn"] === "function") {
			anArr[prevIndex]["outAn"]();
		}
	}
}
