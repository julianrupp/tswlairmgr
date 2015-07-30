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
		topmenu: null,
		bosstable: null,
		picktable: null,
		output: null
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
		$("body").css("background", this._appBackground["background"]);
		$("body").css("background-size", this._appBackground["background-size"]);
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: build called");
		
		this._build_topmenu();
		//this._build_bosstable();
		// TODO: this._build_picktable();
		// TODO: this._build_output();
	};
	
	this._build_topmenu = function() {
		this._el.topmenu = $("<div />")
			.attr("id", "topmenu");
		
		$(this._el.self).append(this._el.topmenu);
		
		this._subViews.topmenu = new tswlairmgr.modules.organizer.viewTopmenu(this._el.topmenu, this._model, this._localization);
		this._subViews.topmenu._init();
	};
	
	/*this._build_bosstable = function() {
		this._el.bosstable = $("<div />")
			.attr("id", "bosstable");
		
		$(this._el.self).append(this._el.bosstable);
		
		this._subViews.bosstable = new tswlairmgr.modules.organizer.viewBosstable(this._el.bosstable, this._model, this._localization);
	};*/
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.view>: redraw called");
		
		this._redraw_topmenu();
		//this._redraw_bosstable();
		// TODO: this._redraw_picktable();
		// TODO: this._redraw_output();
	};
	
	this._redraw_topmenu = function() {
		this._subViews.topmenu._redraw();
	};
	
	/*this._redraw_bosstable = function() {
		this._subViews.bosstable._redraw();
	};*/
	
	/* TODO: MOVE TO BOSSTABLE VIEW
	this._redraw_bosstable = function() {
		var bt = $(this._el.bosstable.rootNode);
		$(bt).empty();
		
		var lair = this._model.getSelectedLair();
		if(!lair){ return; }
		
		var bosses = lair.getSortedBosses();
		var i = bosses.length;
		var lineNode, lineNodeHTML = '<table><tbody><tr></tr></tbody></table>';
		var columnNodeHTML = '<td class="uibox inner"><div class="innerContent"></div></td>'; // TODO: uibox temp
		var paddingNodeHTML = '<td class="pad" />';
		
		while(i > 0)
		{
			lineNode = $(lineNodeHTML);
			
			if(i >= 3)
			{
				$(lineNode).addClass("three");
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				i -= 3;
			}
			else if(i >= 2)
			{
				$(lineNode).addClass("two");
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				i -= 2;
			}
			else if(i >= 1)
			{
				$(lineNode).addClass("one");
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				i -= 1;
			}
			
			$(bt).append(lineNode);
		}
		
		this._redraw_bosstable_bossblocks();
	};
	
	this._redraw_bosstable_bossblocks = function() {
		$.each(this._bosstableItemMVCControllers, function(index, controller) {
			controller.destroy();
		});
		this._bosstableItemMVCControllers = [];
		
		var bt = $(this._el.bosstable.rootNode);
		var lair = this._model.getSelectedLair();
		if(!lair){ return; }
		var bosses = lair.getSortedBosses();
		
		var k = 0;
		var self = this;
		$("td.inner .innerContent", $(bt)).each(function(index) {
			var contentNode = this;
			var boss = bosses[k];
			if(!boss) { return; }
			self._bosstableItemMVCControllers.push(
				new tswlairmgr.core.components.ItemHTML(
					boss,
					contentNode,
					{}
				) // TODO: TEMP
			);
			k++;
		});
	};
	
	this._createBossFragmentsTable = function() {
		// ...
	};*/
	
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
		
		this._subViews.topmenu.observables.appBackgroundShouldChange.registerCallback(function(origin, context) {
			self.observables.appBackgroundShouldChange.notify(context);
		});
		
		this._subViews.topmenu.observables.lairselectorDropdownChanged.registerCallback(function(origin, context) {
			self.observables.lairselectorDropdownChanged.notify(context);
		});
		
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