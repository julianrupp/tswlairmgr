var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.model = function organizerModel() {
	this._persistentStateVersion = 1;
	this._selectedLair = tswlairmgr.core.data.getSortedRegions()[0].getSortedZones()[0].getSortedLairs()[0];
	this._fragmentCounts = new tswlairmgr.modules.organizer.classes.LairFragmentCountsRegistry();
	this._participants = new tswlairmgr.modules.organizer.classes.ParticipantRegistry();
	this._assigningStrategy = new tswlairmgr.modules.organizer.classes.LairFragmentAssigningStrategy(this._fragmentCounts, this._participants, this._selectedLair);
	this._selectedChatScriptLocalizationId = tswlairmgr.core.data.getDefaultLocalizationId();
	this._selectedChatScriptOrderStyle = tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum.o.BY_PARTICIPANT;
	
	this.observables = {
		selectedLairChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentWillHaveCountBroadcast: new tswlairmgr.core.helpers.Observable(this),
		participantsChanged: new tswlairmgr.core.helpers.Observable(this),
		fragmentAssignmentChanged: new tswlairmgr.core.helpers.Observable(this),
		selectedChatScriptLocalizationIdChanged: new tswlairmgr.core.helpers.Observable(this),
		selectedChatScriptOrderStyleChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._fragmentCounts.observables.countChanged.registerCallback(function(origin, context) {
		self.observables.fragmentCountsChanged.notify(context);
	});
	$.each(["participantAdded", "participantRemoved", "participantMissionAvailabilityChanged"], function(index, observableName) {
		self._participants.observables[observableName].registerCallback(function(origin, context) {
			self.observables.participantsChanged.notify({});
		});
	});
	this._assigningStrategy.observables.fragmentAssignmentChanged.registerCallback(function(origin, context) {
		self.observables.fragmentAssignmentChanged.notify({});
	});
	
	this.getSelectedLair = function() {
		return this._selectedLair;
	};
	
	this.setSelectedLair = function(lair) {
		this._selectedLair = lair;
		this._assigningStrategy.setLair(this._selectedLair);
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
	
	this.incrementCountForFragment = function(fragmentInstance) {
		this._fragmentCounts.incrementCountForFragment(fragmentInstance);
	};
	
	this.decrementCountForFragment = function(fragmentInstance) {
		this._fragmentCounts.decrementCountForFragment(fragmentInstance);
	};
	
	this.getWillHaveCountForFragment = function(fragmentInstance) {
		return this._assigningStrategy.getWillHaveCountForFragment(fragmentInstance);
	};
	
	this.isLowOnFragment = function(fragmentInstance) {
		var fragments = fragmentInstance.getSet().getFragments();
		var lowestCount = null;
		
		var self = this;
		$.each(fragments, function(orientationCode, fragment) {
			var count = self._fragmentCounts.getCountForFragment(fragment);
			
			if(lowestCount === null || count < lowestCount)
			{
				lowestCount = count;
			}
		});
		
		if(this._fragmentCounts.getCountForFragment(fragmentInstance) <= lowestCount)
		{
			return true;
		}
		return false;
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
	
	this.setSelectedChatScriptOrderStyle = function(newOrderStyle) {
		this._selectedChatScriptOrderStyle = newOrderStyle;
		this.observables.selectedChatScriptOrderStyleChanged.notify({
			newOrderStyle: newOrderStyle
		});
	};
	
	this.getPersistentState = function() {
		return {
			v: this._persistentStateVersion,
			l: this.getSelectedLair().getId(),
			fcr: this._fragmentCounts.getPersistentState(),
			pr: this._participants.getPersistentState(),
			csl: this._selectedChatScriptLocalizationId,
			csos: this._selectedChatScriptOrderStyle
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.l) || !(state.fcr) || !(state.pr) || !(state.csl) || !(state.csos)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			var lair = tswlairmgr.core.data.getLairById(state.l);
			if(lair)
			{
				this.setSelectedLair(lair);
			}
			
			this._fragmentCounts.setPersistentState(state.fcr);
			this.observables.fragmentCountsChanged.notify({});
			
			this._participants.setPersistentState(state.pr);
			
			this.observables.participantsChanged.notify({});
			
			if($.inArray(state.csl, tswlairmgr.core.data.getAllLocalizationIds()) !== -1)
			{
				this.setSelectedChatScriptLocalizationId(state.csl);
			}
			
			if(tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum.orderExists(state.csos))
			{
				this.setSelectedChatScriptOrderStyle(state.csos);
			}
			
			return true;
		}
		return false;
	};
};