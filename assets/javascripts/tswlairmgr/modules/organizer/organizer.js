var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.organizer = function() {
	this.name = "Organizer";
	this.displayName = "Organizer";
	
	this._templates = {};
	
	this._templates.sample_inner =
		"{{lib}} is {{usage}}.";
	
	this.init = function(contentNode) {
		this._el = {
			self: contentNode
		};
		
		$(this._el.self).append(
			Mustache.render(this._templates.sample_inner, {
				lib: "mustache.js",
				usage: "used"
			})
		);
	};
	
	tswlairmgr.modules.registerModule(this);
};

new tswlairmgr.modules.organizer();