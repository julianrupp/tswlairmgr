var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.view = function inventoryView(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._subViews = {};
	
	this.observables = {
		fragmentcountsImportButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentcountsImportStringPasted: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		notesModified: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		topmenu: null,
		notes: null,
		fragmenttable: null
	};
	
	this._appBackgroundSaved = {
		"background": null,
		"background-size": null
	};
	
	this._appBackground = {
		"background": "#808080 url(assets/images/inventory/default.jpg) no-repeat fixed center",
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
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.view>: build called");
		
		this._build_topmenu();
		this._build_notes();
		this._build_fragmenttable();
	};
	
	this._build_topmenu = function() {
		this._el.topmenu = $("<div />")
			.attr("id", "topmenu");
		
		$(this._el.self).append(this._el.topmenu);
		
		this._subViews.topmenu = new tswlairmgr.modules.inventory.viewTopmenu(this._el.topmenu, this._model, this._localization);
		this._subViews.topmenu._init();
	};
	
	this._build_notes = function() {
		this._el.notes = $("<div />")
			.attr("id", "notes");
		
		$(this._el.self).append(this._el.notes);
		
		this._subViews.notes = new tswlairmgr.modules.inventory.viewNotes(this._el.notes, this._model, this._localization);
		this._subViews.notes._init();
	};
	
	this._build_fragmenttable = function() {
		this._el.fragmenttable = $("<div />")
			.attr("id", "fragmenttable");
		
		$(this._el.self).append(this._el.fragmenttable);
		
		this._subViews.fragmenttable = new tswlairmgr.modules.inventory.viewFragmenttable(this._el.fragmenttable, this._model, this._localization);
		this._subViews.fragmenttable._init();
	};
	
	this._redraw = function() {
		/* Nothing to redraw directly in this view. */
	};
	
	this._init = function() {
		this._localization.init();
		
		this._build();
		this._redraw();
		
		var self = this;
		
		// Top menu
		this._subViews.topmenu.observables.fragmentcountsImportButtonClicked.registerCallback(function(origin, context) {
			self.observables.fragmentcountsImportButtonClicked.notify(context);
		});
		
		this._subViews.topmenu.observables.fragmentcountsImportStringPasted.registerCallback(function(origin, context) {
			self.observables.fragmentcountsImportStringPasted.notify(context);
		});
		
		// Notes
		this._subViews.notes.observables.notesModified.registerCallback(function(origin, context) {
			self.observables.notesModified.notify(context);
		});
		
		// Fragment table
		this._subViews.fragmenttable.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			self.observables.fragmentCountPlusButtonClicked.notify(context);
		});
		
		this._subViews.fragmenttable.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			self.observables.fragmentCountMinusButtonClicked.notify(context);
		});
		
		this._subViews.fragmenttable.observables.regionalFragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			self.observables.regionalFragmentCountPlusButtonClicked.notify(context);
		});
		
		this._subViews.fragmenttable.observables.regionalFragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			self.observables.regionalFragmentCountMinusButtonClicked.notify(context);
		});
	};
};