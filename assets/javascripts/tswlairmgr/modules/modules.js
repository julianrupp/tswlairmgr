var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules._log = tswlairmgr.core.helpers.makePrefixedLogger("tswlairmgr.modules");

tswlairmgr.modules._registeredModules = [];
tswlairmgr.modules._loadedModules = {};
tswlairmgr.modules._activeModule = null;

tswlairmgr.modules.registerModule = function(module) {
	var log = tswlairmgr.modules._log;
	var found = false;
	$.each(tswlairmgr.modules._registeredModules, function(index, currentModule) {
		if(module.id == currentModule.id)
		{
			log("registerModule: error: <"+module.id+"> already registered!");
			found = true;
		}
	});
	if(found) { return false; }
	log("registerModule: registering <"+module.id+">...");
	
	tswlairmgr.modules._registeredModules.push(module);
};

tswlairmgr.modules._loadRegisteredModules = function (){
	var log = tswlairmgr.modules._log;
	log("DOM ready, loading registered modules...");
	
	$.each(tswlairmgr.modules._registeredModules, function(index, module){
		tswlairmgr.modules._loadModule(module);
	});
	
	log("Setting first registered module active...");
	tswlairmgr.modules.setActiveModuleById(
		tswlairmgr.modules._registeredModules[0].id
	);
};

tswlairmgr.modules._loadModule = function(module)
{
	var log = tswlairmgr.modules._log;
	log("loadModule: loading <"+module.id+">...");
	
	var moduleContainerId = "#module-"+module.id;
	var moduleTabId = "#tab-"+module.id;
	
	var tabNode = null;
	var contentNode = $("<div />")
		.attr("id", moduleContainerId)
		.hide();
	$("#moduleContainer").append(contentNode);
	
	var tabNode = $(
		'<div class="tab clickable">' +
		'	<div class="tabContent">' +
		'		'+module.displayName+''+
		'	</div>' +
		'</div>'
		)
		.attr("id", moduleTabId)
		.click(function(){
			tswlairmgr.modules.setActiveModuleById(module.id);
		});
	$("#tabs").append(tabNode);
	
	tswlairmgr.modules._loadedModules[module.id] = {
		instance: module,
		nodes: {
			content: contentNode,
			tab: tabNode
		}
	};
	module.init(contentNode);
	
	log("loadModule: finished loading <"+module.id+">");
};

tswlairmgr.modules.getModule = function(id) {
	var log = tswlairmgr.modules._log;
	if(!(id in tswlairmgr.modules._loadedModules))
	{
		log("getModule: error: <"+id+"> not found!");
		return false;
	}
	return tswlairmgr.modules._loadedModules[id].instance;
};

tswlairmgr.modules.getActiveModuleId = function(id) {
	return this._activeModule;
};

tswlairmgr.modules.setActiveModuleById = function(id) {
	var log = tswlairmgr.modules._log;
	if(!(id in tswlairmgr.modules._loadedModules))
	{
		log("changeActiveModuleTo: error: <"+id+"> not found!");
		return false;
	}
	log("changeActiveModuleTo: <"+id+">...");
	
	$.each(tswlairmgr.modules._loadedModules, function(id, compound) {
		$(compound.nodes.tab).removeClass("active");
		$(compound.nodes.content).hide();
	});
	$(tswlairmgr.modules._loadedModules[id].nodes.tab).addClass("active");
	$(tswlairmgr.modules._loadedModules[id].nodes.content).show();
	
	this._activeModule = id;
};