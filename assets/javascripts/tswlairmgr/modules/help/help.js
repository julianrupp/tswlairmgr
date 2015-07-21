var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.help = new function() {
	this.id = "help";
	this.displayName = "Help"; /* TODO: Localization */
	
	this._strings = {
		sample_modulecontainerfor: "Module container for"
	};
	
	this._templates = {
		sample:
			'{{strings.sample_modulecontainerfor}} <b>{{name}}</b>'
	};
	
	this.init = function(contentNode) {
		this._el = {
			self: contentNode
		};
		
		this.redraw();
	};
	
	this.redraw = function() {
		$(this._el.self).empty();
		
		$(this._el.self).append(
			Mustache.render(this._templates.sample, { strings: this._strings, name: this.displayName } )
		);
	};
	
	tswlairmgr.modules.registerModule(this);
};