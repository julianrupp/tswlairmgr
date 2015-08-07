var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};

tswlairmgr.modules.lookup.model = function lookupModel() {
	this._persistentStateVersion = 1;
	
	this._objectTypeCodes = {
		boss: "bl",
		regional_boss: "br",
		fragment: "fl",
		regional_fragment: "fr"
	};
	
	this._history = new tswlairmgr.modules.lookup.classes.ObjectHistory(50);
	
	this.observables = {
		selectedObjectChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getSelectedObject = function() {
		return this._history.getCurrentPoint();
	};
	
	this.setSelectedObject = function(object) {
		this._history.navigateTo(object);
		this.observables.selectedObjectChanged.notify({
			newObject: this.getSelectedObject()
		});
	};
	
	this.canGoBackInHistory = function() {
		return this._history.canGoBackInHistory();
	};
	
	this.goBackInHistory = function() {
		this._history.goBackInHistory();
		this.observables.selectedObjectChanged.notify({
			newObject: this.getSelectedObject()
		});
	};
	
	this.getSelectedObjectTypeCode = function() {
		var obj = this.getSelectedObject();
		if(obj instanceof tswlairmgr.core.data.Boss)
		{
			return this._objectTypeCodes.boss;
		}
		else if(obj instanceof tswlairmgr.core.data.RegionalBoss)
		{
			return this._objectTypeCodes.regional_boss;
		}
		else if(obj instanceof tswlairmgr.core.data.BossFragment)
		{
			return this._objectTypeCodes.fragment;
		}
		else if(obj instanceof tswlairmgr.core.data.RegionalBossFragment)
		{
			return this._objectTypeCodes.regional_fragment;
		}
		
		// Should never reach here
		return null;
	};
	
	this.getSelectedObjectNodeInfo = function() {
		var obj = this.getSelectedObject();
		
		if(obj instanceof tswlairmgr.core.data.Boss)
		{
			return {
				r: obj.getLair().getZone().getRegion().getId(),
				z: obj.getLair().getZone().getId(),
				l: obj.getLair().getId(),
				b: obj.getId()
			};
		}
		else if(obj instanceof tswlairmgr.core.data.RegionalBoss)
		{
			return {
				r: obj.getRegion().getId()
			};
		}
		else if(obj instanceof tswlairmgr.core.data.BossFragment)
		{
			return {
				r: obj.getSet().getBoss().getLair().getZone().getRegion().getId(),
				z: obj.getSet().getBoss().getLair().getZone().getId(),
				l: obj.getSet().getBoss().getLair().getId(),
				b: obj.getSet().getBoss().getId(),
				fo: obj.getOrientationCode()
			};
		}
		else if(obj instanceof tswlairmgr.core.data.RegionalBossFragment)
		{
			return {
				r: obj.getSet().getBoss().getRegion().getId(),
				rfo: obj.getOrientationCode()
			};
		}
		
		// Reaches here when persistent state is saved/loaded before any object was viewed
		return null;
	};
	
	this.getObjectByTypeCodeAndNodeInfo = function(typeCode, nodeInfo) {
		switch(typeCode)
		{
			case this._objectTypeCodes.boss:
				return tswlairmgr.core.data.getRegions()[nodeInfo.r]
					.getZones()[nodeInfo.z]
					.getLairs()[nodeInfo.l]
					.getBosses()[nodeInfo.b]
			break;
			case this._objectTypeCodes.regional_boss:
				return tswlairmgr.core.data.getRegions()[nodeInfo.r]
					.getRegional();
			break;
			case this._objectTypeCodes.fragment:
				return tswlairmgr.core.data.getRegions()[nodeInfo.r]
					.getZones()[nodeInfo.z]
					.getLairs()[nodeInfo.l]
					.getBosses()[nodeInfo.b]
					.getFragmentSet()
					.getFragments()[nodeInfo.fo];
			break;
			case this._objectTypeCodes.regional_fragment:
				return tswlairmgr.core.data.getRegions()[nodeInfo.r]
					.getRegional()
					.getFragmentSet()
					.getFragments()[nodeInfo.rfo];
			break;
			default:
				// Reaches here when persistent state is saved/loaded before any object was viewed
				return null;
			break;
		}
	};
	
	this.getPersistentState = function() {
		return {
			v: this._persistentStateVersion,
			otc: this.getSelectedObjectTypeCode(),
			oni: this.getSelectedObjectNodeInfo()
		};
	};
	
	this.setPersistentState = function(state)
	{
		if(!(state.v) || !(state.otc) || !(state.oni)) { return false; }
		if(state.v === this._persistentStateVersion)
		{
			var obj = this.getObjectByTypeCodeAndNodeInfo(state.otc, state.oni);
			if(obj)
			{
				this._history = new tswlairmgr.modules.lookup.classes.ObjectHistory(50);
				this.setSelectedObject(obj);
				
				return true;
			}
		}
		return false;
	};
};