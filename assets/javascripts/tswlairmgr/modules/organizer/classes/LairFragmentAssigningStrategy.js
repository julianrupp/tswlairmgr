var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.LairFragmentAssigningStrategy = function LairFragmentAssigningStrategy(lairFragmentCountsRegistry, participantRegistry) {
	this._persistentStateVersion = 1;
	this._fragmentCounts = lairFragmentCountsRegistry;
	this._participants = participantRegistry;
	this._selectedLair = null;
	this._assignments = [];
	
	this.observables = {
		fragmentAssignmentChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getWillHaveCountForFragment = function(fragmentInstance) {
		return this._fragmentCounts.getCountForFragment(fragmentInstance) + 0; // TODO
	};
	
	this.getAssignedFragmentForParticipantAndMission = function(participantInstance, bossInstance) {
		// TODO
	};
	
	this.getNumberOfSummonsForBoss = function(bossInstance) {
		// TODO
	};
	
	this.getNumberOfMissingFragmentsForNextSummonForBoss = function(bossInstance) {
		// TODO
	};
	
	this._recalculate = function() {
		// TODO
	};
	
	this.setLair = function(lairInstance) {
		this._selectedLair = lairInstance;
		this._recalculate();
	};
	
	var self = this;
	this._fragmentCountsChangedCallback = function(origin, context) {
		self._recalculate();
	};
	
	this._participantsChangedCallback = function(origin, context) {
		self._recalculate();
	};
	
	this._fragmentCounts.observables.countChanged.registerCallback(this._fragmentCountsChangedCallback);
	var self = this;
	$.each(["participantAdded", "participantRemoved", "participantMissionAvailabilityChanged"], function(index, observableName) {
		self._participants.observables[observableName].registerCallback(self._participantsChangedCallback);
	});
	
	this._recalculate();
};