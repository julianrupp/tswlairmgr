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

tswlairmgr.modules.setLocalizationById = function(id)
{
	if(!(id in this._allModuleLocalizationsMeta))
	{
		console.log("<tswlairmgr.modules-localization>: [interface] setLocalizationById: error: <"+id+"> not found!");
		return false;
	}
	
	console.log("<tswlairmgr.modules-localization>: [interface] setLocalizationById: setting interface localization to <"+id+">");
	
	var previous = this.getLocalizationId();
	
	this._currentLocalizationId = id;
	
	this.observables.interfaceLocalizationChanged.notify(
		{
			previousLocalizationId: previous
		}
	);
	
	this._redrawTabs();
	
	return true;
};

tswlairmgr.modules._initLocalization = function()
{
	this.setLocalizationById(this.getDefaultLocalizationId());
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
		console.log("<tswlairmgr.modules-localization>: callback for interfaceLocalizationChanged called");
		
		var newLocalizationId = tswlairmgr.modules.getLocalizationId();
		
		if($.inArray(newLocalizationId, self._sortedLocalizations) !== -1)
		{
			console.log("<tswlairmgr.modules-localization>: module has localization for <"+newLocalizationId+">.");
			
			self.setLocalizationById(newLocalizationId);
		}
		else
		{
			console.log("<tswlairmgr.modules-localization>: warning: module does not have a localization for <"+newLocalizationId+">!");
			
			var defaultInterfaceLocalizationId = tswlairmgr.modules.getDefaultLocalizationId();
			if($.inArray(defaultInterfaceLocalizationId, self._sortedLocalizations) !== -1)
			{
				console.log("<tswlairmgr.modules-localization>: module has a localization for default interface localization <"+newLocalizationId+">.");
				
				self.setLocalizationById(defaultInterfaceLocalizationId);
			}
			else
			{
				console.log("<tswlairmgr.modules-localization>: warning: module does not have a localization for default interface localization <"+newLocalizationId+">!");
				
				var defaultModuleLocalizationId = self.getDefaultLocalizationId();
				self.setLocalizationById(defaultModuleLocalizationId);
			}
		}
	});
	
	this.addLocalizationData = function(localName, globalName, id, data) {
		if(id in this._localizations)
		{
			console.log("<tswlairmgr.modules-localization>: addLocalizationData: error: <"+id+"> already registered!");
			return(false);
		}
		
		console.log("<tswlairmgr.modules-localization>: addLocalizationData: adding <"+id+">");
		
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
		
		if($.inArray(id, tswlairmgr.modules._sortedModuleLocalizationIds) === -1)
		{
			tswlairmgr.modules._sortedModuleLocalizationIds.push(id);
			tswlairmgr.modules._allModuleLocalizationsMeta[id] = {
				localName: localName,
				globalName: globalName,
				id: id
			};
		}
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
	
	this.setLocalizationById = function(id) {
		console.log("<tswlairmgr.modules-localization>: setLocalizationById: starting");

		if(!(id in this._localizations))
		{
			console.log("<tswlairmgr.modules-localization>: setLocalizationById: error: <"+id+"> not found!");
			return false;
		}

		console.log("<tswlairmgr.modules-localization>: setLocalizationById: to <"+id+">");

		var localization = this._localizations[id];
		
		this._currentLocalizationId = id;

		this.observables.moduleLocalizationChanged.notify(
			{
				previousLocalizationId: this.getDefaultLocalizationId()
			}
		);

		console.log("<tswlairmgr.modules-localization>: setLocalizationById: completed");

		return true;
	};

	this.init = function() {
		console.log("<tswlairmgr.module-localization>: init: loading default localization...");

		this.setLocalizationById(this.getDefaultLocalizationId());
	};
};