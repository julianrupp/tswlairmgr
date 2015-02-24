var tswlairmgr = tswlairmgr || {};
tswlairmgr.help = tswlairmgr.help || {};

tswlairmgr.help.HelpDisplay = function HelpDisplay() {
	this.active = false;
	
	var self = this;
	
	this.el = {
		root: document.getElementById('help-container'),
		appcontent: document.getElementById('content'),
		button: document.getElementById('help-button')
	};
	
	this.show = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.help.HelpDisplay> show called');
		}
		
		self.el['appcontent'].style.display = 'none';
		self.el['root'].style.display = 'block';
		
		self.el['button'].className = 'active';
		
		this.active = true;
	};
	
	this.hide = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.help.HelpDisplay> hide called');
		}
		
		self.el['appcontent'].style.display = 'block';
		self.el['root'].style.display = 'none';
		
		self.el['button'].className = '';
		
		this.active = false;
	};
	
	this.toggle = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.help.HelpDisplay> toggle called');
		}
		
		if(self.active)
		{
			self.hide();
		}
		else
		{
			self.show();
		}
	};
	
	this.init = function() {
		/* Bind help button in topbar */
		this.el['button'].onclick = this.toggle;
	};
	
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr.help.HelpDisplay> instance created');
	}
	
	this.init();
};