var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.view = function organizerView(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._subViews = {};
	
	this.observables = {
		appBackgroundShouldChange: new tswlairmgr.core.helpers.Observable(this),
		lairselectorDropdownChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantAddButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantImportButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantImportChatLogPasted: new tswlairmgr.core.helpers.Observable(this),
		participantMissionAvailabilityToggleClicked: new tswlairmgr.core.helpers.Observable(this),
		participantRemoveButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		outputDataLocalizationButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		outputGenerateButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		topmenu: null,
		bosstable: null,
		picktable: null,
		output: null
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
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: build called");
		
		this._build_topmenu();
		this._build_bosstable();
		this._build_picktable();
		// TODO: this._build_output();
	};
	
	this._build_topmenu = function() {
		this._el.topmenu = $("<div />")
			.attr("id", "topmenu");
		
		$(this._el.self).append(this._el.topmenu);
		
		this._subViews.topmenu = new tswlairmgr.modules.organizer.viewTopmenu(this._el.topmenu, this._model, this._localization);
		this._subViews.topmenu._init();
	};
	
	this._build_bosstable = function() {
		this._el.bosstable = $("<div />")
			.attr("id", "bosstable");
		
		$(this._el.self).append(this._el.bosstable);
		
		this._subViews.bosstable = new tswlairmgr.modules.organizer.viewBosstable(this._el.bosstable, this._model, this._localization);
		this._subViews.bosstable._init();
	};
	
	this._build_picktable = function() {
		this._el.picktable = $("<div />")
			.attr("id", "picktable");
		
		$(this._el.self).append(this._el.picktable);
		
		this._subViews.picktable = new tswlairmgr.modules.organizer.viewPicktable(this._el.picktable, this._model, this._localization);
		this._subViews.picktable._init();
	};
	
	this._redraw = function() {
		//if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: redraw called");
		
		/* Nothing to redraw directly in this view. */
	};
	
	this._init = function() {
		this._localization.init();
		
		this._build();
		this._redraw();
		
		var self = this;
		
		// Top menu
		this._subViews.topmenu.observables.appBackgroundShouldChange.registerCallback(function(origin, context) {
			self.observables.appBackgroundShouldChange.notify(context);
		});
		
		this._subViews.topmenu.observables.lairselectorDropdownChanged.registerCallback(function(origin, context) {
			self.observables.lairselectorDropdownChanged.notify(context);
		});
		
		// Boss table
		this._subViews.bosstable.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			self.observables.fragmentCountPlusButtonClicked.notify(context);
		});
		
		this._subViews.bosstable.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			self.observables.fragmentCountMinusButtonClicked.notify(context);
		});
		
		// Pick table
		this._subViews.picktable.observables.participantAddButtonClicked.registerCallback(function(origin, context) {
			self.observables.participantAddButtonClicked.notify(context);
		});
		
		this._subViews.picktable.observables.participantImportButtonClicked.registerCallback(function(origin, context) {
			self.observables.participantImportButtonClicked.notify(context);
		});
		
		this._subViews.picktable.observables.participantImportChatLogPasted.registerCallback(function(origin, context) {
			self.observables.participantImportChatLogPasted.notify(context);
		});
		
		this._subViews.picktable.observables.participantMissionAvailabilityToggleClicked.registerCallback(function(origin, context) {
			self.observables.participantMissionAvailabilityToggleClicked.notify(context);
		});
		
		this._subViews.picktable.observables.participantRemoveButtonClicked.registerCallback(function(origin, context) {
			self.observables.participantRemoveButtonClicked.notify(context);
		});
		
		// TODO: More observables
		
		/* TODO: MOVE TO SUB-VIEWS
		this._model.observables.selectedLairChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: got notified that selected lair has changed.");
			//self._update_topmenu();
			//self._redraw_bosstable();
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
		});*/
	};
};