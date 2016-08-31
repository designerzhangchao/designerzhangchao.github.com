;(function($){
	var Dialog = function(config){
		var _this = this;
		//默认参数
		this.config = {
			//对话框的宽
			width:"auto",
			height:"auto",
			//对话框的提示信息
			message:null,
			//对话框类型
			type:"waiting",
			//按钮配置
			buttons:null,
			//弹出框延迟多久关闭
			delay:null,
		}

		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config)
		}else{
			this.isConfig = true;
		}

		//create DOM
		this.body = $('body');
		this.mask = $('<div class="g-dialog-container">');
		this.win = $('<div class="dialog-window">');
		this.winHeader = $('<div class="dialog-header">');
		this.winContent = $('<div class="dialog-content">');
		this.winFooter = $('<div class="dialog-footer">');

		//渲染DOM
		this.creat();

	};
	Dialog.prototype = {
		animate:function(){
			var _this = this;
			this.win.css('-webkit-transform','scale(0,0)');
			window.setTimeout(function(){
				_this.win.css('-webkit-transform','scale(1,1)');
			},100)
			
		},
		creat:function(){
			var _this = this,
				config = this.config,
				mask = this.mask,
				win = this.win,
				header = this.winHeader,
				content = this.winContent,
				footer = this.winFooter,
				body = this.body;

			if(this.isConfig){
				win.append(header.addClass('loading'));
				mask.append(win);
				body.append(mask);

			}else{
				header.addClass(config.type);
				win.append(header);
				//提示文本
				if (config.message) {
					content.html(config.message);
				};
				win.append(content);
				//按钮组
				if(config.buttons){
					win.append(footer);
				}

				mask.append(win);
				body.append(mask);

				if (config.width!="auto") {
					win.width(config.width);
				};
				if (config.height!="auto") {
					win.height(config.height)
				};
				if (config.delay) {
					window.setTimeout(function(){
						_this.close();
					},config.delay)
				};
				if(config.buttons){
					this.creatButtons(footer,config.buttons);
				}

				this.animate();
			}
		},

		//插件buttons
		creatButtons:function(footer,buttons){
			var _this = this;
			$(buttons).each(function(i){
				var type = this.type? 'class="'+this.type+'"':'';
				var btnText = this.text?this.text:'按钮'+i;
				var callback = this.callback?this.callback:null;
				var button = $('<button '+type+'>'+btnText+'</button>');

				if (callback) {
					button.tap(function(){
						var isClose = callback();
						if(isClose != false){
							_this.close();
						}
						
					})
				}else{
					button.tap(function(){
						_this.close();
					})
				}
				footer.append(button);
			})
		},

		close:function(){
			var _this = this;
			this.win.css('-webkit-transform','scale(0,0)');
			window.setTimeout(function(){
				_this.mask.remove();
			},500);
			
		}
	}
	window.Dialog = Dialog;
	$.dialog = function(config){
		return new Dialog(config);
	}
})(Zepto)