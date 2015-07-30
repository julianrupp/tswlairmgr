var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.model = function organizerModel() {
	this._persistentStateVersion = 1;
	this._selectedLair = tswlairmgr.core.data.getSortedRegions()[0].getSortedZones()[0].getSortedLairs()[0];
	this._fragmentCounts = new tswlairmgr.modules.organizer.classes.LairFragmentCountsRegistry();
	this._participants = new tswlairmgr.modules.organizer.classes.ParticipantRegistry();
	this._selectedChatScriptLocalizationId = tswlairmgr.core.data.getDefaultLocalizationId();
	
	this.observables = {
		selectedLairChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		participantsChanged: new tswlairmgr.core.helpers.Observable(this),
		selectedChatScriptLocalizationIdChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getSelectedLair = function() {
		return this._selectedLair;
	};
	
	this.setSelectedLair = function(lair) {
		this._selectedLair = lair;
		this.observables.selectedLairChanged.notify({
			newLair: lair
		});
	};
	
	this.getCountForFragment = function(fragmentInstance) {
		return this._fragmentCounts.getCountForFragment(fragmentInstance);
	};
	
	this.setCountForFragment = function(fragmentInstance, newCount) {
		this._fragmentCounts.setCountForFragment(fragmentInstance, newCount);
	};
	
	this.addParticipantByName = function(participantName) {
		// TODO
	};
	
	this.removeParticipantByWHAT = function(whatArg) {
		// TODO
	};
	
	this.getSelectedChatScriptLocalizationId = function() {
		return this._selectedChatScriptLocalizationId;
	};
	
	this.setSelectedChatScriptLocalizationId = function(newId) {
		this._selectedChatScriptLocalizationId = newId;
		this.observables.selectedChatScriptLocalizationIdChanged.notify({
			newLocalizationId: newId
		});
	};
	
	this.getPersistentState = function() {
		return {
			v: this._persistentStateVersion,
			l: this.getSelectedLair().getId()
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.l)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			var lair = tswlairmgr.core.data.getLairById(state.l);
			if(lair)
			{
				this.setSelectedLair(lair);
			}
			
			/*this._fragmentCounts.setPersistentState(state.fcr);
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
			
			if($.inArray(state.csl, tswlairmgr.core.data.getAllLocalizationIds()) !== -1)
			{
				this.setSelectedChatScriptLocalizationId(state.csl);
			}*/
			
			return true;
		}
		return false;
	};
};