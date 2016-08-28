var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.model = function organizerModel() {
	this._persistentStateVersion = 2;
	this._selectedLair = tswlairmgr.core.data.getSortedRegions()[0].getSortedZones()[0].getSortedLairs()[0];
	this._fragmentRegistry = tswlairmgr.core.fragmentregistry;
	this._participants = new tswlairmgr.modules.organizer.classes.ParticipantRegistry();
	this._assigningStrategy = new tswlairmgr.modules.organizer.classes.LairFragmentAssigningStrategy(this._fragmentRegistry.getLairFragmentCountsRegistry(), this._participants, this._selectedLair);
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
	this._fragmentRegistry.getLairFragmentCountsRegistry().observables.countChanged.registerCallback(function(origin, context) {
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
		return this._fragmentRegistry.getLairFragmentCountsRegistry().getCountForFragment(fragmentInstance);
	};
	
	this.setCountForFragment = function(fragmentInstance, newCount) {
		this._fragmentRegistry.getLairFragmentCountsRegistry().setCountForFragment(fragmentInstance, newCount);
	};
	
	this.incrementCountForFragment = function(fragmentInstance) {
		this._fragmentRegistry.getLairFragmentCountsRegistry().incrementCountForFragment(fragmentInstance);
	};
	
	this.decrementCountForFragment = function(fragmentInstance) {
		this._fragmentRegistry.getLairFragmentCountsRegistry().decrementCountForFragment(fragmentInstance);
	};
	
	this.getWillHaveCountForFragment = function(fragmentInstance) {
		return this._assigningStrategy.getWillHaveCountForFragment(fragmentInstance);
	};
	
	this.isLowOnFragment = function(fragmentInstance) {
		var fragments = fragmentInstance.getSet().getFragments();
		var lowestCount = null;
		
		var self = this;
		$.each(fragments, function(orientationCode, fragment) {
			var count = self._fragmentRegistry.getLairFragmentCountsRegistry().getCountForFragment(fragment);
			
			if(lowestCount === null || count < lowestCount)
			{
				lowestCount = count;
			}
		});
		
		if(this._fragmentRegistry.getLairFragmentCountsRegistry().getCountForFragment(fragmentInstance) <= lowestCount)
		{
			return true;
		}
		return false;
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
			pr: this._participants.getPersistentState(),
			csl: this._selectedChatScriptLocalizationId,
			csos: this._selectedChatScriptOrderStyle
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.l) || !(state.pr) || !(state.csl) || !(state.csos)) { return false; }
		var processed = false;
		
		if(state.v <= this._persistentStateVersion && state.v >= 1)
		{
			var lair = tswlairmgr.core.data.getLairById(state.l);
			if(lair)
			{
				this.setSelectedLair(lair);
			}
			
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
			
			processed = true;
		}
		if(state.v === 1)
		{
			if(tswlairmgr.modules.inventory)
			{
				tswlairmgr.core.fragmentregistry.getLairFragmentCountsRegistry().setPersistentState(state.fcr);
			}
		}
		
		if(processed) return true;
		return false;
	};
};