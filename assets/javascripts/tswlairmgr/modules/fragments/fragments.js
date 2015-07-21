var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.fragments = new function() {
	this.id = "fragments";
	this.displayName = "Fragments"; /* TODO: Localization */
	
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
		
		// Set initial state
		
		this.redraw();
	};
	
	this.redraw = function() {
		$(this._el.self).empty();
		
		$(this._el.self).append(
			Mustache.render(this._templates.sample, { strings: this._strings, name: this.displayName } )
		);
		
		// Draw module respecting current state
	};
	
	tswlairmgr.modules.registerModule(this);
};