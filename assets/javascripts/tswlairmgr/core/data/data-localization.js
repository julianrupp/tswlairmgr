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
		console.log("<tswlairmgr.core.data-localization>: addLocalizationData: error: <"+id+"> already registered!");
		return(false);
	}
	
	console.log("<tswlairmgr.core.data-localization>: addLocalizationData: adding <"+id+">");
	
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

tswlairmgr.core.data.getDefaultLocalizationId = function()
{
	return this._defaultLocalizationId;
};

tswlairmgr.core.data.setLocalizationById = function(id)
{
	console.log("<tswlairmgr.core.data-localization>: setLocalizationById: starting");
	
	if(!(id in this._localizations))
	{
		console.log("<tswlairmgr.core.data-localization>: setLocalizationById: error: <"+id+"> not found!");
		return false;
	}
	
	console.log("<tswlairmgr.core.data-localization>: setLocalizationById: to <"+id+">");
	
	var previous = this.getLocalizationId();
	
	var localization = this._localizations[id];
	
	$.each(this._struct.alphabets, function(alphabetId, currentAlphabet) {
		$.each(currentAlphabet, function(characterId, currentCharacter) {
			var t = localization.data.alphabets[alphabetId][characterId];
			if(!t) {
				console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
					"alphabets["+alphabetId+"]["+characterId+"]");
				t = "[Missing Translation]";
			}
			currentCharacter.setName(t);
		});
	});
	
	$.each(this._struct.regions, function(regionId, currentRegion) {
		var t = localization.data.regions[regionId].name;
		if(!t) {
			console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"regions["+regionId+"].name");
			t = "[Missing Translation]";
		}
		currentRegion.region.setName(t);
		
		var tr = localization.data.regions[regionId].regionalName;
		if(!tr) {
			console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"regions["+regionId+"].regionalName");
			tr = "[Missing Translation]";
		}
		currentRegion.regional.setName(tr);
		
		$.each(currentRegion.zones, function(zoneId, currentZone) {
			var t = localization.data.regions[regionId].zones[zoneId].name;
			if(!t) {
				console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
					"regions["+regionId+"].zones["+zoneId+"].name");
				t = "[Missing Translation]";
			}
			currentZone.zone.setName(t);
			
			$.each(currentZone.lairs, function(lairIndex, currentLair) {
				var t = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].name;
				if(!t) {
					console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
						"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].name");
					t = "[Missing Translation]";
				}
				currentLair.lair.setName(t);
				
				$.each(currentLair.bosses, function(bossIndex, currentBoss) {
					var t = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].bosses[bossIndex].name;
					if(!t) {
						console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
							"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].bosses["+bossIndex+"].name");
						t = "[Missing Translation]";
					}
					currentBoss.boss.setName(t);
					
					var tm = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].bosses[bossIndex].missionName;
					if(!tm) {
						console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
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
	
	console.log("<tswlairmgr.core.data-localization>: setLocalizationById: completed");
	
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

tswlairmgr.core.data._init = function()
{
	console.log("<tswlairmgr.core.data-localization>: init: loading default localization...");
	
	this.setLocalizationById(this.getDefaultLocalizationId());
};