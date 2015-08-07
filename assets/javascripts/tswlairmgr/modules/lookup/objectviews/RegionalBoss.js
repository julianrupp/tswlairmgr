var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};

tswlairmgr.modules.lookup.objectviews.RegionalBoss = function lookupObjectviewRegionalBoss(contentNode, regionalbossInstance, localization) {
	this._object = regionalbossInstance;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	
	this.observables = {
		objectLinkClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode
	};
	
	this.getAppBackgroundCss = function() {
		return {
			"background": "#808080 url(assets/images/region/"+this._object.getId()+".jpg) no-repeat fixed center"
		};
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		// TODO
	};
	
	this._redraw = function() {
		$(this._el.self).empty();
		$(this._el.self).append(
			$('<div class="uibox" />')
				.text("RegionalBoss: <"+this._object.getName()+">")
		);
		// TODO
	};
	
	var self = this;
	this._moduleLocalizationCallback = function(origin, context) {
		self._redraw();
	};
	
	this._dataLocalizationCallback = function(origin, context) {
		self._redraw();
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(this._dataLocalizationCallback);
	};
	
	this.destroy = function() {
		$.each(this._itemMVCControllers, function(index, controller) {
			controller.destroy();
		});
		
		this._localization.observables.moduleLocalizationChanged.unregisterCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.unregisterCallback(this._dataLocalizationCallback);
	};
};