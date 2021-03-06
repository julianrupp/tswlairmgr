var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.observables = tswlairmgr.modules.observables || {};
tswlairmgr.modules.observables.interfaceLocalizationChanged = new tswlairmgr.core.helpers.Observable(null);

tswlairmgr.modules._sortedModuleLocalizationIds = [
	"enUS"
];
tswlairmgr.modules._allModuleLocalizationsMeta = {
	"enUS": {
		localName: "English",
		globalName: "English",
		id: "enUS"
	}
};
tswlairmgr.modules._defaultLocalizationId = tswlairmgr.modules._sortedModuleLocalizationIds[0];
tswlairmgr.modules._currentLocalizationId = null;

tswlairmgr.modules.getLocalizationId = function()
{
	return this._currentLocalizationId;
};

tswlairmgr.modules.getAllLocalizationIds = function()
{
	return this._sortedModuleLocalizationIds;
};

tswlairmgr.modules.getAllLocalizationsMeta = function()
{
	return this._allModuleLocalizationsMeta;
};

tswlairmgr.modules.getDefaultLocalizationId = function()
{
	return this._defaultLocalizationId;
};

tswlairmgr.modules.setInterfaceAndDataLocalizationById = function(id)
{
	if(!(id in this._allModuleLocalizationsMeta))
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [interface] setInterfaceAndDataLocalizationById: error: <"+id+"> not found!");
		return false;
	}
	
	this._currentLocalizationId = id;
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [interface] setInterfaceAndDataLocalizationById: setting interface localization to <"+id+">");
	
	this.setLocalizationById(id);
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [interface] setInterfaceAndDataLocalizationById: setting data localization to <"+id+">");
	
	tswlairmgr.core.data.setLocalizationById(id);
	
	this._redrawTabs();
	
	tswlairmgr.core.persistentstate.updateActiveLocalizationId(id);
	
	return true;
};

tswlairmgr.modules.setLocalizationById = function(id)
{
	if(!(id in this._allModuleLocalizationsMeta))
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [interface] setLocalizationById: error: <"+id+"> not found!");
		return false;
	}
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [interface] setLocalizationById: setting localization to <"+id+">");
	
	var previous = this.getLocalizationId();
	
	var previousInterfaceAndDataLocalizationSetting = this._currentLocalizationId;
	this._currentLocalizationId = id;
	
	this.observables.interfaceLocalizationChanged.notify(
		{
			previousLocalizationId: previous
		}
	);
	
	this._redrawTabs();
	
	this._currentLocalizationId = previousInterfaceAndDataLocalizationSetting;
	
	return true;
};

tswlairmgr.modules._initLocalization = function()
{
	var self = this;
	$.each(tswlairmgr.core.data.getAllLocalizationIds(), function(index, id){
		var meta = tswlairmgr.core.data.getAllLocalizationsMeta()[id];
		self._addExternalLocalization(meta.localName, meta.globalName, id);
	});
	
	this.setInterfaceAndDataLocalizationById(this.getDefaultLocalizationId());
};

tswlairmgr.modules._addExternalLocalization = function(localName, globalName, id)
{
	if($.inArray(id, this._sortedModuleLocalizationIds) === -1)
	{
		this._sortedModuleLocalizationIds.push(id);
		this._allModuleLocalizationsMeta[id] = {
			localName: localName,
			globalName: globalName,
			id: id
		};
	}
};

tswlairmgr.modules.ModuleLocalization = function ModuleLocalization() {
	this._localizations = {};
	this._sortedLocalizations = [];
	this._defaultLocalizationId = null;
	this._currentLocalizationId = null;
	
	this.observables = {
		moduleLocalizationChanged: new tswlairmgr.core.helpers.Observable(null)
	};
	
	var self = this;
	tswlairmgr.modules.observables.interfaceLocalizationChanged.registerCallback(function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] callback for interfaceLocalizationChanged called");
		
		var newLocalizationId = tswlairmgr.modules.getLocalizationId();
		
		if($.inArray(newLocalizationId, self._sortedLocalizations) !== -1)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] module has localization for <"+newLocalizationId+">.");
			
			self.setLocalizationById(newLocalizationId);
		}
		else
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] warning: module does not have a localization for <"+newLocalizationId+">!");
			
			var defaultInterfaceLocalizationId = tswlairmgr.modules.getDefaultLocalizationId();
			if($.inArray(defaultInterfaceLocalizationId, self._sortedLocalizations) !== -1)
			{
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] module has a localization for default interface localization <"+defaultInterfaceLocalizationId+">.");
				
				self.setLocalizationById(defaultInterfaceLocalizationId);
			}
			else
			{
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] warning: module does not have a localization for default interface localization <"+defaultInterfaceLocalizationId+">!");
				
				var defaultModuleLocalizationId = self.getDefaultLocalizationId();
				self.setLocalizationById(defaultModuleLocalizationId);
			}
		}
	});
	
	this.addLocalizationData = function(localName, globalName, id, data) {
		if(id in this._localizations)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] addLocalizationData: error: <"+id+"> already registered!");
			return(false);
		}
		
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] addLocalizationData: adding <"+id+">");
		
		if(this._sortedLocalizations.length < 1)
		{
			this._defaultLocalizationId = id;
		}
		
		this._localizations[id] = {
			localName: localName,
			globalName: globalName,
			id: id,
			data: data
		};
		
		this._sortedLocalizations.push(id);
		
		tswlairmgr.modules._addExternalLocalization(localName, globalName, id);
	};
	
	this.getLocalizationId = function() {
		return this._currentLocalizationId;
	};

	this.getDefaultLocalizationId = function() {
		return this._defaultLocalizationId;
	};
	
	this.getLocalizationData = function() {
		return this._localizations[this.getLocalizationId()].data;
	};
	
	this.getAllLocalizationIds = function()
	{
		return this._sortedLocalizations;
	};
	
	this.setLocalizationById = function(id) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] setLocalizationById: starting");

		if(!(id in this._localizations))
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] setLocalizationById: error: <"+id+"> not found!");
			return false;
		}

		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] setLocalizationById: to <"+id+">");

		var localization = this._localizations[id];
		
		this._currentLocalizationId = id;
		
		if(!this._suppressNotifications)
		{
			this.observables.moduleLocalizationChanged.notify(
				{
					previousLocalizationId: this.getDefaultLocalizationId()
				}
			);
		}

		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] setLocalizationById: completed");

		return true;
	};
	
	this.executeWithDifferentLocalization = function(id, callback)
	{
		this._suppressNotifications = true;

		var previous = this.getLocalizationId();

		this.setLocalizationById(id);
		callback.call();

		this.setLocalizationById(previous);

		this._suppressNotifications = false;
	};

	this.init = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules-localization>: [module] init: loading default localization...");
		this.setLocalizationById(this.getDefaultLocalizationId());
	};
};