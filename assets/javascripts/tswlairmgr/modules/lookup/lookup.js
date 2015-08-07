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
			
			var appBackgroundCss = {};
			var objectviewInstance = self._view._activeObjectView;
			if(objectviewInstance !== null)
			{
				appBackgroundCss = objectviewInstance.getAppBackgroundCss();
			}
			else
			{
				// No object selected yet
				appBackgroundCss = {
					"background": "#808080 url(assets/images/lookup/default.jpg) no-repeat fixed center",
					"background-size": "cover"
				};
			}
			
			self._view._appBackground = appBackgroundCss;
			if(tswlairmgr.modules.getActiveModuleId() == self.id)
			{
				self._view._refreshBackground();
			}
		});
		
		this._view.observables.selectorDropdownUsed.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.lookup.controller>: got notified that one of the dropdown selectors was used.");
			
			var obj = context.selectedObject;
			self._model.setSelectedObject(obj);
		});
		
		// TODO: Callback registering here
		
		this._view.observables.appBackgroundShouldChange.notify({});
	};
	
	tswlairmgr.modules.registerModule(this);
};