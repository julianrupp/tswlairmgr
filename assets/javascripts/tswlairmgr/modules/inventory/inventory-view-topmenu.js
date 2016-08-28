var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.viewTopmenu = function inventoryViewTopmenu(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._subViews = {};
	
	this.observables = {
		fragmentcountsImportButtonClicked: new tswlairmgr.core.helpers.Observable(this),
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
		}
	};
	
	this._templates = {
		technicalFormat: '<span class="technical">{{context.text}}</span>'
	};
	
	this._appBackground = {
		"background": "#808080",
		"background-size": "cover"
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewTopmenu>: build called");
		
		this._build_topmenu_fragmentcounts_import_button();
		this._build_topmenu_fragmentcounts_import_box();
		$(this._el.self).append($("<div />").css("clear", "both").css("margin-bottom", "10px"));
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
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewTopmenu>: redraw called");
		
		this._redraw_topmenu_fragmentcounts_import_button();
		this._redraw_topmenu_fragmentcounts_import_box();
	};
	
	this._redraw_topmenu_fragmentcounts_import_button = function() {
		var self = this;
		$(this._el.fragmentcounts.importButton.button).val(
			self._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importButton.label
		);
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
					modLink: '<a href="'+tswlairmgr.core.info.exportmod.url_download+'" target="_blank">'+tswlairmgr.core.info.exportmod.name+'</a>'
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
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewTopmenu>: got notified that module localization has changed.");
			self._redraw();
		});
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewTopmenu>: got notified that data localization has changed.");
			self._redraw();
		});
	};
};