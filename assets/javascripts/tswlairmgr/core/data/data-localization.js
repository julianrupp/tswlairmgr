var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.data = tswlairmgr.core.data || {};

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
		tswlairmgr.core.data._defaultLocalizationId = id;
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

tswlairmgr.core.data.setLocalizationById = function(id)
{
	console.log("<tswlairmgr.core.data-localization>: setLocalizationById: starting");
	
	if(!(id in this._localizations))
	{
		console.log("<tswlairmgr.core.data-localization>: setLocalizationById: error: <"+id+"> not found!");
		return(false);
	}
	
	console.log("<tswlairmgr.core.data-localization>: setLocalizationById: to <"+id+">");
	
	var localization = this._localizations[id];
	
	$.each(this._struct.alphabets, function(alphabetId, currentAlphabet) {
		$.each(currentAlphabet, function(characterId, currentCharacter) {
			var t = localization.data.alphabets[alphabetId][characterId];
			if(!t) {
				console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
					"alphabets["+alphabetId+"]["+characterId+"]");
				t = "[Missing Translation]";
			}
			currentCharacter._setName(t);
		});
	});
	
	$.each(this._struct.regions, function(regionId, currentRegion) {
		var t = localization.data.regions[regionId].name;
		if(!t) {
			console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"regions["+regionId+"].name");
			t = "[Missing Translation]";
		}
		currentRegion.region._setName(t);
		
		var tr = localization.data.regions[regionId].regionalName;
		if(!tr) {
			console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
				"regions["+regionId+"].regionalName");
			tr = "[Missing Translation]";
		}
		currentRegion.regional._setName(tr);
		
		$.each(currentRegion.zones, function(zoneId, currentZone) {
			var t = localization.data.regions[regionId].zones[zoneId].name;
			if(!t) {
				console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
					"regions["+regionId+"].zones["+zoneId+"].name");
				t = "[Missing Translation]";
			}
			currentZone.zone._setName(t);
			
			$.each(currentZone.lairs, function(lairIndex, currentLair) {
				var t = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].name;
				if(!t) {
					console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
						"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].name");
					t = "[Missing Translation]";
				}
				currentLair.lair._setName(t);
				
				$.each(currentLair.bosses, function(bossIndex, currentBoss) {
					var t = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].bosses[bossIndex].name;
					if(!t) {
						console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
							"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].bosses["+bossIndex+"].name");
						t = "[Missing Translation]";
					}
					currentBoss.boss._setName(t);
					
					var tm = localization.data.regions[regionId].zones[zoneId].lairs[lairIndex].bosses[bossIndex].missionName;
					if(!tm) {
						console.log("<tswlairmgr.core.data-localization>: setLocalizationById: warning: Missing Translation: " +
							"localization.data.regions["+regionId+"].zones["+zoneId+"].lairs["+lairIndex+"].bosses["+bossIndex+"].missionName");
						tm = "[Missing Translation]";
					}
					currentBoss.boss._setMissionName(tm);
				});
			});
		});
	});
	
	this._currentLocalizationId = id;
	
	console.log("<tswlairmgr.core.data-localization>: setLocalizationById: completed");
	
	return(true);
};

tswlairmgr.core.data._localizationChangeObservers = [];

tswlairmgr.core.data.registerLocalizationChangeObserver = function(callback) {
	if($.inArray(callback, this._localizationChangeObservers))
	{
		console.log("<tswlairmgr.core.data-localization>: registerLocalizationChangeObserver: warning: callback already registered!");
	}
	
	console.log("<tswlairmgr.core.data-localization>: registerLocalizationChangeObserver: registering callback...");
	
	this._localizationChangeObservers.push(callback);
};

tswlairmgr.core.data.notifyLocalizationChangeObservers = function() {
	console.log("<tswlairmgr.core.data-localization>: notifyLocalizationChangeObservers: notifying...");
	
	$.each(this._localizationChangeObservers, function(index, callback) {
		callback.call();
	});
};

tswlairmgr.core.data.getDefaultLocalizationId = function()
{
	return tswlairmgr.core.data._defaultLocalizationId;
};

tswlairmgr.core.data._init = function()
{
	console.log("<tswlairmgr.core.data-localization>: init: loading default localization...");
	
	tswlairmgr.core.data.setLocalizationById(this.getDefaultLocalizationId());
};

tswlairmgr.core.data._bootstrap();