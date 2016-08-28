var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.controller = new function() {
	this.id = "inventory";
	
	this._model = new tswlairmgr.modules.inventory.model();
	this._view = null;
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.getModel = function() {
		return this._model;
	};
	
	this.externalInvokeFragmentImport = function() {
		tswlairmgr.modules.setActiveModuleById(this.id);
		this._view.observables.fragmentcountsImportButtonClicked.notify({});
	};
	
	this.initWithRootNode = function(contentNode) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: initWithRootNode: initializing...");
		
		this._view = new tswlairmgr.modules.inventory.view(contentNode, this._model, this._localization);
		this._view._init();
		
		this._init();
		
		var self = this;
		this._model.observables.notesChanged.registerCallback(function() {
			self._updatePersistentState();
		});
		
		var self = this;
		tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified by system that persistent state was loaded");
			self._loadPersistentState(tswlairmgr.core.persistentstate.getModuleState(self));
		});
	};
	
	this.becameActive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that module became active.");
		
		this._view.becameActive();
	};
	
	this.becameInactive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that module became inactive.");
		
		this._view.becameInactive();
	};
	
	this._loadPersistentState = function(state) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: loadPersistentState =");
		if(tswlairmgr.core.config.debug) console.log(state);
		if(state)
		{
			this._model.setPersistentState(state);
		}
		this._updatePersistentState();
	};
	
	this._updatePersistentState = function() {
		tswlairmgr.core.persistentstate.updateModuleState(this, this._model.getPersistentState());
	};
	
	this._init = function() {
		var self = this;
		
		// ----------
		// Top
		this._view.observables.fragmentcountsImportButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that the fragment counts import button was clicked.");
			
			if(self._view._subViews.topmenu.importBoxIsOpen())
			{
				self._view._subViews.topmenu.closeImportBox();
			}
			else
			{
				self._view._subViews.topmenu.openImportBoxAndFocus();
			}
		});
		
		this._view.observables.fragmentcountsImportStringPasted.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that data has been pasted into the fragment counts import text field.");
			
			var stats = tswlairmgr.modules.inventory.classes.ExportStringParser.updateFragmentRegistriesFromExportString(self._model._fragmentRegistry.getLairFragmentCountsRegistry(), self._model._fragmentRegistry.getRegionalFragmentCountsRegistry(), context.data);
			
			var renderedMessage = "";
			if(stats)
			{
				var messageBase = self._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importBox.importedMessage;
				renderedMessage = Mustache.render(messageBase.message, {
					localization: self._localization.getLocalizationData(),
					context: {
						totalFragments: Mustache.render(
							((stats.totalFragments == 1) ?
								messageBase.totalFragments.singular :
								messageBase.totalFragments.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.totalFragments
							}
						}),
						distinctFragments: Mustache.render(
							((stats.distinctFragments == 1) ?
								messageBase.distinctFragments.singular :
								messageBase.distinctFragments.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctFragments
							}
						}),
						distinctRegions: Mustache.render(
							((stats.distinctRegions == 1) ?
								messageBase.distinctRegions.singular :
								messageBase.distinctRegions.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctRegions
							}
						}),
						distinctZones: Mustache.render(
							((stats.distinctZones == 1) ?
								messageBase.distinctZones.singular :
								messageBase.distinctZones.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctZones
							}
						}),
						distinctLairs: Mustache.render(
							((stats.distinctLairs == 1) ?
								messageBase.distinctLairs.singular :
								messageBase.distinctLairs.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctLairs
							}
						}),
						distinctBosses: Mustache.render(
							((stats.distinctBosses == 1) ?
								messageBase.distinctBosses.singular :
								messageBase.distinctBosses.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctBosses
							}
						}),
						totalRegionalFragments: Mustache.render(
							((stats.totalRegionalFragments == 1) ?
								messageBase.totalRegionalFragments.singular :
								messageBase.totalRegionalFragments.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.totalRegionalFragments
							}
						}),
						distinctRegionalFragments: Mustache.render(
							((stats.distinctRegionalFragments == 1) ?
								messageBase.distinctRegionalFragments.singular :
								messageBase.distinctRegionalFragments.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctRegionalFragments
							}
						}),
						distinctRegionalRegions: Mustache.render(
							((stats.distinctRegionalRegions == 1) ?
								messageBase.distinctRegionalRegions.singular :
								messageBase.distinctRegionalRegions.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctRegionalRegions
							}
						}),
						distinctRegionalBosses: Mustache.render(
							((stats.distinctBosses == 1) ?
								messageBase.distinctRegionalBosses.singular :
								messageBase.distinctRegionalBosses.plural), {
							localization: self._localization.getLocalizationData(),
							context: {
								number: stats.distinctRegionalBosses
							}
						})
					}
				})
			}
			else
			{
				renderedMessage = Mustache.render(
					self._localization.getLocalizationData().strings.topmenu.fragmentcountsImport.importBox.importErrorMessage.message, {
					localization: self._localization.getLocalizationData(),
					context: {
					}
				});
			}
			alert(renderedMessage);
		});
		
		// ----------
		// Notes
		this._view.observables.notesModified.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that the notes were modified in the view.");
			self._model.setNotes(context.notes);
		});
		this._model.observables.notesChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that the notes were changed in the model.");
			self._updatePersistentState();
		});
		
		// ----------
		// Fragment Counts
		this._view.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that a fragment count plus button was clicked.");
			self._model.incrementCountForFragment(context.fragment);
		});
		
		this._view.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that a fragment count minus button was clicked.");
			self._model.decrementCountForFragment(context.fragment);
		});
		this._view.observables.regionalFragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that a regional fragment count plus button was clicked.");
			self._model.incrementCountForRegionalFragment(context.fragment);
		});
		
		this._view.observables.regionalFragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.controller>: got notified that a regional fragment count minus button was clicked.");
			self._model.decrementCountForRegionalFragment(context.fragment);
		});
	};
	
	tswlairmgr.modules.registerModule(this);
};