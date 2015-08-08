var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};

tswlairmgr.modules.lookup.objectviews.LairBoss = function lookupObjectviewLairBoss(contentNode, lairbossInstance, localization) {
	this._object = lairbossInstance;
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
			dropsfragments: null,
			otherbosses: null,
			associatedregional: null
		}
	};
	
	this.getAppBackgroundCss = function() {
		return {
			"background": "#808080 url(assets/images/lair/"+this._object.getLair().getId()+".jpg) no-repeat fixed center",
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
		this._build_right_dropsfragments();
		this._build_right_otherbosses();
		this._build_right_associatedregional();
	};
	
	this._build_left_set = function() {
		this._el.components.set = $("<div />");
		var set = new tswlairmgr.modules.lookup.objectviews.components.LairBossFragmentSet(
			this._el.components.set,
			this._object,
			{
				markAll: true
			},
			this._localization
		);
		this._subViews.push(set);
		
		$(this._el.mainTable.left).append(this._el.components.set);
		$(this._el.mainTable.left).addClass("lair");
	};
	
	this._build_right_propertytable = function() {
		this._el.components.propertytable = $("<div />")
			.addClass("component");
		var propertytable = new tswlairmgr.modules.lookup.objectviews.components.PropertyTable(
			this._el.components.propertytable,
			[
				{
					type: "LairBoss_Lair",
					object: this._object.getLair()
				},
				{
					type: "LairBoss_Mission",
					object: this._object
				}
			],
			this._localization
		);
		this._subViews.push(propertytable);
		
		$(this._el.mainTable.right).append(this._el.components.propertytable);
	};
	
	this._build_right_dropsfragments = function() {
		this._el.components.dropsfragments = $("<div />")
			.addClass("component");
		var dropsfragments = new tswlairmgr.modules.lookup.objectviews.components.BossDropsRegionalFragments(
			this._el.components.dropsfragments,
			this._object.getRegionalFragmentDrops(),
			this._localization
		);
		this._subViews.push(dropsfragments);
		
		$(this._el.mainTable.right).append(this._el.components.dropsfragments);
	};
	
	this._build_right_otherbosses = function() {
		this._el.components.otherbosses = $("<div />")
			.addClass("component");
		var otherbosses = new tswlairmgr.modules.lookup.objectviews.components.OtherLairBosses(
			this._el.components.otherbosses,
			this._object.getLair(),
			this._object,
			this._localization
		);
		this._subViews.push(otherbosses);
		
		$(this._el.mainTable.right).append(this._el.components.otherbosses);
	};
	
	this._build_right_associatedregional = function() {
		this._el.components.associatedregional = $("<div />")
			.addClass("component");
		var associatedregional = new tswlairmgr.modules.lookup.objectviews.components.AssociatedRegionalBoss(
			this._el.components.associatedregional,
			this._object.getLair().getZone().getRegion().getRegional(),
			this._localization
		);
		this._subViews.push(associatedregional);
		
		$(this._el.mainTable.right).append(this._el.components.associatedregional);
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