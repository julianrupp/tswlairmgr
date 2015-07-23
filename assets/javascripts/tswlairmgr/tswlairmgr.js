var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	console.log("<tswlairmgr>: init: starting...");
	$("#javascriptDisabledNotice").hide();
	
	// Set initial data localization
	console.log("<tswlairmgr>: init: setting initial data localization...");
	tswlairmgr.core.data._init();
	
	// Set initial interface localization
	console.log("<tswlairmgr>: init: setting initial interface localization...");
	tswlairmgr.modules._initLocalization();
	
	// Load modules
	console.log("<tswlairmgr>: init: loading modules...");
	tswlairmgr.modules._loadRegisteredModules();
	
	// Init language selector
	console.log("<tswlairmgr>: init: initializing localization menu...");
	tswlairmgr.modules._initLocalizationMenu();
	
	console.log("<tswlairmgr>: init: complete.");
	$("#webapp").show();
});