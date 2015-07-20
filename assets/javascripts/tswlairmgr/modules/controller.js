var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules._log = tswlairmgr.core.helpers.makePrefixedLogger("tswlairmgr.modules");

tswlairmgr.modules._registeredModules = [];
tswlairmgr.modules._loadedModules = {};

tswlairmgr.modules.registerModule = function(module) {
	var log = tswlairmgr.modules._log;
	log("registerModule: registering <"+module.name+">...");
	tswlairmgr.modules._registeredModules.push(module);
};

tswlairmgr.modules._loadRegisteredModules = function (){
	var log = tswlairmgr.modules._log;
	log("DOM ready, loading registered modules...");
	$.each(tswlairmgr.modules._registeredModules, function(index, module){
		tswlairmgr.modules._loadModule(module);
	});
};

tswlairmgr.modules._loadModule = function(module)
{
	var log = tswlairmgr.modules._log;
	log("loadModule: loading <"+module.name+">...");
	
	var moduleContainerId = "#module-"+module.name;
	var moduleTabId = "#tab-"+module.name;
	
	var tabNode = null;
	var contentNode = $("<div />")
		.attr("id", moduleContainerId)
		.hide();
	
	$("#moduleContainer").append(contentNode);
	
	// Create module tab with click action
	// Insert into tab bar
	
	tswlairmgr.modules._loadedModules[module.name] = {
		instance: module,
		nodes: {
			content: contentNode,
			tab: tabNode
		}
	};
	module.init(contentNode);
	
	contentNode.show(); /* TEMP */
	
	log("loadModule: finished loading <"+module.name+">");
};

tswlairmgr.modules.getModule = function(name) {
	return tswlairmgr.modules._loadedModules[name].instance;
};