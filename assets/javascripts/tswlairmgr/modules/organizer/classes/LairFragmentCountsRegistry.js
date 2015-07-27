var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.LairFragmentCountsRegistry = function LairFragmentCountsRegistry() {
	this._persistentStateVersion = 1;
	this._registry = {};
	
	this.getCountForFragment = function(fragmentInstance) {
		var fBoss = fragmentInstance.getSet().getBoss();
		var fLair = fBoss.getLair();
		var fZone = fLair.getZone();
		var fRegion = fZone.getRegion();
		
		if(!(fRegion.getId() in this._registry))
		{
			return 0;
		}
		
		if(!(fZone.getId() in this._registry[fRegion.getId()]))
		{
			return 0;
		}
		
		if(!(fLair.getId() in this._registry[fRegion.getId()][fZone.getId()]))
		{
			return 0;
		}
		
		if(!(fBoss.getId() in this._registry[fRegion.getId()][fZone.getId()][fLair.getId()]))
		{
			return 0;
		}
		
		if(!(fragmentInstance.getOrientationCode() in this._registry[fRegion.getId()][fZone.getId()][fLair.getId()][fBoss.getId()]))
		{
			return 0;
		}
		
		return this._registry[fRegion.getId()][fZone.getId()][fLair.getId()][fBoss.getId()][fragmentInstance.getOrientationCode()];
	};
	
	this.setCountForFragment = function(fragmentInstance, newCount) {
		var fBoss = fragmentInstance.getSet().getBoss();
		var fLair = fBoss.getLair();
		var fZone = fLair.getZone();
		var fRegion = fZone.getRegion();
		
		if(!(fRegion.getId() in this._registry))
		{
			this._registry[fRegion.getId()] = {};
		}
		
		if(!(fZone.getId() in this._registry[fRegion.getId()]))
		{
			this._registry[fRegion.getId()][fZone.getId()] = {};
		}
		
		if(!(fLair.getId() in this._registry[fRegion.getId()][fZone.getId()]))
		{
			this._registry[fRegion.getId()][fZone.getId()][fLair.getId()] = {};
		}
		
		if(!(fBoss.getId() in this._registry[fRegion.getId()][fZone.getId()][fLair.getId()]))
		{
			this._registry[fRegion.getId()][fZone.getId()][fLair.getId()][fBoss.getId()] = {};
		}
		
		this._registry[fRegion.getId()][fZone.getId()][fLair.getId()][fBoss.getId()][fragmentInstance.getOrientationCode()] = newCount;
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
				$.each(regionHash, function(zoneKey, zoneHash){
					$.each(zoneHash, function(lairKey, lairHash){
						$.each(lairHash, function(bossKey, bossHash){
							$.each(bossHash, function(fragmentOrientationKey, count){
								if(!$.isNumeric(count)) { valid = false; }
							});
						});
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