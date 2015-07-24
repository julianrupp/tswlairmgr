var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] starting...");
	$("#javascriptDisabledNotice").hide();
	
	// Set initial data localization
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] setting initial data localization...");
	tswlairmgr.core.data._init();
	
	// Set initial interface localization
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] setting initial interface localization...");
	tswlairmgr.modules._initLocalization();
	
	// Load modules
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] loading modules...");
	tswlairmgr.modules._loadRegisteredModules();
	
	// Init language selector
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] initializing localization menu...");
	tswlairmgr.modules._initLocalizationMenu();
	
	$(".versionString", $("#bottombar")).text(tswlairmgr.core.config.version);
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] complete.");
	$("#webapp").show();
});