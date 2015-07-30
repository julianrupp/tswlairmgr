var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ParticipantRegistry = function ParticipantRegistry() {
	this._persistentStateVersion = 1;
	this._participants = [];
	
	// TODO
	// - callbacks
	// - addParticipant
	// - removeParticipant
	// - getParticipants
	
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
			$.each(state.pa, function(index, participantPS) {
				var newParticipant = new tswlairmgr.modules.organizer.classes.Participant();
				if(newParticipant.setPersistentState(participantPS))
				{
					this._participants.push(newParticipant);
				}
			});
			
			return true;
		}
		return false;
	};
};