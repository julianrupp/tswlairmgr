var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.organizer = new function() {
	this.id = "organizer";
	this.displayName = "Organizer"; /* TODO: Localization */
	
	this._templates = {};
	
	this._templates = {
		sample:
			"{{lib}} is {{usageStatus}}."
	};
	
	this.init = function(contentNode) {
		this._el = {
			self: contentNode
		};
		
		$(this._el.self).append(
			Mustache.render(this._templates.sample, {
				lib: "mustache.js",
				usageStatus: "used"
			})
		);
	};
	
	tswlairmgr.modules.registerModule(this);
};