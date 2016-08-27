var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.model = function inventoryModel() {
	this._persistentStateVersion = 1;
	this._fragmentRegistry = tswlairmgr.core.fragmentregistry;
	this._notes = "";
	
	this.observables = {
		fragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		notesChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._fragmentRegistry.getLairFragmentCountsRegistry().observables.countChanged.registerCallback(function(origin, context) {
		self.observables.fragmentCountsChanged.notify(context);
	});
	this._fragmentRegistry.getRegionalFragmentCountsRegistry().observables.countChanged.registerCallback(function(origin, context) {
		self.observables.regionalFragmentCountsChanged.notify(context);
	});
	
	this.getNotes = function() {
		return this._notes;
	};
	
	this.setNotes = function(notes) {
		this._notes = notes;
	};
	
	this.getPersistentState = function() {
		return {
			v: this._persistentStateVersion,
			n: this._notes
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.n)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			this._notes = state.n;
			this.observables.notesChanged.notify({});
			
			return true;
		}
		return false;
	};
};