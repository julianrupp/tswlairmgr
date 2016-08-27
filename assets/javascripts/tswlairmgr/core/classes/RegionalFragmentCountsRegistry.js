var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.classes = tswlairmgr.core.classes || {};

tswlairmgr.core.classes.RegionalFragmentCountsRegistry = function RegionalFragmentCountsRegistry() {
	this._persistentStateVersion = 1;
	this._registry = {};
	
	this.observables = {
		countChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getCountForFragment = function(fragmentInstance) {
		var fBoss = fragmentInstance.getSet().getBoss();
		var fRegion = fBoss.getRegion();
		
		if(!(fRegion.getId() in this._registry))
		{
			return 0;
		}
		
		if(!(fBoss.getId() in this._registry[fRegion.getId()]))
		{
			return 0;
		}
		
		if(!(fragmentInstance.getOrientationCode() in this._registry[fRegion.getId()][fBoss.getId()]))
		{
			return 0;
		}
		return this._registry[fRegion.getId()][fBoss.getId()][fragmentInstance.getOrientationCode()];
	};
	
	this.setCountForFragment = function(fragmentInstance, newCount) {
		var fBoss = fragmentInstance.getSet().getBoss();
		var fRegion = fBoss.getRegion();
		
		if(!(fRegion.getId() in this._registry))
		{
			this._registry[fRegion.getId()] = {};
		}
		
		if(!(fBoss.getId() in this._registry[fRegion.getId()]))
		{
			this._registry[fRegion.getId()][fBoss.getId()] = {};
		}
		
		var notificationNewValue = null;
		if(newCount > 0)
		{
			this._registry[fRegion.getId()][fBoss.getId()][fragmentInstance.getOrientationCode()] = newCount;
			notificationNewValue = newCount;
		}
		else
		{
			delete this._registry[fRegion.getId()][fBoss.getId()][fragmentInstance.getOrientationCode()];
			notificationNewValue = 0;
		}
		
		if(notificationNewValue !== null)
		{
			this.observables.countChanged.notify({
				fragment: fragmentInstance,
				newCount: notificationNewValue
			});
		}
	};
	
	this.incrementCountForFragment = function(fragmentInstance) {
		var previous = this.getCountForFragment(fragmentInstance);
		this.setCountForFragment(fragmentInstance, previous + 1);
	};
	
	this.decrementCountForFragment = function(fragmentInstance) {
		var previous = this.getCountForFragment(fragmentInstance);
		this.setCountForFragment(fragmentInstance, previous - 1);
	};
	
	this.getPersistentState = function()
	{
		return {
			v: this._persistentStateVersion,
			r: this._registry
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.r)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			var valid = true;
			$.each(state.r, function(regionKey, regionHash){
				$.each(regionHash, function(bossKey, bossHash){
					$.each(bossHash, function(fragmentOrientationKey, count){
						if(!$.isNumeric(count)) { valid = false; }
					});
				});
			});
			if(!valid) { return false; }
			this._registry = state.r;
			return true;
		}
		return false;
	};
};