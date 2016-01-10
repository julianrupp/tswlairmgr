var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] starting...");
	$("#javascriptDisabledNotice").hide();
	
	if(!tswlairmgr.core.helpers.IngameBrowserDetector.isIngameBrowser())
	{
		$("#ingameBrowserNotice").hide();
	}
	
	var hash = window.location.hash;
	
	// Set initial data localization
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] setting initial data localization...");
	tswlairmgr.core.data._initLocalization();
	
	// Set initial interface localization
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] setting initial interface localization...");
	tswlairmgr.modules._initLocalization();
	
	// Load modules
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] loading modules...");
	tswlairmgr.modules._initModuleController();
	
	// Init language selector
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] initializing localization menu...");
	tswlairmgr.modules._initLocalizationMenu();
	
	// Initialize persistent state controller
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] initializing persistent state manager...");
	tswlairmgr.core.persistentstate._initWithHash(hash);
	
	$(".versionString", $("#bottombar")).text(tswlairmgr.core.info.version);
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] complete.");
	$("#webapp").show();
	
	// Mobile browsers: Hide menu
	setTimeout(function(){
		window.scrollTo(0, 1);
	}, 0);
});