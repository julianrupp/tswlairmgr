var tswlairmgr = tswlairmgr || {};
tswlairmgr.helpoverlay = tswlairmgr.helpoverlay || {};

tswlairmgr.helpoverlay.HelpOverlay = function HelpOverlay() {
	var self = this;
	
	this.el = {
		root: document.getElementById('help-overlay'),
		buttons: {
			help: document.getElementById('help-button'),
			close: document.getElementById('help-overlay-close')
		}
	};
	
	this.show = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.helpoverlay.HelpOverlay> show called');
		}
		
		self.el['root'].style.display = 'block';
	};
	
	this.hide = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.helpoverlay.HelpOverlay> hide called');
		}
		
		self.el['root'].style.display = 'none';
	};
	
	this.init = function() {
		/* Bind help button in topbar */
		this.el['buttons']['help'].onclick = this.show;
		
		/* Bind close button in help overlay */
		this.el['buttons']['close'].onclick = this.hide;
	};
	
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr.helpoverlay.HelpOverlay> instance created');
	}
	
	this.init();
};