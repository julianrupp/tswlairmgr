var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.helpers = tswlairmgr.core.helpers || {};

tswlairmgr.core.helpers.Observable = function Observable(origin) {
	this._origin = origin;
	this._observers = [];
	
	this.registerCallback = function(callback) {
		this._observers.push(callback);
	};
	
	this.notify = function(context) {
		var self = this;
		$.each(this._observers, function(index, callback) {
			callback.call(self.origin, context);
		});
	};
};