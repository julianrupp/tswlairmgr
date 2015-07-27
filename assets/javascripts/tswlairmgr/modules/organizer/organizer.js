var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.controller = new function() {
	this.id = "organizer";
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	
	this._model = new tswlairmgr.modules.organizer.model();
	this._view = null;
	
	var self = this;
	this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that localization has changed.");
		self._redraw();
	});
	
	this._templates = {
		topmenu: {
			lairselector: {
				label: '{{localization.strings.topmenu.lairselector.selectLair}}:',
				select: {
					optgroup: '{{{context.regionName}}}',
					option: '{{{context.zoneName}}}: {{{context.lairName}}}'
				}
			}
		}
	};
	
	this._appBackground = {
		"background": "#808080",
		"background-size": "cover"
	};
	
	this._el = {
		self: null,
		topmenu: {
			lairselector: {
				rootNode: null,
				label: null,
				select: null
			}
		}
	};
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: initWithRootNodeAndState: initializing...");
		
		this._el.self = contentNode;
		
		this._localization.init();
		
		this._build();
		
		var self = this;
		$.each(this._model.observables, function(observableName, observable) {
			observable.registerCallback(function() {
				self._updatePersistentState();
				self._redraw();
			});
		});
		
		var self = this;
		tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified by system that persistent state was loaded");
			self._loadPersistentState(tswlairmgr.core.persistentstate.getModuleState(self));
		});
	};
	
	this.becameActive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that module became active.");
		
		this._refreshBackground();
	};
	
	this.becameInactive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that module became inactive.");
	};
	
	this._refreshBackground = function() {
		if(tswlairmgr.modules.isActiveModule(this))
		{
			$("body").css("background", this._appBackground["background"]);
			$("body").css("background-size", this._appBackground["background-size"]);
		}
	};
	
	this._moduleStateChanged = function() {
		tswlairmgr.core.persistentstate.updateModuleState(this, this._getPersistentState());
	};
	
	this._getPersistentState = function() {
		return this._model.getPersistentState();
	};
	
	this._loadPersistentState = function(state) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: loadPersistentState =");
		if(tswlairmgr.core.config.debug) console.log(state);
		if(state)
		{
			return this._model.setPersistentState(state);
		}
		this._updatePersistentState();
	};
	
	this._updatePersistentState = function() {
		tswlairmgr.core.persistentstate.updateModuleState(this, this._getPersistentState());
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: build called");
		
		this._build_topmenu();
		// ...
		
		this._redraw();
		
		$(this._el.topmenu.lairselector.select).change();
		
		var self = this;
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that module localization has changed.");
			self._redraw();
		});
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that data localization has changed.");
			self._redraw();
		});
	};
	
	this._build_topmenu = function() {
		var self = this;
		
		this._el.topmenu.rootNode = $("<div />")
			.attr("id", "topmenu");
		
		this._el.topmenu.lairselector.rootNode = $("<div />")
			.attr("id", "lairselector")
			.addClass("uibox");
		
		this._el.topmenu.lairselector.label = $("<div />")
			.attr("id", "lairselectorLabel")
			.text("Select lair:");
		
		this._el.topmenu.lairselector.select = $('<select />')
			.attr("id", "lairselectorDropdown")
			.change(function() {
				self._lairSelectorDropdownChanged();
			});
		
		var i=0;
		var selectNode = this._el.topmenu.lairselector.select;
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
		
		$(this._el.topmenu.lairselector.rootNode).append(this._el.topmenu.lairselector.label);
		$(this._el.topmenu.lairselector.rootNode).append(this._el.topmenu.lairselector.select);
		$(this._el.topmenu.rootNode).append(this._el.topmenu.lairselector.rootNode);
		
		$(this._el.self).append(this._el.topmenu.rootNode);
		
		this._model.observables.selectedLairChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that model has changed the selected lair.");
			var newId = context.newLairId;
			$("option", self._el.topmenu.lairselector.select).each(function(index) {
				var optionNode = this;
				var optionLairId = $(optionNode).data("lairInstance").getId();
				if(optionLairId === newId)
				{
					$(self._el.topmenu.lairselector.select).val($(optionNode).val());
					self._appBackground["background"] = "#808080 url(assets/images/lair/"+optionLairId+".jpg) no-repeat fixed center";
					self._refreshBackground();
				}
			});
		});
	};
	
	// ...
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: redraw called");
		
		this._redraw_topmenu();
		// ...
	};
	
	this._redraw_topmenu = function() {
		var self = this;
		var lairselectorBox = $("#lairselector", $("#topmenu", $(this._el.self)));
		var labelNode = $("#lairselectorLabel", $(lairselectorBox));
		$(labelNode).html(
			Mustache.render(self._templates.topmenu.lairselector.label, {
				localization: self._localization.getLocalizationData(),
				context: {}
			})
		);
		var selectNode = $("#lairselectorDropdown", $(lairselectorBox));
		$("optgroup", selectNode).each(function(index) {
			var optgroupNode = this;
			$(optgroupNode).attr("label",
				Mustache.render(self._templates.topmenu.lairselector.select.optgroup, {
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
				Mustache.render(self._templates.topmenu.lairselector.select.option, {
					localization: self._localization.getLocalizationData(),
					context: {
						zoneName: $(optionNode).data("zoneInstance").getName(),
						lairName: $(optionNode).data("lairInstance").getName()
					}
				})
			);
		});
	};
	
	// ...
	
	this._lairSelectorDropdownChanged = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: lairSelectorDropdownChanged called");
		
		var selectedLairInstance = $(this._el.topmenu.lairselector.select).find(":selected").data("lairInstance");
		this._model.setSelectedLairId(selectedLairInstance.getId());
	};
	
	tswlairmgr.modules.registerModule(this);
};