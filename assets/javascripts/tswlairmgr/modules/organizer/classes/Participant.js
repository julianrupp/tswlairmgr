var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.Participant = function Participant(name) {
	this._persistentStateVersion = 1;
	this._name = $.trim(name);
	this._missionAvailabilityRegistry = new tswlairmgr.modules.organizer.classes.ParticipantMissionAvailabilityRegistry();
	
	this.observables = {
		missionAvailabilityChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._missionAvailabilityChangedCallback = function(origin, context) {
		self.observables.missionAvailabilityChanged.notify(context);
	};
	this._missionAvailabilityRegistry.observables.changed.registerCallback(this._missionAvailabilityChangedCallback);
	
	this.getName = function() {
		return this._name;
	};
	
	this.canTurnInMissionForBoss = function(bossInstance) {
		return this._missionAvailabilityRegistry.isAvailableForBossMission(bossInstance);
	};
	
	this.toggleCanTurnInMissionForBoss = function(bossInstance) {
		this._missionAvailabilityRegistry.toggleAvailabilityForBossMission(bossInstance);
	};
	
	this.isValidName = function(name) {
		name = $.trim(name);
		return name.match(/^[a-zA-Z0-9\-_]+$/) && name.length > 0;
	};
	
	this.getPersistentState = function()
	{
		return {
			v: this._persistentStateVersion,
			n: this._name,
			r: this._missionAvailabilityRegistry.getPersistentState()
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.n) || !(state.r)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			var valid = true;
			
			if(!this._missionAvailabilityRegistry.setPersistentState(state.r))
			{
				valid = false;
			}
			
			if(!this.isValidName(state.n))
			{
				valid = false;
			}
			
			if(!valid) { return false; }
			
			this._name = state.n;
			
			return true;
		}
		return false;
	};
};