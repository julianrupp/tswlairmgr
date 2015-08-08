var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.data = tswlairmgr.core.data || {};

tswlairmgr.core.data._localizations = {};
tswlairmgr.core.data._sortedLocalizations = [];
tswlairmgr.core.data._defaultLocalizationId = null;
tswlairmgr.core.data._currentLocalizationId = null;

tswlairmgr.core.data._suppressNotifications = false;

tswlairmgr.core.data.observables = {
	dataLocalizationChanged: new tswlairmgr.core.helpers.Observable(null)
};

tswlairmgr.core.data.addLocalizationData = function(localName, globalName, id, data)
{
	if(id in this._localizations)
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: addLocalizationData: error: <"+id+"> already registered!");
		return(false);
	}
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: addLocalizationData: adding <"+id+">");
	
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
};

tswlairmgr.core.data.getLocalizationId = function()
{
	return this._currentLocalizationId;
};

tswlairmgr.core.data.getAllLocalizationIds = function()
{
	return this._sortedLocalizations;
};

tswlairmgr.core.data.getAllLocalizationsMeta = function()
{
	var meta = {};
	$.each(this._localizations, function(key, compound) {
		meta[key] = {
			localName: compound.localName,
			globalName: compound.globalName,
			id: compound.id
		};
	});
	return meta;
};

tswlairmgr.core.data.getDefaultLocalizationId = function()
{
	return this._defaultLocalizationId;
};

tswlairmgr.core.data.setLocalizationById = function(newId)
{
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: starting");
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: trying <"+newId+">");
	
	var previous = this.getLocalizationId();
	
	var id = null;
	
	if(newId in this._localizations)
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.data-localization>: data has localization for <"+newId+">.");
		
		id = newId;
	}
	else
	{
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.data-localization>: warning: data does not have a localization for <"+newId+">!");
		
		var defaultInterfaceLocalizationId = tswlairmgr.modules.getDefaultLocalizationId();
		if(defaultInterfaceLocalizationId in this._localizations)
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.data-localization>: data has a localization for default interface localization <"+defaultInterfaceLocalizationId+">.");
			
			id = defaultInterfaceLocalizationId;
		}
		else
		{
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.data-localization>: warning: data does not have a localization for default interface localization <"+defaultInterfaceLocalizationId+">!");
			
			var defaultDataLocalizationId = this.getDefaultLocalizationId();
			self.setLocalizationById(defaultDataLocalizationId);
		}
	}
	
	var localization = this._localizations[id];
	
	$.each(this._getStruct().alphabets, function(alphabetId, currentAlphabet) {
		$.each(currentAlphabet, function(characterId, currentCharacter) {
			var t = localization.data.alphabets[alphabetId][characterId];
			if(!t) {
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
					"alphabets["+alphabetId+"]["+characterId+"]");
				t = "[Missing Translation]";
			}
			currentCharacter.setName(t);
		});
	});
	
	$.each(this._getStruct().itemNamePatterns, function(patternKey, currentPattern) {
		var t = localization.data.itemNamePatterns[patternKey];
		if(!t) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"itemNamePatterns["+patternKey+"]");
			t = "[Missing Translation]";
		}
		currentPattern.setPattern(t);
	});
	
	$.each(this._getStruct().regions, function(regionId, currentRegion) {
		var t = localization.data.regions[regionId].name;
		if(!t) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"regions["+regionId+"].name");
			t = "[Missing Translation]";
		}
		currentRegion.region.setName(t);
		
		var tr = localization.data.regions[regionId].regionalName;
		if(!tr) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"regions["+regionId+"].regionalName");
			tr = "[Missing Translation]";
		}
		currentRegion.regional.setName(tr);
		
		$.each(currentRegion.zones, function(zoneId, currentZone) {
			var t = localization.data.regions[regionId].zones[zoneId].name;
			if(!t) {
				if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
					"regions["+regionId+"].zones["+zoneId+"].name");
				t = "[Missing Translation]";
			}
			currentZone.zone.setName(t);
			
			$.each(currentZone.lairs, function(lairIndex, currentLair) {
				var t = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].name;
				if(!t) {
					if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
						"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].name");
					t = "[Missing Translation]";
				}
				currentLair.lair.setName(t);
				
				$.each(currentLair.bosses, function(bossIndex, currentBoss) {
					var t = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].bosses[bossIndex].name;
					if(!t) {
						if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
							"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].bosses["+bossIndex+"].name");
						t = "[Missing Translation]";
					}
					currentBoss.boss.setName(t);
					
					var tm = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].bosses[bossIndex].missionName;
					if(!tm) {
						if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
							"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].bosses["+bossIndex+"].missionName");
						tm = "[Missing Translation]";
					}
					currentBoss.boss.setMissionName(tm);
				});
			});
		});
	});
	
	this._currentLocalizationId = id;
	
	if(!this._suppressNotifications)
	{
		this.observables.dataLocalizationChanged.notify(
			{
				previousLocalizationId: previous
			}
		);
	}
	
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: setLocalizationById: completed");
	
	return true;
};

tswlairmgr.core.data.executeWithDifferentLocalization = function(id, callback)
{
	this._suppressNotifications = true;
	
	var previous = this.getLocalizationId();
	
	this.setLocalizationById(id);
	callback.call();
	
	this.setLocalizationById(previous);
	
	this._suppressNotifications = false;
};

tswlairmgr.core.data._initLocalization = function()
{
	if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.data-localization>: initLocalization: loading default localization...");
	
	this.setLocalizationById(this.getDefaultLocalizationId());
};