var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};

tswlairmgr.modules.lookup.controller = new function() {
	this.id = "lookup";
	
	this._model = new tswlairmgr.modules.lookup.model();
	this._view = null;
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: initWithRootNode: initializing...");
		
		this._view = new tswlairmgr.modules.lookup.view(contentNode, this._model, this._localization);
		this._view._init();
		
		this._init();
		
		var self = this;
		$.each(this._model.observables, function(observableName, observable) {
			observable.registerCallback(function() {
				self._updatePersistentState();
			});
		});
		
		var self = this;
		tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: got notified by system that persistent state was loaded");
			self._loadPersistentState(tswlairmgr.core.persistentstate.getModuleState(self));
		});
	};
	
	this.becameActive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: got notified that module became active.");
		
		this._view.becameActive();
	};
	
	this.becameInactive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: got notified that module became inactive.");
		
		this._view.becameInactive();
	};
	
	this._loadPersistentState = function(state) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: loadPersistentState =");
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
		
		this._view.observables.appBackgroundShouldChange.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: got notified that app background should change.");
			var obj = self._model.getSelectedObject();
			if(obj instanceof tswlairmgr.core.data.Boss)
			{
				self._view._appBackground["background"] = "#808080 url(assets/images/lair/"+obj.getLair().getId()+".jpg) no-repeat fixed center";
			}
			else if(obj instanceof tswlairmgr.core.data.RegionalBoss)
			{
				self._view._appBackground["background"] = "#808080 url(assets/images/region/"+obj.getId()+".jpg) no-repeat fixed center";
			}
			else if(obj instanceof tswlairmgr.core.data.BossFragment)
			{
				self._view._appBackground["background"] = "#808080 url(assets/images/lair/"+obj.getSet().getBoss().getId()+".jpg) no-repeat fixed center";
			}
			else if(obj instanceof tswlairmgr.core.data.RegionalBossFragment)
			{
				self._view._appBackground["background"] = "#808080 url(assets/images/region/"+obj.getSet().getBoss().getId()+".jpg) no-repeat fixed center";
			}
			
			if(tswlairmgr.modules.getActiveModuleId() == self.id)
			{
				self._view._refreshBackground();
			}
		});
		
		// TODO: Callback registering here
	};
	
	tswlairmgr.modules.registerModule(this);
};