var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewTopmenu = function organizerViewTopmenu(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._subViews = {};
	
	this.observables = {
		appBackgroundShouldChange: new tswlairmgr.core.helpers.Observable(this),
		lairselectorDropdownChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		lairselector: {
			rootNode: null,
			label: null,
			select: null
		}
	};
	
	this._templates = {
		lairselector: {
			label: '{{localization.strings.topmenu.lairselector.selectLair}}:',
			select: {
				optgroup: '{{{context.regionName}}}',
				option: '{{{context.zoneName}}}: {{{context.lairName}}}'
			}
		}
	};
	
	this._appBackground = {
		"background": "#808080",
		"background-size": "cover"
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: build called");
		
		this._build_topmenu_lairselector();
	};
	
	this._build_topmenu_lairselector = function() {
		this._el.lairselector.rootNode = $("<div />")
			.attr("id", "lairselector")
			.addClass("uibox");
		
		this._el.lairselector.label = $("<div />")
			.attr("id", "lairselectorLabel")
			.text("Select lair:");
		
		var self = this;
		this._el.lairselector.select = $('<select />')
			.attr("id", "lairselectorDropdown")
			.change(function() {
				var selectedLairInstance = $(self._el.lairselector.select).find(":selected").data("lairInstance");
				self.observables.lairselectorDropdownChanged.notify({
					newLairInstance: selectedLairInstance
				});
				self.observables.appBackgroundShouldChange.notify({});
			});
		
		var i=0;
		var selectNode = this._el.lairselector.select;
		$.each(tswlairmgr.core.data.getSortedRegions(), function(regionIndex, regionInstance) {
			var optgroupNode = $("<optgroup />")
				.data("regionInstance", regionInstance);
			$.each(regionInstance.getSortedZones(), function(zoneIndex, zoneInstance) {
				$.each(zoneInstance.getSortedLairs(), function(lairIndex, lairInstance) {
					var optionNode = $("<option />")
						.data("zoneInstance", zoneInstance)
						.data("lairInstance", lairInstance)
						.val(i++);
					$(optgroupNode).append(optionNode);
				});
			});
			$(selectNode).append(optgroupNode);
		});
		
		$("option", selectNode).each(function(index) {
			var optionNode = this;
			if($(optionNode).data("lairInstance") === self._model.getSelectedLair())
			{
				$(selectNode).val($(optionNode).val());
				return;
			}
		});
		
		$(this._el.lairselector.rootNode).append(this._el.lairselector.label);
		$(this._el.lairselector.rootNode).append(this._el.lairselector.select);
		$(this._el.self).append(this._el.lairselector.rootNode);
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: redraw called");
		
		this._redraw_lairselector();
	};
	
	this._redraw_lairselector = function() {
		var self = this;
		var lairselectorBox = $("#lairselector", $(this._el.self));
		var labelNode = $("#lairselectorLabel", $(lairselectorBox));
		$(labelNode).html(
			Mustache.render(self._templates.lairselector.label, {
				localization: self._localization.getLocalizationData(),
				context: {}
			})
		);
		var selectNode = $("#lairselectorDropdown", $(lairselectorBox));
		$("optgroup", selectNode).each(function(index) {
			var optgroupNode = this;
			$(optgroupNode).attr("label",
				Mustache.render(self._templates.lairselector.select.optgroup, {
					localization: self._localization.getLocalizationData(),
					context: {
						regionName: $(optgroupNode).data("regionInstance").getName()
					}
				})
			);
		});
		$("option", selectNode).each(function(index) {
			var optionNode = this;
			$(optionNode).text(
				Mustache.render(self._templates.lairselector.select.option, {
					localization: self._localization.getLocalizationData(),
					context: {
						zoneName: $(optionNode).data("zoneInstance").getName(),
						lairName: $(optionNode).data("lairInstance").getName()
					}
				})
			);
		});
	};
	
	this._lairselector_updateFromModel = function(newLair) {
		var self = this;
		$("option", $(this._el.lairselector.select)).each(function(index) {
			var optionNode = this;
			var optionLair = $(optionNode).data("lairInstance");
			if(optionLair === newLair)
			{
				$(self._el.lairselector.select).val($(optionNode).val());
				return;
			}
		});
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: got notified that module localization has changed.");
			self._redraw();
		});
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: got notified that data localization has changed.");
			self._redraw();
		});
		
		this._model.observables.selectedLairChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: got notified that selected lair has changed.");
			
			self._lairselector_updateFromModel(context.newLair);
		});
	};
};