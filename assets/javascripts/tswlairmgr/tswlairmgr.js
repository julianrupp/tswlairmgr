var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	tswlairmgr._log = tswlairmgr.core.helpers.makePrefixedLogger("tswlairmgr");
	var log = tswlairmgr._log;
	
	log("init: starting");
	$("#javascriptDisabledNotice").hide();
	
	// Set initial data localization
	log("init: setting initial data localization");
	tswlairmgr.core.data._init();
	
	// Set initial interface language
	// TODO
	
	tswlairmgr.modules._loadRegisteredModules();
	
	// Init language selector (hand topbar sub-block node)
	// TODO
	
	log("init: complete.");
	$("#webapp").show();
});