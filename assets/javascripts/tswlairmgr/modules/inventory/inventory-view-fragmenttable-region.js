var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.viewFragmenttableRegion = function inventoryViewFragmenttableRegion(contentNode, modelInstance, regionInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	this._region = regionInstance;
	
	this._lairSubViews = [];
	this._regionalbossfragmentsSubView = null;
	
	this.observables = {
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		head: {
			rootNode: null,
			regionName: null
		},
		regionalboss: null,
		lairs: null
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttableRegion>: build called");
		
		this._build_head();
		this._build_regionalboss();
		this._build_lairs();
	};
	
	this._build_head = function() {
		this._el.head.rootNode = $(
			'<div class="regionHead">' +
			'	<span class="regionName"></span>'+
			'</div>'
		);
		
		$(this._el.self).append(this._el.head.rootNode);
		this._el.head.regionName = $(".regionName", this._el.head.rootNode);
	};
	
	this._build_regionalboss = function() {
		this._el.regionalboss = $("<div />")
			.addClass("regionalbossBlock");
		
		var self = this;
		
		var rbView = new tswlairmgr.modules.inventory.viewFragmenttableRegionRegionalBossFragmentCounts(this._el.regionalboss, self._model, this._region.getRegional(), self._localization);
		rbView._init();
		
		rbView.observables.regionalFragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			self.observables.regionalFragmentCountPlusButtonClicked.notify(context);
		});
		rbView.observables.regionalFragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			self.observables.regionalFragmentCountMinusButtonClicked.notify(context);
		});
		
		self._lairSubViews.push(rbView);
		
		$(this._el.self).append(this._el.regionalboss);
	};
	
	this._build_lairs = function() {
		this._el.lairs = $("<div />")
			.addClass("lairsBlock");
		
		var zones = this._region.getSortedZones();
		var lairs = [];
		$.each(zones, function(index) {
			var zone = zones[index];
			var zoneLairs = zone.getSortedLairs();
			$.each(zoneLairs, function(zlIndex) {
				lairs.push(zoneLairs[zlIndex]);
			});
		});
		
		var self = this;
		$.each(lairs, function(index) {
			var lair = lairs[index];
			var lairBlock = $("<div />")
				.addClass("lairBlock");
			
			var lView = new tswlairmgr.modules.inventory.viewFragmenttableLair(lairBlock, self._model, lair, self._localization);
			lView._init();
			
			lView.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
				self.observables.fragmentCountPlusButtonClicked.notify(context);
			});
			lView.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
				self.observables.fragmentCountMinusButtonClicked.notify(context);
			});
			
			self._lairSubViews.push(lView);
			$(self._el.lairs).append(lairBlock);
		});
		
		$(this._el.self).append(this._el.lairs);
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttableRegion>: redraw called");
		
		this._redraw_head();
	};
	
	this._redraw_head = function() {
		$(this._el.head.regionName).html(this._region.getName());
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttableRegion>: got notified that module localization has changed.");
			self._redraw();
		});
	};
};