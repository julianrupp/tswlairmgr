var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules._log = tswlairmgr.core.helpers.makePrefixedLogger("tswlairmgr.modules");

tswlairmgr.modules._registeredModules = [];
tswlairmgr.modules._loadedModules = {};
tswlairmgr.modules._defaultModuleId = null;
tswlairmgr.modules._activeModule = null;

tswlairmgr.modules.registerModule = function(module) {
	var log = this._log;
	var found = false;
	$.each(this._registeredModules, function(index, currentModule) {
		if(module.id == currentModule.id)
		{
			log("registerModule: error: <"+module.id+"> already registered!");
			found = true;
		}
	});
	if(found) { return false; }
	
	log("registerModule: registering <"+module.id+">...");
	
	if(this._registeredModules.length < 1)
	{
		this._defaultModuleId = module.id;
	}
	
	this._registeredModules.push(module);
};

tswlairmgr.modules._loadRegisteredModules = function (){
	var log = this._log;
	log("loadRegisteredModules: DOM ready, loading registered modules...");
	
	var self = this;
	$.each(this._registeredModules, function(index, module){
		self._loadModule(module);
	});
	
	log("loadRegisteredModules: Setting default module active...");
	this.setActiveModuleById(
		this.getDefaultModuleId()
	);
};

tswlairmgr.modules._loadModule = function(module)
{
	var log = this._log;
	log("loadModule: loading <"+module.id+">...");
	
	var moduleContainerId = "#module-"+module.id;
	var moduleTabId = "#tab-"+module.id;
	
	var tabNode = null;
	var contentNode = $("<div />")
		.attr("id", moduleContainerId)
		.hide();
	$("#moduleContainer").append(contentNode);
	
	var self = this;
	var tabNode = $(
		'<div class="tab clickable">' +
		'	<div class="tabContent">' +
		'		'+module.displayName+''+
		'	</div>' +
		'</div>'
		)
		.attr("id", moduleTabId)
		.click(function(){
			if(self.getActiveModuleId() != module.id)
			{
				self.setActiveModuleById(module.id);
			}
		});
	$("#tabs").append(tabNode);
	
	this._loadedModules[module.id] = {
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
	var log = this._log;
	if(!(id in this._loadedModules))
	{
		log("getModule: error: <"+id+"> not found!");
		return false;
	}
	return this._loadedModules[id].instance;
};

tswlairmgr.modules.getDefaultModuleId = function() {
	return this._defaultModuleId;
};

tswlairmgr.modules.getActiveModuleId = function() {
	return this._activeModule;
};

tswlairmgr.modules.setActiveModuleById = function(id) {
	var log = this._log;
	if(!(id in this._loadedModules))
	{
		log("setActiveModuleById: error: <"+id+"> not found!");
		return false;
	}
	log("setActiveModuleById: <"+id+">...");
	
	$.each(this._loadedModules, function(id, compound) {
		$(compound.nodes.tab).removeClass("active");
		$(compound.nodes.content).hide();
	});
	$(this._loadedModules[id].nodes.tab).addClass("active");
	$(this._loadedModules[id].nodes.content).show();
	
	this._activeModule = id;
};