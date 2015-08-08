var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};

tswlairmgr.modules.lookup.view = function lookupView(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._activeObjectView = null;
	
	this.observables = {
		appBackgroundShouldChange: new tswlairmgr.core.helpers.Observable(this),
		selectorDropdownUsed: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		selectors: {
			rootNode: null,
			fragments: {
				dropdown: null
			},
			bosses: {
				dropdown: null
			}
		},
		objectView: null
	};
	
	this._appBackgroundSaved = {
		"background": null,
		"background-size": null
	};
	
	this._appBackground = {
		"background": "#808080",
		"background-size": "cover"
	};
	
	this.becameActive = function() {
		this._appBackgroundSaved["background"] = $("body").css("background");
		this._appBackgroundSaved["background-size"] = $("body").css("background-size");
		this._refreshBackground();
	};
	
	this.becameInactive = function() {
		$("body").css("background", this._appBackgroundSaved["background"]);
		$("body").css("background-size", this._appBackgroundSaved["background-size"]);
	};
	
	this._refreshBackground = function() {
		$("body").css("background", this._appBackground["background"]);
		$("body").css("background-size", this._appBackground["background-size"]);
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.view>: build called");
		
		var selectorContainer = $(
			'<div id="selectors">' +
			'	<div id="fragmentSelector">' +
			'		<div class="componentBox">' +
			'			<div class="componentBoxInner">' +
			'				<select id="bossDropdown"></select>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'	<div id="bossSelector">' +
			'		<div class="componentBox">' +
			'			<div class="componentBoxInner">' +
			'				<select id="fragmentDropdown"></select>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>'
		);
		$(this._el.self).append(selectorContainer);
		
		this._el.selectors.rootNode = $("#selector", this._el.self);
		
		this._el.selectors.fragments.dropdown = $("#fragmentDropdown", this._el.self);
		this._build_fragmentselector();
		
		this._el.selectors.bosses.dropdown = $("#bossDropdown", this._el.self);
		this._build_bossselector();
		
		$(this._el.self).append(
			$('<div id="objectView" />')
		);
		this._el.objectView = $("#objectView", this._el.self);
	};
	
	this._build_fragmentselector = function() {
		var fragmentSelector = this._el.selectors.fragments.dropdown;
		
		var self = this;
		$(fragmentSelector).change(function() {
			var selectedObject = $(self._el.selectors.fragments.dropdown).find(":selected").data("objectInstance");
			self.observables.selectorDropdownUsed.notify({
				selectedObject: selectedObject
			});
			self.observables.appBackgroundShouldChange.notify({});
		});
		
		var lairFragments = [];
		var regionalFragments = [];
		$.each(tswlairmgr.core.data.getSortedRegions(), function(regionIndex, regionInstance) {
			$.each(regionInstance.getRegional().getFragmentSet().getFragments(), function(fragmentOrientationCode, fragmentInstance) {
				regionalFragments.push(fragmentInstance);
			});
			$.each(regionInstance.getSortedZones(), function(zoneIndex, zoneInstance) {
				$.each(zoneInstance.getSortedLairs(), function(lairIndex, lairInstance) {
					$.each(lairInstance.getSortedBosses(), function(bossIndex, bossInstance) {
						$.each(bossInstance.getFragmentSet().getFragments(), function(fragmentOrientationCode, fragmentInstance) {
							lairFragments.push(fragmentInstance);
						});
					});
				});
			});
		});
		lairFragments.sort(function(a, b) {
			return (a.getCode().toLowerCase() <= b.getCode().toLowerCase()) ? -1 : 1;
		});
		regionalFragments.sort(function(a, b) {
			return (a.getCode().toLowerCase() <= b.getCode().toLowerCase()) ? -1 : 1;
		});
		
		$(fragmentSelector).append(
			$("<option />")
				.data("objectInstance", null)
		);
		
		var lairfragmentsOptgroupNode = $("<optgroup />")
			.data("type", "lairfragmentsLabel");
		$.each(lairFragments, function(index, fragmentInstance) {
			var optionNode = $("<option />")
				.data("objectInstance", fragmentInstance);
			$(lairfragmentsOptgroupNode).append(optionNode);
		});
		$(fragmentSelector).append(lairfragmentsOptgroupNode);
		
		var regionalfragmentsOptgroupNode = $("<optgroup />")
			.data("type", "regionalfragmentsLabel");
		$.each(regionalFragments, function(index, fragmentInstance) {
			var optionNode = $("<option />")
				.data("objectInstance", fragmentInstance);
			$(regionalfragmentsOptgroupNode).append(optionNode);
		});
		$(fragmentSelector).append(regionalfragmentsOptgroupNode);
	};
	
	this._build_bossselector = function() {
		var bossSelector = this._el.selectors.bosses.dropdown;
		
		var self = this;
		$(bossSelector).change(function() {
			var selectedObject = $(self._el.selectors.bosses.dropdown).find(":selected").data("objectInstance");
			self.observables.selectorDropdownUsed.notify({
				selectedObject: selectedObject
			});
			self.observables.appBackgroundShouldChange.notify({});
		});
		
		$(bossSelector).append(
			$("<option />")
				.data("objectInstance", null)
		);
		
		var regionalBosses = [];
		
		$.each(tswlairmgr.core.data.getSortedRegions(), function(regionIndex, regionInstance) {
			regionalBosses.push(regionInstance.getRegional());
		});
		
		var regionalbossesOptgroupNode = $("<optgroup />")
			.data("type", "regionalbossesLabel");
		
		$.each(regionalBosses, function(index, boss) {
			console.log(boss);
			$(regionalbossesOptgroupNode).append(
				$("<option />")
					.data("objectInstance", boss)
			);
		});
		
		$(bossSelector).append(regionalbossesOptgroupNode);
		
		// HTML spec allows no optgroup nesting... oh well
		$.each(tswlairmgr.core.data.getSortedRegions(), function(regionIndex, regionInstance) {
			$.each(regionInstance.getSortedZones(), function(zoneIndex, zoneInstance) {
				$.each(zoneInstance.getSortedLairs(), function(lairIndex, lairInstance) {
					var lairOptgroupNode = $("<optgroup />")
						.data("type", "lairLabel")
						.data("lairInstance", lairInstance);
					
					$.each(lairInstance.getSortedBosses(), function(bossIndex, bossInstance) {
						$(lairOptgroupNode).append(
							$("<option />")
								.data("objectInstance", bossInstance)
						);
					});
					
					$(bossSelector).append(lairOptgroupNode);
				});
			});
		});
	};
	
	this._redraw = function() {
		this._redraw_fragmentselector();
		this._redraw_bossselector();
		
		// ObjectView will redraw itself.
	};
	
	this._redraw_fragmentselector = function() {
		var fragmentSelector = $(this._el.selectors.fragments.dropdown);
		
		var self = this;
		$("optgroup", fragmentSelector).each(function(index) {
			var optgroupNode = this;
			
			var labelText = "";
			switch($(optgroupNode).data("type"))
			{
				case "lairfragmentsLabel":
					labelText = Mustache.render(self._localization.getLocalizationData().strings.selectors.fragments.optionGroups.lairFragments, {
						localization: self._localization.getLocalizationData(),
						context: {}
					});
				break;
				case "regionalfragmentsLabel":
					labelText = Mustache.render(self._localization.getLocalizationData().strings.selectors.fragments.optionGroups.regionalFragments, {
						localization: self._localization.getLocalizationData(),
						context: {}
					});
				break;
				default:
					// Should never reach here
				break;
			}
			
			$(optgroupNode).attr("label", labelText);
		});
		$("option", fragmentSelector).each(function(index) {
			var optionNode = this;
			
			if(index == 0)
			{
				$(optionNode).text(
					Mustache.render(self._localization.getLocalizationData().strings.selectors.fragments.chooseLabel, {
						localization: self._localization.getLocalizationData(),
						context: {}
					})
				);
				return;
			}
			
			var obj = $(optionNode).data("objectInstance");
			if(obj !== null)
			{
				$(optionNode).text(
					obj.getCode()
				);
			}
		});
	};
	
	this._redraw_bossselector = function() {
		var bossSelector = $(this._el.selectors.bosses.dropdown);
		
		var self = this;
		$("optgroup", bossSelector).each(function(index) {
			var optgroupNode = this;
			
			var labelText = "";
			switch($(optgroupNode).data("type"))
			{
				case "lairLabel":
					labelText = $(optgroupNode).data("lairInstance").getZone().getName() + ": " + $(optgroupNode).data("lairInstance").getName();
				break;
				case "lairbossesLabel":
					labelText = Mustache.render(self._localization.getLocalizationData().strings.selectors.bosses.optionGroups.lairBosses, {
						localization: self._localization.getLocalizationData(),
						context: {}
					});
				break;
				case "regionalbossesLabel":
					labelText = Mustache.render(self._localization.getLocalizationData().strings.selectors.bosses.optionGroups.regionalBosses, {
						localization: self._localization.getLocalizationData(),
						context: {}
					});
				break;
				default:
					// Should never reach here
				break;
			}
			
			$(optgroupNode).attr("label", labelText);
		});
		$("option", bossSelector).each(function(index) {
			var optionNode = this;
			
			if(index == 0)
			{
				$(optionNode).text(
					Mustache.render(self._localization.getLocalizationData().strings.selectors.bosses.chooseLabel, {
						localization: self._localization.getLocalizationData(),
						context: {}
					})
				);
				return;
			}
			
			var obj = $(optionNode).data("objectInstance");
			if(obj !== null)
			{
				$(optionNode).text(
					obj.getName()
				);
			}
		});
	};
	
	this._reset_selectors = function() {
		$(this._el.selectors.fragments.dropdown).val( $("option:first", this._el.selectors.fragments.dropdown).val() );
		$(this._el.selectors.bosses.dropdown).val( $("option:first", this._el.selectors.bosses.dropdown).val() );
		
		$(this._el.selectors.fragments.dropdown).removeClass("active");
		$(this._el.selectors.bosses.dropdown).removeClass("active");
		
		var self = this;
		$("option", this._el.selectors.fragments.dropdown).each(function(index) {
			var optionNode = this;
			if($(optionNode).data("objectInstance") === self._model.getSelectedObject())
			{
				$(self._el.selectors.fragments.dropdown).val( $(optionNode).val() );
				$(self._el.selectors.fragments.dropdown).addClass("active");
			}
		});
		$("option", this._el.selectors.bosses.dropdown).each(function(index) {
			var optionNode = this;
			if($(optionNode).data("objectInstance") === self._model.getSelectedObject())
			{
				$(self._el.selectors.bosses.dropdown).val( $(optionNode).val() );
				$(self._el.selectors.bosses.dropdown).addClass("active");
			}
		});
	};
	
	this._init = function() {
		this._localization.init();
		
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			self._redraw();
		});
		
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			self._redraw();
		});
		
		this._model.observables.selectedObjectChanged.registerCallback(function(origin, context) {
			if(self._activeObjectView !== null) { self._activeObjectView.destroy(); }
			$(self._el.objectView).empty();
			
			var obj = context.newObject;
			var v = null;
			if(obj instanceof tswlairmgr.core.data.Boss)
			{
				v = new tswlairmgr.modules.lookup.objectviews.LairBoss(self._el.objectView, obj, self._localization);
			}
			else if(obj instanceof tswlairmgr.core.data.RegionalBoss)
			{
				v = new tswlairmgr.modules.lookup.objectviews.RegionalBoss(self._el.objectView, obj, self._localization);
			}
			else if(obj instanceof tswlairmgr.core.data.BossFragment)
			{
				v = new tswlairmgr.modules.lookup.objectviews.LairFragment(self._el.objectView, obj, self._localization)
			}
			else if(obj instanceof tswlairmgr.core.data.RegionalBossFragment)
			{
				v = new tswlairmgr.modules.lookup.objectviews.RegionalFragment(self._el.objectView, obj, self._localization);
			}
			self._activeObjectView = v;
			
			if(v !== null) {
				self._activeObjectView._init();
			}
			self.observables.appBackgroundShouldChange.notify({});
			
			self._reset_selectors();
		});
	};
};