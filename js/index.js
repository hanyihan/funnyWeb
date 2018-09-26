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
	console.log(clist);
	var now = 0;
	
	window.onresize = function(){
		contentbind();
		clist.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight) + 'px';
		arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
	}
	
	contentbind();
	
	function contentbind(){
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		for(let i = 0; i < cliNodes.length; i++ ){
			cliNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + 'px';
		}
	}
	
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
			
			//。up 切换 和 移动arrow
			function move (index){
				for(var j = 0; j < upNodes.length; j++) {
					upNodes[j].style.width = '0';
				}
				upNodes[index].style.width = '100%';
				arrow.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
				clist.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
			}
		}
	}
}
