var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};

tswlairmgr.modules.lookup.objectviews.LairFragment = function lookupObjectviewLairFragment(contentNode, lairfragmentInstance, localization) {
	this._object = lairfragmentInstance;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	this._subViews = [];
	
	this._el = {
		self: contentNode,
		title: null
	};
	
	this.getAppBackgroundCss = function() {
		return {
			"background": "#808080 url(assets/images/lair/"+this._object.getSet().getBoss().getLair().getId()+".jpg) no-repeat fixed center",
			"background-size": "cover"
		};
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		this._el.title = $("<div />");
		var titleView = new tswlairmgr.modules.lookup.objectviews.components.ItemTitle(this._el.title, this._object, this._localization);
		this._subViews.push(titleView);
		$(this._el.self).append(this._el.title);
		
		// TODO
	};
	
	this._redraw = function() {
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
		$.each(this._subViews, function(index, view) {
			view.destroy();
		});
		
		this._localization.observables.moduleLocalizationChanged.unregisterCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.unregisterCallback(this._dataLocalizationCallback);
	};
};