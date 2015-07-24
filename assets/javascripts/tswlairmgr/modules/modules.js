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
			console.log("<tswlairmgr.modules>: registerModule: error: <"+module.id+"> already registered!");
			found = true;
		}
	});
	if(found) { return false; }
	
	console.log("<tswlairmgr.modules>: registerModule: registering <"+module.id+">...");
	
	if(this._registeredModules.length < 1)
	{
		this._defaultModuleId = module.id;
	}
	
	this._registeredModules.push(module);
};

tswlairmgr.modules._loadRegisteredModules = function ()
{
	console.log("<tswlairmgr.modules>: loadRegisteredModules: DOM ready, loading registered modules...");
	
	var self = this;
	$.each(this._registeredModules, function(index, module){
		self._loadModule(module);
	});
	
	this._redrawTabs();
	
	console.log("<tswlairmgr.modules>: loadRegisteredModules: Setting default module active...");
	this.setActiveModuleById(
		this.getDefaultModuleId()
	);
};

tswlairmgr.modules._loadModule = function(module)
{
	console.log("<tswlairmgr.modules>: loadModule: loading <"+module.id+">...");
	
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
			console.log("<tswlairmgr.modules>: tab <"+module.id+"> clicked");
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
	
	console.log("<tswlairmgr.modules>: loadModule: finished loading <"+module.id+">");
};

tswlairmgr.modules.getModule = function(id)
{
	if(!(id in this._loadedModules))
	{
		console.log("<tswlairmgr.modules>: getModule: error: <"+id+"> not found!");
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

tswlairmgr.modules.setActiveModuleById = function(id)
{
	if(!(id in this._loadedModules))
	{
		console.log("<tswlairmgr.modules>: setActiveModuleById: error: <"+id+"> not found!");
		return false;
	}
	
	console.log("<tswlairmgr.modules>: setActiveModuleById: <"+id+">...");
	
	var previous = this.getActiveModuleId();
	
	$.each(this._loadedModules, function(id, compound) {
		var module = compound.instance;
		
		if(id == previous)
		{
			$(compound.nodes.tab).removeClass("active");
			$(compound.nodes.content).hide();
			
			module.becameInactive();
		}
		else
		{
			module.becameActive();
		}
	});
	$(this._loadedModules[id].nodes.tab).addClass("active");
	$(this._loadedModules[id].nodes.content).show();
	
	this._activeModule = id;
};

tswlairmgr.modules._initLocalizationMenu = function()
{
	var menuNode = $("#localizationMenu" ,$("#topbar"));
	
	var self = this;
	this.observables.interfaceLocalizationChanged.registerCallback(function(origin, context) {
		self._redrawLocalizationMenu();
	});
	
	this._redrawLocalizationMenu();
};

tswlairmgr.modules._redrawLocalizationMenu = function()
{
	var menu = $("#localizationMenu" ,$("#topbar"));
	
	$(menu).empty();
	
	var self = this;
	$.each(this.getAllLocalizationIds(), function(index, id) {
		var meta = self.getAllLocalizationsMeta()[id];
		var isActive = (self.getLocalizationId() === id) ? true : false;
		
		var button = $(
			'<div class="localizationContainer">' +
			'	<div class="localizationImage" />' +
			'</div>'
		)
		.click(function() {
			console.log("<tswlairmgr.modules>: localization <"+id+"> clicked");
			
			self.setInterfaceAndDataLocalizationById(id);
		});
		
		if(isActive)
		{
			$(button).addClass("active");
		}
		
		$(".localizationImage", button)
			.addClass(id)
			.attr("title", meta.localName)
			.attr("alt", meta.localName);
		
		$(menu).append(button);
	});
};

tswlairmgr.modules._redrawTabs = function()
{
	console.log("<tswlairmgr.modules>: redrawTabs called");
	
	var self = this;
	$(".tab", $("#moduleTabs", $("#topbar"))).each(function(index) {
		var tab = this;
		var moduleId = $(tab).data("moduleId");
		
		$(".tabContent", tab).text(
			self.getModule(moduleId).getDisplayName()
		);
	});
};