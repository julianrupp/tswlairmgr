var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.organizer = new function() {
	this.id = "organizer";
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	
	var self = this;
	this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: got notified that localization has changed.");
		self._redraw();
	});
	
	this._templates = {
		
	};
	
	this._appBackgroundSavedSnapshot = null;
	
	this._el = {
		self: null
	};
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: initWithRootNodeAndState: initializing...");
		
		this._el.self = contentNode;
		
		this._localization.init();
		
		this._build();
		
		var self = this;
		tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: persistent state loaded, running deferred initialization");
			self._loadPersistentState(tswlairmgr.core.persistentstate.getModuleState(self));
			self._redraw();
		});
	};
	
	this.becameActive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: got notified that module became active.");
		
		this._appBackgroundSavedSnapshot = $("body").css("background");
		$("body").css("background", "#646464"); // TODO: Get currently selected lair or (if none selected) default color [should automatically select first dropdown entry on load]
	};
	
	this.becameInactive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: got notified that module became inactive.");
		
		// Restore snapshot
		$("#webapp").css("background", this._appBackgroundSavedSnapshot);
	};
	
	this._moduleStateChanged = function() {
		tswlairmgr.core.persistentstate.updateModuleState(this, this._getPersistentState());
	};
	
	this._getPersistentState = function() {
		// TODO: Check current module state and build compact representation
	};
	
	this._loadPersistentState = function(state) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: loadPersistentState =");
		if(tswlairmgr.core.config.debug) console.log(state);
		if(state)
		{
			// TODO: Verify each entry and try to set module state
			// Use sub-functions, call this._moduleStateChanged(); at end of each
		}
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: build called");
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer>: redraw called");
		
		$(this._el.self).text("Hello World");
	};
	
	tswlairmgr.modules.registerModule(this);
};