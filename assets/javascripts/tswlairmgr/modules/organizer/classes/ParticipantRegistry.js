var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ParticipantRegistry = function ParticipantRegistry() {
	this._persistentStateVersion = 1;
	this._participants = [];
	
	this.observables = {
		participantAdded: new tswlairmgr.core.helpers.Observable(this),
		participantRemoved: new tswlairmgr.core.helpers.Observable(this),
		participantMissionAvailabilityChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._missionAvailabilityChangedCallback = function(origin, context) {
		self.observables.participantMissionAvailabilityChanged.notify(context);
	};
	
	this.addParticipant = function(participantInstance) {
		if($.inArray(participantInstance, this._participants) !== -1)
		{
			return false;
		}
		var participantNames = [];
		$.each(this._participants, function(index, participant) {
			participantNames.push(participant.getName());
		});
		if($.inArray(participantInstance.getName(), participantNames) !== -1)
		{
			return false;
		}
		
		this._participants.push(participantInstance);
		
		participantInstance.observables.missionAvailabilityChanged.registerCallback(this._missionAvailabilityChangedCallback);
		
		this.observables.participantAdded.notify({
			participant: participantInstance
		});
		
		return true;
	};
	
	this.removeParticipant = function(participantInstance) {
		var found = false;
		var fIndex = null;
		$.each(this._participants, function(index, participant) {
			if(participant === participantInstance)
			{
				participantInstance.observables.missionAvailabilityChanged.unregisterCallback(this._missionAvailaibilityChangedCallback);
				fIndex = index;
				found = true;
				return;
			}
		});
		
		if(found)
		{
			this._participants.splice(fIndex, 1);
			
			this.observables.participantRemoved.notify({
				participant: participantInstance
			});
			
			return true;
		}
		
		return false;
	};
	
	this.getParticipants = function() {
		return this._participants;
	};
	
	this.getListIndexOfParticipant = function(participantInstance) {
		var found = false;
		var listIndex = null;
		$.each(this._participants, function(index, participant) {
			if(participant === participantInstance)
			{
				listIndex = index;
				found = true;
				return;
			}
		});
		if(!found) { return false; }
		return listIndex;
	};
	
	this.getPersistentState = function()
	{
		var participantPSes = [];
		$.each(this._participants, function(index, participant) {
			participantPSes.push(participant.getPersistentState());
		});
		return {
			v: this._persistentStateVersion,
			pa: participantPSes
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.pa)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			this._participants = [];
			var self = this;
			$.each(state.pa, function(index, participantPS) {
				var newParticipant = new tswlairmgr.modules.organizer.classes.Participant();
				if(newParticipant.setPersistentState(participantPS))
				{
					self.addParticipant(newParticipant);
				}
			});
			
			return true;
		}
		return false;
	};
};