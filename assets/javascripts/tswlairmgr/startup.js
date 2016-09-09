var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] starting...");
	$("#javascriptDisabledNotice").hide();
	
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
	tswlairmgr.core.persistentstate._initWithCookie();
	
	// Version string in footer
	$(".versionString", $("#bottombar")).text(tswlairmgr.core.info.version);
	
	// Ingame browser notice
	$("#ingameBrowserNotice .button.dismiss").click(function() {
		$("#ingameBrowserNotice").hide();
	});
	$("#ingameBrowserNotice .button.dismissPermanent").click(function() {
		$("#ingameBrowserNotice").hide();
		tswlairmgr.core.persistentstate.setCookie("ingameBrowserNotice", { "hide": true } );
	});
	var cookieIBNSettings = tswlairmgr.core.persistentstate.getCookie("ingameBrowserNotice") || {};
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] ingameBrowserNotice: cookie settings = ");
	if(tswlairmgr.core.config.debug) console.log(cookieIBNSettings);
	if(
		!tswlairmgr.core.helpers.IngameBrowserDetector.isIngameBrowser()
		|| ("hide" in cookieIBNSettings && cookieIBNSettings["hide"] == true)
	)
	{
		$("#ingameBrowserNotice").hide();
	}
	
	// Finalize
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] complete.");
	$("#webapp").show();
	
	// Mobile browsers: Hide menu
	setTimeout(function(){
		window.scrollTo(0, 1);
	}, 0);
});