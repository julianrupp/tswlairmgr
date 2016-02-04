var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewTopmenu = function organizerViewTopmenu(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._subViews = {};
	
	this.observables = {
		appBackgroundShouldChange: new tswlairmgr.core.helpers.Observable(this),
		fragmentcountsImportButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		lairselectorDropdownChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentcountsImportStringPasted: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		fragmentcounts: {
			importButton: {
				rootNode: null,
				button: null
			},
			importBox: {
				rootNode: null,
				title: null,
				info: null,
				textField: null
			}
		},
		lairselector: {
			rootNode: null,
			label: null,
			select: null
		}
	};
	
	this._templates = {
		lairselector: {
			select: {
				optgroup: '{{{context.regionName}}}',
				option: '{{{context.zoneName}}}: {{{context.lairName}}}'
			}
		},
		technicalFormat: '<span class="technical">{{context.text}}</span>'
	};
	
	this._appBackground = {
		"background": "#808080",
		"background-size": "cover"
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: build called");
		
		this._build_topmenu_fragmentcounts_import_button();
		this._build_topmenu_lairselector();
		this._build_topmenu_fragmentcounts_import_box();
	};
	
	this._build_topmenu_fragmentcounts_import_button = function() {
		this._el.fragmentcounts.importButton.rootNode = $("<div />")
			.attr("id", "fragmentcountsImportButtonBox")
			.addClass("uibox");
		
		var self = this;
		this._el.fragmentcounts.importButton.button = $("<input />")
			.attr("type", "button")
			.attr("id", "fragmentcountsImportButton")
			.addClass("icon")
			.addClass("import")
			.click(function() {
				self.observables.fragmentcountsImportButtonClicked.notify({});
			});
		
		$(this._el.fragmentcounts.importButton.rootNode).append(this._el.fragmentcounts.importButton.button);
		$(this._el.self).append(this._el.fragmentcounts.importButton.rootNode);
	};
	
	this._build_topmenu_lairselector = function() {
		this._el.lairselector.rootNode = $("<div />")
			.attr("id", "lairselector")
			.addClass("uibox");
		
		this._el.lairselector.label = $("<div />")
			.attr("id", "lairselectorLabel");
		
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
	
	this._build_topmenu_fragmentcounts_import_box = function() {
		this._el.fragmentcounts.importBox.rootNode = $("<div />")
			.attr("id", "fragmentcountsImportBox")
			.addClass("uibox");
		
		var box = $(
			'<div class="importBox">' +
			'	<div class="importTitle"></div>' +
			'	<div class="importInfoText"></div>' +
			'	<textarea class="importTextField"></textarea>' +
			'</div>'
		);
		
		$(this._el.fragmentcounts.importBox.rootNode).append(box);
		
		this._el.fragmentcounts.importBox.title = $(".importTitle", this._el.fragmentcounts.importBox.rootNode);
		this._el.fragmentcounts.importBox.info = $(".importInfoText", this._el.fragmentcounts.importBox.rootNode);
		this._el.fragmentcounts.importBox.textField = $(".importTextField", this._el.fragmentcounts.importBox.rootNode);
		
		var self = this;
		$(this._el.fragmentcounts.importBox.textField).on("paste", function() {
			setTimeout(function() {
				var pasted = $(self._el.fragmentcounts.importBox.textField).val();
				self.closeAndClearImportBox();
				self.observables.fragmentcountsImportStringPasted.notify({
					data: pasted
				});
			},0);
		});
		
		$(this._el.self).append(this._el.fragmentcounts.importBox.rootNode);
		
		$(this._el.fragmentcounts.importBox.rootNode).hide();
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewTopmenu>: redraw called");
		
		this._redraw_topmenu_fragmentcounts_import_button();
		this._redraw_lairselector();
		this._redraw_topmenu_fragmentcounts_import_box();
	};
	
	this._redraw_topmenu_fragmentcounts_import_button = function() {
		var self = this;
		$(this._el.fragmentcounts.importButton.button).val(
			self._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importButton.label
		);
	};
	
	this._redraw_lairselector = function() {
		var self = this;
		var lairselectorBox = $("#lairselector", $(this._el.self));
		var labelNode = $("#lairselectorLabel", $(lairselectorBox));
		$(labelNode).text(self._localization.getLocalizationData().strings.topmenu.lairselector.selectLair);
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
	
	this._redraw_topmenu_fragmentcounts_import_box = function() {
		$(this._el.fragmentcounts.importBox.title).html(
			this._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importBox.title
		);
		var formattedPasteShortcut = Mustache.render(this._templates.technicalFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importBox.infoText.pasteShortcut
			}
		});
		$(this._el.fragmentcounts.importBox.info).html(
			Mustache.render(this._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importBox.infoText.text, {
				localization: this._localization.getLocalizationData(),
				context: {
					pasteShortcut: formattedPasteShortcut,
					modLink: '<a href="http://github.com/julianrupp/tswlairmgr-export-mod" target="_blank">TSW Lair Manager Export</a>'
				}
			})
		);
	};
	
	this.importBoxIsOpen = function() {
		return $(this._el.fragmentcounts.importButton.button).hasClass("active");
	};
	
	this.openImportBoxAndFocus = function() {
		$(this._el.fragmentcounts.importButton.button).addClass("active");
		$(this._el.fragmentcounts.importBox.rootNode).show();
		$(this._el.fragmentcounts.importBox.textField).focus();
	};
	
	this.closeImportBox = function() {
		$(this._el.fragmentcounts.importButton.button).removeClass("active");
		$(this._el.fragmentcounts.importBox.rootNode).hide();
	};
	
	this.closeAndClearImportBox = function() {
		$(this._el.fragmentcounts.importBox.textField).val("");
		this.closeImportBox();
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