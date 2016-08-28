var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};

tswlairmgr.core.fragmentregistry = new function() {
	this.internalId = "fragmentregistry";
	this._persistentStateVersion = 1;
	
	this._fragmentCounts = new tswlairmgr.core.classes.LairFragmentCountsRegistry();
	this._regionalFragmentCounts = new tswlairmgr.core.classes.RegionalFragmentCountsRegistry();
	
	this.observables = {
		fragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this),
		regionalFragmentCountsChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._fragmentCounts.observables.countChanged.registerCallback(function(origin, context) {
		self.observables.fragmentCountsChanged.notify(context);
		tswlairmgr.core.persistentstate.updateInternalState(self, self.getPersistentState());
	});
	this._regionalFragmentCounts.observables.countChanged.registerCallback(function(origin, context) {
		self.observables.regionalFragmentCountsChanged.notify(context);
		tswlairmgr.core.persistentstate.updateInternalState(self, self.getPersistentState());
	});
	tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
		var internalState = tswlairmgr.core.persistentstate.getInternalState(self);
		if(internalState == undefined)
		{
			var organizerState = tswlairmgr.core.persistentstate.getModuleState(tswlairmgr.modules.organizer.controller);
			if(organizerState !== undefined)
			{
				if(organizerState.v === 1)
				{
					internalState = {
						v: 1,
						l: organizerState.fcr,
						r: {}
					};
				}
			}
		}
		self.setPersistentState(internalState);
	});
	
	this.getLairFragmentCountsRegistry = function() {
		return this._fragmentCounts;
	};
	
	this.getRegionalFragmentCountsRegistry = function() {
		return this._regionalFragmentCounts;
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
	
	this.getCountForRegionalFragment = function(fragmentInstance) {
		return this._regionalFragmentCounts.getCountForFragment(fragmentInstance);
	};
	
	this.setCountForRegionalFragment = function(fragmentInstance, newCount) {
		this._regionalFragmentCounts.setCountForFragment(fragmentInstance, newCount);
	};
	
	this.incrementCountForRegionalFragment = function(fragmentInstance) {
		this._regionalFragmentCounts.incrementCountForFragment(fragmentInstance);
	};
	
	this.decrementCountForRegionalFragment = function(fragmentInstance) {
		this._regionalFragmentCounts.decrementCountForFragment(fragmentInstance);
	};
	
	this.isLowOnRegionalFragment = function(fragmentInstance) {
		var fragments = fragmentInstance.getSet().getFragments();
		var lowestCount = null;
		
		var self = this;
		$.each(fragments, function(orientationCode, fragment) {
			var count = self._regionalFragmentCounts.getCountForFragment(fragment);
			
			if(lowestCount === null || count < lowestCount)
			{
				lowestCount = count;
			}
		});
		
		if(this._regionalFragmentCounts.getCountForFragment(fragmentInstance) <= lowestCount)
		{
			return true;
		}
		return false;
	};
	
	this.getPersistentState = function() {
		return {
			v: 1,
			l: this._fragmentCounts.getPersistentState(),
			r: this._regionalFragmentCounts.getPersistentState()
		};
	};
	
	this.setPersistentState = function(state) {
		if(state == undefined) return false;
		if(state.v === this._persistentStateVersion)
		{
			if(state.l)
			{
				this._fragmentCounts.setPersistentState(state.l);
			}
			if(state.r)
			{
				this._regionalFragmentCounts.setPersistentState(state.r);
			}
			return true;
		}
		return false;
	};
};