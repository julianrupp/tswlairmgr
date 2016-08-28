var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.viewFragmenttable = function inventoryViewFragmenttable(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._regionSubViews = [];
	
	this.observables = {
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		regions: null,
		summary: null
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttable>: build called");
		
		this._build_regions();
		this._build_summary();
	};
	
	this._build_regions = function() {
		this._el.regions = $("<div />");
		var regions = tswlairmgr.core.data.getSortedRegions();
		
		var self = this;
		$.each(regions, function(index) {
			var region = regions[index];
			var regionBlock = $("<div />")
				.addClass("regionBlock");
			
			var rView = new tswlairmgr.modules.inventory.viewFragmenttableRegion(regionBlock, self._model, region, self._localization);
			rView._init();
			
			rView.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
				self.observables.fragmentCountPlusButtonClicked.notify(context);
			});
			rView.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
				self.observables.fragmentCountMinusButtonClicked.notify(context);
			});
			rView.observables.regionalFragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
				self.observables.regionalFragmentCountPlusButtonClicked.notify(context);
			});
			rView.observables.regionalFragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
				self.observables.regionalFragmentCountMinusButtonClicked.notify(context);
			});
			
			self._regionSubViews.push(rView);
			$(self._el.regions).append(regionBlock);
		});
		
		$(this._el.self).append(this._el.regions);
	};
	
	this._build_summary = function() {
		this._el.summary = $("<div />")
			.addClass("summaryBlock");
		
		/*TODO*/
		
		$(this._el.self).append(this._el.summary);
	}
	
	this._redraw = function() {
		this._redraw_summary();
	};
	
	this._redraw_summary = function() {
		/*TODO*/
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
	};
};