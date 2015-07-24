var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.components = tswlairmgr.core.components || {};

tswlairmgr.core.components.FragmentHTMLModel = function FragmentHTMLModel(fragmentInstance) {
	this._fragment = fragmentInstance;
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._fragment.observables.nameChanged.registerCallback(function(origin, context) {
		console.log("<tswlairmgr.core.components.FragmentHTMLModel>: got notified that fragment's name changed.");
		self.observables.nameChanged.notify(context);
	});
	
	this.getFragmentName = function() {
		return this._fragment.getName();
	};
	
	this.isLairFragment = function() {
		return (this._fragment instanceof tswlairmgr.core.data.BossFragment);
	};
	
	this.isRegionalFragment = function() {
		return (this._fragment instanceof tswlairmgr.core.data.RegionalBossFragment);
	};
	
	this.getFragmentTypeCode = function() {
		if(this.isLairFragment()) { return "lairfragment"; }
		if(this.isRegionalFragment()) { return "regionalfragment"; }
		
		// Should never reach here
		return "error";
	};
	
	this.getFragmentRarityCode = function() {
		if(this.isLairFragment()) { return tswlairmgr.core.data.rarities.rare.code; }
		if(this.isRegionalFragment()) { return tswlairmgr.core.data.rarities.epic.code; }
		
		// Should never reach here
		return "#ff00ff";
	};
	
	this.getBossId = function() {
		return this._fragment.getBossId();
	};
	
	this.getFragmentSetOrientationCode = function() {
		return this._fragment.getOrientationCode();
	};
};