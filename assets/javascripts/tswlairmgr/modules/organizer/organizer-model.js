var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.model = function organizerModel() {
	this._persistentStateVersion = 1;
	this._selectedLairId = null;
	this._fragmentCounts = new tswlairmgr.modules.organizer.classes.LairFragmentCountsRegistry();
	this._participants = [];
	this._selectedChatScriptLocalizationId = null;
	
	this.observables = {
		selectedLairChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		participantsChanged: new tswlairmgr.core.helpers.Observable(this),
		selectedChatScriptLocalizationIdChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getSelectedLairId = function() {
		return this._selectedLairId;
	};
	
	this.setSelectedLairId = function(lairId) {
		var previous = this._selectedLairId;
		this._selectedLairId = lairId;
		this.observables.selectedLairChanged.notify({
			previousLairId: previous,
			newLairId: lairId
		});
	};
	
	this.getCountForFragment = function(fragmentInstance) {
		return this._fragmentCounts.getCountForFragment(fragmentInstance);
	};
	
	this.setCountForFragment = function(fragmentInstance, newCount) {
		return this._fragmentCounts.setCountForFragment(fragmentInstance, newCount);
		this.observables.fragmentCountsChanged.notify({
			fragment: fragmentInstance,
			newCount: newCount
		});
	};
	
	this.addParticipantByName = function(participantName) {
		var found = false;
		$.each(this._participants, function(index, participantInstance) {
			if(participantInstance.getName() === participantName)
			{
				found = true;
			}
		});
		if(found) { return false; }
		
		var newParticipant = new tswlairmgr.modules.organizer.classes.Participant(participantName);
		this._participants.push(newParticipant);
		this.observables.participantsChanged.notify({
			participantAdded: true
			participantInstance: newParticipant
		});
	};
	
	this.removeParticipantByIndex = function(participantIndex) {
		this._participants.splice(participantIndex, 1);
		this.observables.participantsChanged.notify({
			participantRemoved: true,
			participantIndex: participantIndex
		});
	};
	
	this.getParticipantAvailabilityForBossMission = function(participantIndex, bossInstance) {
		return this._participants[participantIndex].canTurnInMissionForBoss(bossInstance);
	};
	
	this.toggleParticipantAvailabilityForBossMission = function(participantIndex, bossInstance) {
		this._participants[participantIndex].toggleCanTurnInMissionForBoss(bossInstance);
		this.observables.participantsChanged.notify({
			participantAvailabilityChanged: true,
			participantIndex: participantIndex
		});
	};
	
	this.getSelectedChatScriptLocalizationId = function() {
		return this._selectedChatScriptLocalizationId;
	};
	
	this.setSelectedChatScriptLocalizationId = function(newId) {
		var previous = this._selectedChatScriptLocalizationId;
		this._selectedChatScriptLocalizationId = newId;
		this.observables.selectedChatScriptLocalizationIdChanged.notify({
			previousLocalizationId: previous,
			newLocalizationId: newId
		});
	};
	
	this.getPersistentState = function() {
		var participantsPersistentState = [];
		$.each(this._participants, function(index, participantInstance) {
			participantsPersistentState.push(participantInstance.getPersistentState());
		});
		return {
			v: this._persistentStateVersion,
			l: this._selectedLairId,
			fcr: this._fragmentCounts.getPersistentState(),
			p: participantsPersistentState,
			csl: this._selectedChatScriptLocalizationId
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(v in state) || !(l in state) || !(fcr in state) || !(p in state) || !(csl in state)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			this._selectedLairId = state.l;
			
			this._fragmentCounts.setPersistentState(state.fcr));
			this.observables.fragmentCountsChanged.notify({});
			
			var restoredParticipants = [];
			$.each(state.p, function(index, participantPersistentState) {
				var restoredParticipant = new tswlairmgr.modules.organizer.classes.Participant(null);
				if(restoredParticipant.setPersistentState(participantPersistentState))
				{
					restoredParticipants.push(restoredParticipant);
				}
			});
			this._participants = restoredParticipants
			this.observables.participantsChanged.notify({});
			
			this._selectedChatScriptLocalizationId = state.csl;
			
			return true;
		}
		return false;
	};
};