var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.helpers = tswlairmgr.core.helpers || {};

/* TODO: Move */
tswlairmgr.core.config = {
	debug: true
};

tswlairmgr.core.helpers.makePrefixedLogger = function(prefix) {
	return function(str) {
		if(tswlairmgr.core.config.debug)
		{
			console.log("<" + prefix + ">: " + str);
		}
	};
};