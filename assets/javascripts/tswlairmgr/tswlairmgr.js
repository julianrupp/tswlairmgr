var tswlairmgr = tswlairmgr || {};

$(document).ready(function() {
	tswlairmgr._log = tswlairmgr.core.helpers.makePrefixedLogger("tswlairmgr");
	var log = tswlairmgr._log;
	
	log("init: starting");
	$("#javascriptDisabledNotice").hide();
	
	// Set initial data localization
	log("init: setting initial data localization");
	tswlairmgr.core.data.setLocalizationById("enUS");
	
	// Init modules (create node in #moduleContainer + hand node + register new topbar tab)
	// TODO
	
	// Init language selector (hand topbar sub-block node)
	// TODO
	
	// Set initial interface language
	// TODO
	
	log("init: complete.");
	$("#webapp").show();
	
	/*console.log("Char: " + tswlairmgr.core.data._struct.alphabets.greek.sigma);
	console.log(tswlairmgr.core.data._struct.alphabets.greek.sigma.getName());
	console.log(tswlairmgr.core.data._struct.regions["sol"].region.getName());
	console.log(tswlairmgr.core.data._struct.regions["tra"].regional.getName());
	console.log(tswlairmgr.core.data._struct.regions["tra"].regional.getFragmentSet().getNNWWFragment().getName());
	console.log(tswlairmgr.core.data._struct.regions["sol"].zones["km"].zone.getName());
	console.log("Zone: " + tswlairmgr.core.data._struct.regions["sol"].zones["km"].zone);
	console.log(tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].lair.getName());
	console.log("Lair: " + tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].lair);
	console.log(tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].bosses[0].boss.getName());
	console.log(tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].bosses[0].boss.getMissionName());
	console.log("Boss: " + tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].bosses[0].boss);
	console.log(tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].bosses[0].boss.getRegionalFragmentDrops());
	console.log(tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].bosses[0].boss.getFragmentSet().getNWFragment().getName());
	console.log("Frag: " + tswlairmgr.core.data._struct.regions["sol"].zones["km"].lairs[0].bosses[0].boss.getFragmentSet());*/
});