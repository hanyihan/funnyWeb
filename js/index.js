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
	
	//第一屏
	var home1liNodes =  document.querySelectorAll("#content .list .home .home1 > li");
	var home2liNodes =  document.querySelectorAll("#content .list .home .home2 > li");
	var home1 = document.querySelector("#content .list .home .home1");
	
	
	var now = 0;
	var timer = 0;
	
	var oldIndex = 0;
	var timer3D = "dhaoengha";
	var autoIndex = 0;
	
	
	
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
	}
}
