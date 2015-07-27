var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.view = function organizerView(contentNode, id, modelInstance, localization) {
	this._moduleId = id;
	this._model = modelInstance;
	this._localization = localization;
	
	this.observables = {
		lairselectorDropdownChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantAddButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantImportButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantMissionAvailabilityToggleClicked: new tswlairmgr.core.helpers.Observable(this),
		participantRemoveButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		outputDataLocalizationButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		outputGenerateButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		topmenu: {
			lairselector: {
				rootNode: null,
				label: null,
				select: null
			}
		}
	};
	
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
	
	this.becameActive = function() {
		this._refreshBackground();
	};
	
	this.becameInactive = function() {
		
	};
	
	this._refreshBackground = function() {
		if(tswlairmgr.modules.getActiveModuleId() == this._moduleId)
		{
			$("body").css("background", this._appBackground["background"]);
			$("body").css("background-size", this._appBackground["background-size"]);
		}
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: build called");
		
		this._build_topmenu();
		// TODO: More build sub-function calls
		
		$(this._el.topmenu.lairselector.select).change();
	};
	
	this._build_topmenu = function() {
		this._el.topmenu.rootNode = $("<div />")
			.attr("id", "topmenu");
		
		this._build_topmenu_lairselector();
		
		$(this._el.self).append(this._el.topmenu.rootNode);
	};
	
	this._build_topmenu_lairselector = function() {
		this._el.topmenu.lairselector.rootNode = $("<div />")
			.attr("id", "lairselector")
			.addClass("uibox");
		
		this._el.topmenu.lairselector.label = $("<div />")
			.attr("id", "lairselectorLabel")
			.text("Select lair:");
		
		var self = this;
		this._el.topmenu.lairselector.select = $('<select />')
			.attr("id", "lairselectorDropdown")
			.change(function() {
				var selectedLairInstance = $(self._el.topmenu.lairselector.select).find(":selected").data("lairInstance");
				self.observables.lairselectorDropdownChanged.notify({
					newLairInstance: selectedLairInstance
				});
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
		
		this._update_topmenu_lairselector();
	};
	
	// TODO: More build sub-functions
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: redraw called");
		
		this._redraw_topmenu();
		// TODO: More redraw sub-function calls
	};
	
	this._redraw_topmenu = function() {
		this._redraw_topmenu_lairselector();
	};
	
	this._redraw_topmenu_lairselector = function() {
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
	
	this._update_topmenu_lairselector = function() {
		var newId = this._model.getSelectedLairId();
		
		if(newId === null)
		{
			newId = $(this._el.topmenu.lairselector.select).find(":selected").data("lairInstance").getId();
		}
		
		var self = this;
		$("option", $(this._el.topmenu.lairselector.select)).each(function(index) {
			var optionNode = this;
			var optionLairId = $(optionNode).data("lairInstance").getId();
			if(optionLairId === newId)
			{
				$(self._el.topmenu.lairselector.select).val($(optionNode).val());
				self._appBackground["background"] = "#808080 url(assets/images/lair/"+newId+".jpg) no-repeat fixed center";
				self._refreshBackground();
				return;
			}
		});
	};
	
	// TODO: More update sub-functions
	
	this._init = function() {
		this._localization.init();
		
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that module localization has changed.");
			self._redraw();
		});
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that data localization has changed.");
			self._redraw();
		});
		
		this._model.observables.selectedLairChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that selected lair has changed.");
			self._update_topmenu_lairselector();
		});
		this._model.observables.fragmentCountsChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that fragment counts have changed.");
			// TODO: self._update_bosstable();
			// TODO: self._update_picktable();
			// TODO: self._update_output();
		});
		this._model.observables.participantsChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that participants have changed.");
			// TODO: self._update_picktable();
			// TODO: self._update_output();
		});
		this._model.observables.selectedChatScriptLocalizationIdChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that selected chat script localization has changed.");
			// TODO: self._update_output();
		});
	};
};