var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.components = tswlairmgr.core.components || {};

tswlairmgr.core.components.ItemHTMLModel = function ItemHTMLModel(dataInstance) {
	this._dataInstance = dataInstance;
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._dataInstance.observables.changed.registerCallback(function(origin, context) {
		console.log("<tswlairmgr.core.components.ItemHTMLModel>: got notified that data changed.");
		self.observables.changed.notify(context);
	});
	
	this.getName = function() {
		if(this.isLairFragment() || this.isRegionalFragment())
		{
			return this._dataInstance.getName();
		}
		if(this.isLairBoss() || this.isRegionalBoss())
		{
			return this._dataInstance.getSummonItemName();
		}
		
		// Should never reach here
		return "error";
	};
	
	this.getLabel = function() {
		if(this.isLairFragment() || this.isRegionalFragment())
		{
			return this._dataInstance.getCode();
		}
		if(this.isLairBoss() || this.isRegionalBoss())
		{
			return "";
		}
		
		// Should never reach here
		return "error";
	};
	
	this.isLairFragment = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.BossFragment);
	};
	
	this.isRegionalFragment = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.RegionalBossFragment);
	};
	
	this.isLairBoss = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.Boss);
	};
	
	this.isRegionalBoss = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.RegionalBoss);
	};
	
	this.getItemCssClasses = function() {
		if(this.isLairFragment()) { return [tswlairmgr.core.data.rarities.rare.code, "lairfragment"]; }
		if(this.isLairBoss()) { return [tswlairmgr.core.data.rarities.rare.code, "lairboss"]; }
		if(this.isRegionalFragment()) { return [tswlairmgr.core.data.rarities.epic.code, "regionalfragment"]; }
		if(this.isRegionalBoss()) { return [tswlairmgr.core.data.rarities.epic.code, "regionalboss"]; }
		
		// Should never reach here
		return "error";
	};
	
	this.getIconCssClasses = function() {
		if(this.isLairFragment()
			|| this.isLairBoss()
			|| this.isRegionalFragment()
			|| this.isRegionalBoss()
		)
		{
			if(this.isLairFragment() || this.isRegionalFragment())
			{
				return [
					this._dataInstance.getBossId(),
					this._dataInstance.getOrientationCode()
				];
			}
			if(this.isLairBoss() || this.isRegionalBoss())
			{
				return [
					this._dataInstance.getId()
				];
			}
		}
		
		// Should never reach here
		return "error";
	};
};