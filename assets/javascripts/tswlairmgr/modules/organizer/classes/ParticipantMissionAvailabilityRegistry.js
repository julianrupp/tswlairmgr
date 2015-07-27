var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ParticipantMissionAvailabilityRegistry = function ParticipantMissionAvailabilityRegistry() {
	this._persistentStateVersion = 1;
	this._registry = {};
	
	this.isAvailableForBossMission = function(bossInstance) {
		if(!(bossInstance.getId() in this._registry))
		{
			return true;
		}
		
		return this._registry[bossInstance.getId()];
	};
	
	this.setAvailabilityForBossMission = function(bossInstance, isAvailable) {
		this._registry[bossInstance.getId()] = isAvailable;
	};
	
	this.toggleAvailabilityForBossMission = function(bossInstance) {
		this.setAvailabilityForBossMission(
			bossInstance,
			!this.isAvailableForBossMission(bossInstance)
		);
	};
	
	this.getPersistentState = function()
	{
		return {
			v: this._persistentStateVersion,
			r: this._registry
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.r)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			var valid = true;
			
			// validation
			
			if(!valid) { return false; }
			
			this._registry = state.r;
			
			return true;
		}
		return false;
	};
};