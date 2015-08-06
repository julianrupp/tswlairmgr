var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.classes = tswlairmgr.modules.lookup.classes || {};

tswlairmgr.modules.lookup.classes.ObjectHistory = function ObjectHistory(size) {
	this._persistentStateVersion = 1;
	this._size = size;
	this._history = [];
	
	this.observables = {
		//missionAvailabilityChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.navigateTo = function(object) {
		// TODO
		return true;
	};
	
	this.getCurrentPoint = function() {
		// TODO
		return null;
	};
	
	this.canGoBackInHistory = function() {
		return false; // TODO
	};
	
	this.goBackInHistory = function() {
		if(this.canGoBackInHistory())
		{
			// TODO
			return true;
		}
		return false;
	};
};