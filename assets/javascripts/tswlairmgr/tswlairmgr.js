var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	console.log("<tswlairmgr>: init: starting...");
	$("#javascriptDisabledNotice").hide();
	
	// Set initial data localization
	console.log("<tswlairmgr>: init: setting initial data localization...");
	tswlairmgr.core.data._init();
	
	// Set initial interface language
	// TODO
	
	console.log("<tswlairmgr>: loading modules...");
	tswlairmgr.modules._loadRegisteredModules();
	
	// Init language selector (hand topbar sub-block node)
	// TODO
	
	console.log("<tswlairmgr>: init: complete.");
	$("#webapp").show();
});