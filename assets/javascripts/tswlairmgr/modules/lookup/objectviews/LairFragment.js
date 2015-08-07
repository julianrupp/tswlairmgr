var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};

tswlairmgr.modules.lookup.objectviews.LairFragment = function lookupObjectviewLairFragment(contentNode, lairfragmentInstance, localization) {
	this._object = lairfragmentInstance;
	this._localization = localization;
	
	this.observables = {
		objectLinkClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode
	};
	
	this.getAppBackgroundCss = function() {
		return {
			"background": "#808080 url(assets/images/lair/"+this._object.getSet().getBoss().getLair().getId()+".jpg) no-repeat fixed center"
		};
	};
	
	this._build = function() {
		// TODO
		$(this._el.self).empty();
		
		$(this._el.self).text("LairFragment: <"+this._object.getCode()+">");
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
		this._localization.observables.moduleLocalizationChanged.unregisterCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.unregisterCallback(this._dataLocalizationCallback);
	};
};