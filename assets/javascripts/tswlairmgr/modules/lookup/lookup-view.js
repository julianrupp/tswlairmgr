var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};

tswlairmgr.modules.lookup.view = function organizerView(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._activeObjectView = null;
	
	this.observables = {
		appBackgroundShouldChange: new tswlairmgr.core.helpers.Observable(this),
		fragmentSelectorDropdownChanged: new tswlairmgr.core.helpers.Observable(this),
		bossSelectorDropdownChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		selector: {
			rootNode: null,
			fragments: {
				label: null,
				dropdown: null
			},
			bosses: {
				label: null,
				dropdown: null
			}
		}
	};
	
	this._appBackgroundSaved = {
		"background": null,
		"background-size": null
	};
	
	this._appBackground = {
		"background": "#808080",
		"background-size": "cover"
	};
	
	this.becameActive = function() {
		this._appBackgroundSaved["background"] = $("body").css("background");
		this._appBackgroundSaved["background-size"] = $("body").css("background-size");
		this._refreshBackground();
	};
	
	this.becameInactive = function() {
		$("body").css("background", this._appBackgroundSaved["background"]);
		$("body").css("background-size", this._appBackgroundSaved["background-size"]);
	};
	
	this._refreshBackground = function() {
		$("body").css("background", this._appBackground["background"]);
		$("body").css("background-size", this._appBackground["background-size"]);
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.view>: build called");
		
		// TODO
	};
	
	this._redraw = function() {
		// TODO
	};
	
	this._redraw_object = function() {
		// this._activeObjectView.destroy();
		// TODO
	};
	
	this._init = function() {
		this._localization.init();
		
		this._build();
		this._redraw();
		
		var self = this;
		
		// TODO: Register callbacks.
		// Destroy old object view when it changes
	};
};