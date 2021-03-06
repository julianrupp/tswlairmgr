var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules._registeredModules = [];
tswlairmgr.modules._loadedModules = {};
tswlairmgr.modules._defaultModuleId = null;
tswlairmgr.modules._activeModule = null;

tswlairmgr.modules.registerModule = function(module)
{
	var found = false;
	$.each(this._registeredModules, function(index, currentModule) {
		if(module.id === currentModule.id)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: registerModule: error: <"+module.id+"> already registered!");
			found = true;
		}
	});
	if(found) { return false; }
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: registerModule: registering <"+module.id+">...");
	
	if(this._registeredModules.length < 1)
	{
		this._defaultModuleId = module.id;
	}
	
	this._registeredModules.push(module);
};

tswlairmgr.modules._initModuleController = function()
{
	this._loadRegisteredModules();
};

tswlairmgr.modules._loadRegisteredModules = function()
{
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: loadRegisteredModules: DOM ready, loading registered modules...");
	
	var self = this;
	$.each(this._registeredModules, function(index, module){
		self._loadModule(module);
	});
	
	this._redrawTabs();
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: loadRegisteredModules: Setting default module active...");
	this.setActiveModuleById(
		this.getDefaultModuleId()
	);
};

tswlairmgr.modules._loadModule = function(module)
{
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: loadModule: loading <"+module.id+">...");
	
	var moduleContainerId = "module-"+module.id;
	
	var contentNode = $("<div />")
		.attr("id", moduleContainerId)
		.data("moduleId", module.id)
		.hide();
	$("#moduleContainer").append(contentNode);
	
	var self = this;
	var tabNode = $(
		'<div class="tab clickable">' +
		'	<div class="tabContent">' +
		'		' +
		'	</div>' +
		'</div>'
		)
		.data("moduleId", module.id)
		.click(function(){
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: tab <"+module.id+"> clicked");
			if(self.getActiveModuleId() !== module.id)
			{
				self.setActiveModuleById(module.id);
			}
		});
	$("#moduleTabs", $("#topbar")).append(tabNode);
	
	this._loadedModules[module.id] = {
		instance: module,
		nodes: {
			content: contentNode,
			tab: tabNode
		}
	};
	
	module.initWithRootNode(contentNode);
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: loadModule: finished loading <"+module.id+">");
};

tswlairmgr.modules.getModule = function(id)
{
	if(!(id in this._loadedModules))
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: getModule: error: <"+id+"> not found!");
		return false;
	}
	return this._loadedModules[id].instance;
};

tswlairmgr.modules.getDefaultModuleId = function()
{
	return this._defaultModuleId;
};

tswlairmgr.modules.getActiveModuleId = function()
{
	return this._activeModule;
};

tswlairmgr.modules.isActiveModule = function(moduleInstance)
{
	return this.getModule(this.getActiveModuleId()) === moduleInstance;
};

tswlairmgr.modules.setActiveModuleById = function(id)
{
	if(!(id in this._loadedModules))
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: setActiveModuleById: error: <"+id+"> not found!");
		return false;
	}
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: setActiveModuleById: <"+id+">...");
	
	var previous = this.getActiveModuleId();
	
	$.each(this._loadedModules, function(id, compound) {
		var module = compound.instance;
		
		if(id == previous)
		{
			$(compound.nodes.tab).removeClass("active");
			$(compound.nodes.content).hide();
			
			module.becameInactive();
		}
	});
	
	$(this._loadedModules[id].nodes.tab).addClass("active");
	$(this._loadedModules[id].nodes.content).show();
	
	this._activeModule = id;
	
	tswlairmgr.core.persistentstate.updateActiveModuleId(id);
	
	this._loadedModules[id].instance.becameActive();
};

tswlairmgr.modules._initLocalizationMenu = function()
{
	var menuNode = $("#localizationMenu" ,$("#topbar"));
	
	var self = this;
	/*this.observables.interfaceAndDataLocalizationChanged.registerCallback(function(origin, context) {
		
	});*/
	
	this._redrawLocalizationMenu();
};

tswlairmgr.modules._redrawLocalizationMenu = function()
{
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: redrawLocalizationMenu called");
	
	var menu = $("#localizationMenu" ,$("#topbar"));
	
	$(menu).empty();
	
	var self = this;
	$.each(this.getAllLocalizationIds(), function(index, id) {
		var meta = self.getAllLocalizationsMeta()[id];
		var isActive = (self.getLocalizationId() === id) ? true : false;
		
		var button = $(
			'<div class="localizationContainer">' +
			'	<img class="localizationImage" />' +
			'</div>'
		)
		.click(function() {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: localization <"+id+"> clicked");
			
			self.setInterfaceAndDataLocalizationById(id);
			
			self._redrawLocalizationMenu();
		});
		
		if(isActive)
		{
			$(button).addClass("active");
		}
		
		$(".localizationImage", button)
			.attr("src", "assets/images/localization/"+id+".png")
			.attr("title", meta.localName)
			.attr("alt", meta.localName);
		
		$(menu).append(button);
	});
};

tswlairmgr.modules._redrawTabs = function()
{
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules>: redrawTabs called");
	
	var self = this;
	$(".tab", $("#moduleTabs", $("#topbar"))).each(function(index) {
		var tab = this;
		var moduleId = $(tab).data("moduleId");
		$(".tabContent", tab).text(
			self.getModule(moduleId).getDisplayName()
		);
	});
};