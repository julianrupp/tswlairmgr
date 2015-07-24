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
		return this._dataInstance.getItemName();
	};
	
	this.getLabel = function() {
		return this._dataInstance.getItemLabel();
	};
	
	this.isLairFragment = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.BossFragment);
	};
	
	this.isRegionalFragment = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.RegionalBossFragment);
	};
	
	this.isFragment = function() {
		return (this.isLairFragment() || this.isRegionalFragment());
	};
	
	this.isLairBoss = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.Boss);
	};
	
	this.isRegionalBoss = function() {
		return (this._dataInstance instanceof tswlairmgr.core.data.RegionalBoss);
	};
	
	this.isBoss = function() {
		return (this.isLairBoss() || this.isRegionalBoss());
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
		if(this.isFragment() || this.isBoss())
		{
			if(this.isFragment())
			{
				return [
					this._dataInstance.getBossId(),
					this._dataInstance.getOrientationCode()
				];
			}
			if(this.isBoss())
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