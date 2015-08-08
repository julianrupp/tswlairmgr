var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.classes = tswlairmgr.modules.lookup.classes || {};

tswlairmgr.modules.lookup.classes.ObjectHistory = function ObjectHistory(size) {
	this._persistentStateVersion = 1;
	this._size = size;
	this._history = [];
	this._historyIndex = -1;
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.navigateTo = function(object) {
		if(this._history.length >= this._size)
		{
			this._history.shift();
		}
		this._history[++this._historyIndex] = object;
		this.observables.changed.notify({
			newObject: object
		});
		return true;
	};
	
	this.getCurrentPoint = function() {
		if(this._historyIndex >= 0)
		{
			return this._history[this._historyIndex];
		}
		return null;
	};
	
	this.canGoBackInHistory = function() {
		if(this._history.length > 1)
		{
			return true;
		}
		return false;
	};
	
	this.goBackInHistory = function() {
		if(this.canGoBackInHistory())
		{
			this._history.pop();
			--this._historyIndex;
			
			this.observables.changed.notify({
				newObject: this.getCurrentPoint()
			});
			return true;
		}
		return false;
	};
};