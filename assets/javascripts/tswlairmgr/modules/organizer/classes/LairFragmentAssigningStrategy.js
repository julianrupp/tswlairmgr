var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.LairFragmentAssigningStrategy = function LairFragmentAssigningStrategy(lairFragmentCountsRegistry, participantRegistry, lairInstance) {
	this._persistentStateVersion = 1;
	this._fragmentCounts = lairFragmentCountsRegistry;
	this._participants = participantRegistry;
	this._selectedLair = null;
	this._assignments = [];
	
	this.observables = {
		fragmentAssignmentChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getWillHaveCountForFragment = function(fragmentInstance) {
		return this._fragmentCounts.getCountForFragment(fragmentInstance)
			+ this.getAssignedCountForFragment(fragmentInstance);
	};
	
	this.getAssignedCountForFragment = function(fragmentInstance) {
		var count = 0;
		$.each(this._assignments, function(index, assignmentCompound) {
			if(assignmentCompound.fragment === fragmentInstance)
			{
				count++;
			}
		});
		
		return count;
	};
	
	this.getAssignedFragmentForParticipantAndMission = function(participantInstance, bossInstance) {
		var found = false;
		var fragment = null;
		$.each(this._assignments, function(index, assignmentCompound) {
			if(assignmentCompound.participant === participantInstance
				&& assignmentCompound.boss === bossInstance)
			{
				found = true;
				fragment = assignmentCompound.fragment;
				return;
			}
		});
		
		if(!found) { return false; }
		
		return fragment;
	};
	
	this.getNumberOfSummonsForBoss = function(bossInstance) {
		var orientationCodeOrder = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];
		
		var fragments = bossInstance.getFragmentSet().getFragments();
		var counts = [];
		var lowest = null;
		$.each(orientationCodeOrder, function(index, orientationCode) {
			var fragment = fragments[orientationCode];
			var fragmentCount = self.getWillHaveCountForFragment(fragment);
			counts[index] = fragmentCount;
			if(lowest === null || fragmentCount < lowest)
			{
				lowest = fragmentCount;
			}
		});
		
		return lowest;
	};
	
	this.getNumberOfMissingFragmentsForNextSummonForBoss = function(bossInstance) {
		var numberOfSummons = this.getNumberOfSummonsForBoss(bossInstance);
		
		var orientationCodeOrder = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];
		
		var fragments = bossInstance.getFragmentSet().getFragments();
		var missing = 0;
		$.each(orientationCodeOrder, function(index, orientationCode) {
			var fragment = fragments[orientationCode];
			var fragmentCount = self.getWillHaveCountForFragment(fragment);
			if(numberOfSummons - fragmentCount == 0)
			{
				missing++;
			}
		});
		
		return missing;
	};
	
	this._recalculate = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.classes.LairFragmentAssigningStrategy>: recalculating.");
		this._assignments = [];
		
		var self = this;
		// Get fragment counts snapshot to work with
		var countsArray = [];
		$.each(this._selectedLair.getSortedBosses(), function(bossIndex, boss) {
			countsArray[bossIndex] = {};
			$.each(boss.getFragmentSet().getFragments(), function(fragmentOrientationCode, fragment) {
				countsArray[bossIndex][fragmentOrientationCode] = {
					fragment: fragment,
					count: self._fragmentCounts.getCountForFragment(fragment)
				};
			});
		});
		
		// Loop through bosses and participants, always assigning the first fragment with the currently lowest count
		$.each(this._selectedLair.getSortedBosses(), function(bossIndex, boss) {
			$.each(self._participants.getParticipants(), function(participantIndex, participant) {
				if(participant.canTurnInMissionForBoss(boss))
				{
					var assignedFragment = self._getFirstFragmentWithLowestCount(countsArray[bossIndex]);
					
					self._assignments.push({
						participant: participant,
						boss: boss,
						fragment: assignedFragment
					});
					
					countsArray = self._incrementInternalStateFragmentCount(countsArray, assignedFragment);
				}
			});
		});
		
		this.observables.fragmentAssignmentChanged.notify({});
	};
	
	this._getFirstFragmentWithLowestCount = function(bossCountsHash) {
		var orientationCodeOrder = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];
		
		// First pass: find lowest count
		var lowest = null;
		for(var i=0; i<orientationCodeOrder.length; i++)
		{
			var fragmentCount = bossCountsHash[orientationCodeOrder[i]].count;
			if(lowest === null || fragmentCount < lowest)
			{
				lowest = fragmentCount;
			}
		}
		
		// Second pass: find first fragment with lowest count
		var foundFragment = null;
		for(var i=0; i<orientationCodeOrder.length; i++)
		{
			var fragmentCount = bossCountsHash[orientationCodeOrder[i]].count;
			if(fragmentCount === lowest)
			{
				foundFragment = bossCountsHash[orientationCodeOrder[i]].fragment;
				break;
			}
		}
		
		return foundFragment;
	};
	
	this._incrementInternalStateFragmentCount = function(countsArray, fragment) {
		$.each(countsArray, function(bossIndex, bossCountsHash) {
			$.each(bossCountsHash, function(fragmentOrientationCode, fragmentCompound) {
				if(fragmentCompound.fragment === fragment)
				{
					fragmentCompound.count++;
				}
			});
		});
		
		return countsArray;
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
	
	this.setLair(lairInstance);
};