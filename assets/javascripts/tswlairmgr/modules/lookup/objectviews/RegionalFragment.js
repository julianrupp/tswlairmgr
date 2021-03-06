var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};

tswlairmgr.modules.lookup.objectviews.RegionalFragment = function lookupObjectviewRegionalFragment(contentNode, regionalfragmentInstance, localization) {
	this._object = regionalfragmentInstance;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	this._subViews = [];
	
	this._el = {
		self: contentNode,
		mainTable: {
			rootNode: null,
			left: null,
			right: null
		},
		components: {
			title: null,
			set: null,
			propertytable: null,
			dropsfrom: null
		}
	};
	
	this.getAppBackgroundCss = function() {
		return {
			"background": "#808080 url(assets/images/region/"+this._object.getSet().getBoss().getId()+".jpg) no-repeat fixed center",
			"background-size": "cover"
		};
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		this._el.components.title = $("<div />");
		var titleView = new tswlairmgr.modules.lookup.objectviews.components.ItemTitle(this._el.components.title, this._object, this._localization);
		this._subViews.push(titleView);
		$(this._el.self).append(this._el.components.title);
		
		this._el.mainTable.rootNode = $(
			'<table class="mainTable">' +
			'	<tr>' +
			'		<td class="left"></td>' +
			'		<td class="pad"></td>' +
			'		<td class="right"></td>' +
			'	</tr>' +
			'</table>'
		);
		
		$(this._el.self).append(this._el.mainTable.rootNode);
		this._el.mainTable.left = $(".left", this._el.mainTable.rootNode);
		this._el.mainTable.right = $(".right", this._el.mainTable.rootNode);
		
		this._build_left_set();
		this._build_right_propertytable();
		this._build_right_dropsfrom();
	};
	
	this._build_left_set = function() {
		this._el.components.set = $("<div />");
		var set = new tswlairmgr.modules.lookup.objectviews.components.RegionalBossFragmentSet(
			this._el.components.set,
			this._object.getSet().getBoss(),
			{
				markSpecific: this._object
			},
			this._localization
		);
		this._subViews.push(set);
		
		$(this._el.mainTable.left).append(this._el.components.set);
		$(this._el.mainTable.left).addClass("regional");
	};
	
	this._build_right_propertytable = function() {
		this._el.components.propertytable = $("<div />")
			.addClass("component");
		var propertytable = new tswlairmgr.modules.lookup.objectviews.components.PropertyTable(
			this._el.components.propertytable,
			[
				{
					type: "RegionalFragment_Boss",
					object: this._object.getSet().getBoss()
				},
				{
					type: "RegionalFragment_Region",
					object: this._object.getSet().getBoss().getRegion()
				}
			],
			this._localization
		);
		this._subViews.push(propertytable);
		
		$(this._el.mainTable.right).append(this._el.components.propertytable);
	};
	
	this._build_right_dropsfrom = function() {
		this._el.components.dropsfrom = $("<div />")
			.addClass("component");
		var dropsfrom = new tswlairmgr.modules.lookup.objectviews.components.RegionalFragmentDropsFrom(
			this._el.components.dropsfrom,
			this._object.getDroppedFrom(),
			this._localization
		);
		this._subViews.push(dropsfrom);
		
		$(this._el.mainTable.right).append(this._el.components.dropsfrom);
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