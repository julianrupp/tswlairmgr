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
	
	// Initialize persistent state manager
	// TODO: 
	
	// Load modules
	// TODO: add logic for persistent state
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] loading modules...");
	tswlairmgr.modules._loadRegisteredModules();
	
	// Init language selector
	// TODO: add logic for core persistent state
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] initializing localization menu...");
	tswlairmgr.modules._initLocalizationMenu();
	
	$(".versionString", $("#bottombar")).text(tswlairmgr.core.info.version);
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr>: [startup] complete.");
	$("#webapp").show();
	
	// TODO: testing helpers for core.persistentstate
		var loadOfData = "";
		var i;
		for(i=0; i<512; i++)
		{
			loadOfData += String.fromCharCode( Math.floor(Math.random() * 256) );
		}
		var encodedData = tswlairmgr.core.helpers.Base64URL.encode(loadOfData);
		var dataChecksum = tswlairmgr.core.helpers.CRC32.textChecksum(loadOfData);
		window.location.hash = "enUS:sample:"+encodedData+":"+dataChecksum;
});