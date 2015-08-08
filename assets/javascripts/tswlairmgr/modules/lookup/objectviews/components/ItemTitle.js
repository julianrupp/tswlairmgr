var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};
tswlairmgr.modules.lookup.objectviews.components = tswlairmgr.modules.lookup.objectviews.components || {};

tswlairmgr.modules.lookup.objectviews.components.ItemTitle = function lookupObjectviewComponentItemTitle(contentNode, object, localization) {
	this._object = object;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	this._subViews = [];
	
	this._el = {
		self: contentNode,
		title: {
			rootNode: null,
			itemIconContainer: null,
			titleTextContainer: null
		}
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		this._el.title.rootNode = $("<div />")
			.addClass("itemTitle");
		
		this._el.title.itemIconContainer = $("<div />")
			.addClass("itemIcon");
		this._itemMVCControllers.push(
			new tswlairmgr.core.components.ItemHTML(
				this._object,
				this._el.title.itemIconContainer,
				{ isSmall: true }
			)
		);
		$(this._el.title.rootNode).append(this._el.title.itemIconContainer);
		
		this._el.title.titleTextContainer = $("<div />")
			.addClass("titleText");
		$(this._el.title.rootNode).append(this._el.title.titleTextContainer);
		
		$(this._el.self).append(this._el.title.rootNode);
	};
	
	this._redraw = function() {
		$(this._el.title.titleTextContainer).empty();
		$(this._el.title.titleTextContainer).append(
			this._object.getItemName()
		);
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
	
	this._init();
};