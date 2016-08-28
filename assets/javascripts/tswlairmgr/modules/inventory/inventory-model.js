var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.model = function inventoryModel() {
	this._persistentStateVersion = 1;
	this._fragmentRegistry = tswlairmgr.core.fragmentregistry;
	this._notes = "";
	
	this.observables = {
		fragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		notesChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._fragmentRegistry.observables.fragmentCountsChanged.registerCallback(function(origin, context) {
		self.observables.fragmentCountsChanged.notify(context);
	});
	this._fragmentRegistry.observables.regionalFragmentCountsChanged.registerCallback(function(origin, context) {
		self.observables.regionalFragmentCountsChanged.notify(context);
	});
	
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
	
	this.isLowOnRegionalFragment = function(fragmentInstance) {
		var fragments = fragmentInstance.getSet().getFragments();
		var lowestCount = null;
		
		var self = this;
		$.each(fragments, function(orientationCode, fragment) {
			var count = self._fragmentRegistry.getRegionalFragmentCountsRegistry().getCountForFragment(fragment);
			
			if(lowestCount === null || count < lowestCount)
			{
				lowestCount = count;
			}
		});
		
		if(this._fragmentRegistry.getRegionalFragmentCountsRegistry().getCountForFragment(fragmentInstance) <= lowestCount)
		{
			return true;
		}
		return false;
	};
	
	this.getNumberOfSummonsForLairBoss = function(bossInstance) {
		var orientationCodeOrder = [
			"nw", "n", "ne",
			"w", "c", "e",
			"sw", "s", "se"
		];
		
		var fragments = bossInstance.getFragmentSet().getFragments();
		var counts = [];
		var lowest = null;
		var self = this;
		$.each(orientationCodeOrder, function(index, orientationCode) {
			var fragment = fragments[orientationCode];
			var fragmentCount = self._fragmentRegistry.getLairFragmentCountsRegistry().getCountForFragment(fragment);
			counts[index] = fragmentCount;
			if(lowest === null || fragmentCount < lowest)
			{
				lowest = fragmentCount;
			}
		});
		
		return lowest;
	};
	
	this.getNumberOfMissingFragmentsForNextSummonForLairBoss = function(bossInstance) {
		var self = this;
		var numberOfSummons = self.getNumberOfSummonsForLairBoss(bossInstance);
		
		var orientationCodeOrder = [
			"nw", "n", "ne",
			"w", "c", "e",
			"sw", "s", "se"
		];
		
		var fragments = bossInstance.getFragmentSet().getFragments();
		var missing = 0;
		$.each(orientationCodeOrder, function(index, orientationCode) {
			var fragment = fragments[orientationCode];
			var fragmentCount = self._fragmentRegistry.getLairFragmentCountsRegistry().getCountForFragment(fragment);
			if(numberOfSummons - fragmentCount == 0)
			{
				missing++;
			}
		});
		
		return missing;
	};
	
	this.getNumberOfSummonsForRegionalBoss = function(bossInstance) {
		var orientationCodeOrder = [
			"nnww", "nnw", "nne", "nnee",
			"nww", "nw", "ne", "nee",
			"sww", "sw", "se", "see",
			"ssww", "ssw", "sse", "ssee"
		];
		
		var fragments = bossInstance.getFragmentSet().getFragments();
		var counts = [];
		var lowest = null;
		var self = this;
		$.each(orientationCodeOrder, function(index, orientationCode) {
			var fragment = fragments[orientationCode];
			var fragmentCount = self._fragmentRegistry.getRegionalFragmentCountsRegistry().getCountForFragment(fragment);
			counts[index] = fragmentCount;
			if(lowest === null || fragmentCount < lowest)
			{
				lowest = fragmentCount;
			}
		});
		
		return lowest;
	};
	
	this.getNumberOfMissingFragmentsForNextSummonForRegionalBoss = function(bossInstance) {
		var self = this;
		var numberOfSummons = self.getNumberOfSummonsForRegionalBoss(bossInstance);
		
		var orientationCodeOrder = [
			"nnww", "nnw", "nne", "nnee",
			"nww", "nw", "ne", "nee",
			"sww", "sw", "se", "see",
			"ssww", "ssw", "sse", "ssee"
		];
		
		var fragments = bossInstance.getFragmentSet().getFragments();
		var missing = 0;
		$.each(orientationCodeOrder, function(index, orientationCode) {
			var fragment = fragments[orientationCode];
			var fragmentCount = self._fragmentRegistry.getRegionalFragmentCountsRegistry().getCountForFragment(fragment);
			if(numberOfSummons - fragmentCount == 0)
			{
				missing++;
			}
		});
		
		return missing;
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
	
	this.getCountForRegionalFragment = function(fragmentInstance) {
		return this._fragmentRegistry.getRegionalFragmentCountsRegistry().getCountForFragment(fragmentInstance);
	};
	
	this.setCountForRegionalFragment = function(fragmentInstance, newCount) {
		this._fragmentRegistry.getRegionalFragmentCountsRegistry().setCountForFragment(fragmentInstance, newCount);
	};
	
	this.incrementCountForRegionalFragment = function(fragmentInstance) {
		this._fragmentRegistry.getRegionalFragmentCountsRegistry().incrementCountForFragment(fragmentInstance);
	};
	
	this.decrementCountForRegionalFragment = function(fragmentInstance) {
		this._fragmentRegistry.getRegionalFragmentCountsRegistry().decrementCountForFragment(fragmentInstance);
	};
	
	this.getNotes = function() {
		return this._notes;
	};
	
	this.setNotes = function(notes) {
		this._notes = notes;
		this.observables.notesChanged.notify({
			notes: notes
		});
	};
	
	this.getPersistentState = function() {
		return {
			v: this._persistentStateVersion,
			n: this._notes
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.n)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			this.setNotes(state.n);
			
			return true;
		}
		return false;
	};
};