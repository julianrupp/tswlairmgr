var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.data = tswlairmgr.core.data || {};

tswlairmgr.core.data.rarities = {
	common: {
		color: "#ffffff"
	},
	uncommon: {
		color: "#00ff16"
	},
	rare: {
		color: "#02b6ff"
	},
	epic: {
		color: "#d565f8"
	},
	heroic: {
		color: "#ffd001"
	}
};

tswlairmgr.core.data.AlphabetCharacter = function AlphabetCharacter() {
	this._name = undefined;
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		this.observables.nameChanged.notify(
			{
				previousName: previous
			}
		);
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.toString = function() {
		return "[AlphabetCharacter(name:<"+this._name+">)]";
	};
};

tswlairmgr.core.data.BossFragment = function BossFragment(character, number) {
	this._character = character;
	this._number = number;
	this._rarity = tswlairmgr.core.data.rarities.rare;
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._character.observables.nameChanged.registerCallback(function(origin, context) {
		self.observables.nameChanged.notify(context);
	});
	
	this._setBackreferenceToSet = function(ref) {
		this._backreferenceToSet = ref;
	};
	
	this.getSet = function() {
		return this._backreferenceToSet;
	};
	
	this._formattedNumberString = function() {
		var r = "" + this._number;
		while(r.length < 2)
		{
			r = "0" + r;
		}
		return r;
	};
	
	this.getName = function() {
		return this._character.getName() + " " + this._formattedNumberString();
	};
	
	this.getRarity = function() {
		return this._rarity;
	};
	
	this.toString = function() {
		return "[BossFragment(name:<"+this.getName()+">)]";
	};
};

tswlairmgr.core.data.BossFragmentSet = function BossFragmentSet(fragmentsHash) {
	this._fragments = {
		nw: undefined,
		n:  undefined,
		ne: undefined,
		w:  undefined,
		c:  undefined,
		e:  undefined,
		sw: undefined,
		s:  undefined,
		se: undefined
	};
	
	var frags = this._fragments;
	$.each(this._fragments, function(key, value) {
		frags[key] = fragmentsHash[key] || undefined;
		
		frags[key]._setBackreferenceToSet(this);
	});
	
	this._setBackreferenceToBoss = function(ref) {
		this._backreferenceToBoss = ref;
	};
	
	this.getBoss = function() {
		return this._backreferenceToBoss;
	};
	
	this.getFragments = function() {
		return this._fragments;
	};
	
	this.getNWFragment = function() { return this._fragments.nw; };
	this.getNFragment = function() { return this._fragments.n; };
	this.getNEFragment = function() { return this._fragments.ne; };
	
	this.getWFragment = function() { return this._fragments.w; };
	this.getCFragment = function() { return this._fragments.c; };
	this.getEFragment = function() { return this._fragments.e; };
	
	this.getSWFragment = function() { return this._fragments.sw; };
	this.getSFragment = function() { return this._fragments.s; };
	this.getSEFragment = function() { return this._fragments.se; };
	
	this.toString = function() {
		return "[BossFragmentSet(\n" +
			"\t" + this.getNWFragment() + ", " + this.getNFragment() + ", " + this.getNEFragment() + "\n" +
			"\t" + this.getWFragment() + ", " + this.getCFragment() + ", " + this.getEFragment() + "\n" +
			"\t" + this.getSWFragment() + ", " + this.getSFragment() + ", " + this.getSEFragment() + "\n" +
			")]";
	};
};

tswlairmgr.core.data.Boss = function Boss(id, fragmentSet) {
	this._id = id;
	this._fragmentSet = fragmentSet;
	this._regionalFragmentDrops = [];
	
	this._fragmentSet._setBackreferenceToBoss(this);
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this),
		missionNameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._setBackreferenceToLair = function(ref) {
		this._backreferenceToLair = ref;
	};
	
	this.getLair = function() {
		return this._backreferenceToLair;
	};
	
	this.getFragmentSet = function() {
		return this._fragmentSet;
	};
	
	this._addRegionalFragmentDrop = function(ref) {
		this._regionalFragmentDrops.push(ref);
	};
	
	this.getRegionalFragmentDrops = function() {
		return this._regionalFragmentDrops;
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		this.observables.nameChanged.notify(
			{
				previousName: previous
			}
		);
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.setMissionName = function(name) {
		var previous = this._missionName;
		
		this._missionName = name;
		
		this.observables.missionNameChanged.notify(
			{
				previousMissionName: previous
			}
		);
	};
	
	this.getMissionName = function() {
		return this._missionName;
	};
	
	this.toString = function() {
		return "[Boss(name:<"+this.getName()+">, missionName:<"+this.getMissionName()+">, id:<"+this._id+">)]";
	};
};

tswlairmgr.core.data.Lair = function Lair(id, bossesArray) {
	this._id = id;
	this._bosses = bossesArray;
	
	var bosses = this._bosses;
	$.each(this._bosses, function(key, value) {
		value._setBackreferenceToLair(this);
	});
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._setBackreferenceToZone = function(ref) {
		this._backreferenceToZone = ref;
	};
	
	this.getZone = function() {
		return this._backreferenceToZone;
	};
	
	this.getBosses = function() {
		return this._bosses;
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		this.observables.nameChanged.notify(
			{
				previousName: previous
			}
		);
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.toString = function() {
		return "[Lair(name:<"+this.getName()+">, id:<"+this._id+">)]";
	};
};

tswlairmgr.core.data.Zone = function Zone(lairsArray) {
	this._lairs = lairsArray;
	
	var lairs = this._lairs;
	$.each(this._lairs, function(key, value) {
		value._setBackreferenceToZone(this);
	});
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._setBackreferenceToRegion = function(ref) {
		this._backreferenceToRegion = ref;
	};
	
	this.getRegion = function() {
		return this._backreferenceToRegion;
	};
	
	this.getLairs = function() {
		return this._lairs;
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		this.observables.nameChanged.notify(
			{
				previousName: previous
			}
		);
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.toString = function() {
		return "[Zone(name:<"+this.getName()+">)]";
	};
};

tswlairmgr.core.data.RegionalBossFragment = function BossFragment(character, number, droppedFromArray) {
	this._character = character;
	this._number = number;
	this._droppedFrom = droppedFromArray;
	this._rarity = tswlairmgr.core.data.rarities.epic;
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._character.observables.nameChanged.registerCallback(function(origin, context) {
		self.observables.nameChanged.notify(context);
	});
	
	this._setBackreferenceToSet = function(ref) {
		this._backreferenceToSet = ref;
	};
	
	this._generateDropReferences = function() {
		var droppers = this.getDroppedFrom();
		$.each(droppers, function(key, value) {
			value._addRegionalFragmentDrop(this);
		});
	};
	
	this._setBackreferenceToSetAndGenerateDropReferences = function(ref) {
		this._setBackreferenceToSet(ref);
		this._generateDropReferences();
	};
	
	this.getSet = function() {
		return this._backreferenceToSet;
	};
	
	this._formattedNumberString = function() {
		var r = "" + this._number;
		while(r.length < 2)
		{
			r = "0" + r;
		}
		return r;
	};
	
	this.getName = function() {
		return this._character.getName() + " " + this._formattedNumberString();
	};
	
	this.getDroppedFrom = function() {
		return this._droppedFrom;
	};
	
	this.getRarity = function() {
		return this._rarity;
	};
	
	this.toString = function() {
		return "[RegionalBossFragment(name:<"+this.getName()+">)]";
	};
};

tswlairmgr.core.data.RegionalBossFragmentSet = function RegionalBossFragmentSet(fragmentsHash) {
	this._fragments = {
		nnww: undefined,
		nnw:  undefined,
		nne:  undefined,
		nnee: undefined,
		nww:  undefined,
		nw:   undefined,
		ne:   undefined,
		nee:  undefined,
		sww:  undefined,
		sw:   undefined,
		se:   undefined,
		see:  undefined,
		ssww: undefined,
		ssw:  undefined,
		sse:  undefined,
		ssee: undefined
	};
	
	var frags = this._fragments;
	$.each(this._fragments, function(key, value) {
		frags[key] = fragmentsHash[key] || undefined;
		
		frags[key]._setBackreferenceToSetAndGenerateDropReferences(this);
	});
	
	this._setBackreferenceToBoss = function(ref) {
		this._backreferenceToBoss = ref;
	};
	
	this.getBoss = function() {
		return this._backreferenceToBoss;
	};
	
	this.getFragments = function() {
		return this._fragments;
	};
	
	this.getNNWWFragment = function() { return this._fragments.nnww; };
	this.getNNWFragment = function() { return this._fragments.nnw; };
	this.getNNEFragment = function() { return this._fragments.nne; };
	this.getNNEEFragment = function() { return this._fragments.nnee; };
	
	this.getNWWFragment = function() { return this._fragments.nww; };
	this.getNWFragment = function() { return this._fragments.nw; };
	this.getNEFragment = function() { return this._fragments.ne; };
	this.getNEEFragment = function() { return this._fragments.nee; };
	
	this.getSWWFragment = function() { return this._fragments.sww; };
	this.getSWFragment = function() { return this._fragments.sw; };
	this.getSEFragment = function() { return this._fragments.se; };
	this.getSEEFragment = function() { return this._fragments.see; };
	
	this.getSSWWFragment = function() { return this._fragments.ssww; };
	this.getSSWFragment = function() { return this._fragments.ssw; };
	this.getSSEFragment = function() { return this._fragments.sse; };
	this.getSSEEFragment = function() { return this._fragments.ssee; };
	
	this.toString = function() {
		return "[RegionalBossFragmentSet(\n" +
			"\t" + this.getNNWWFragment() + ", " + this.getNNWFragment() + ", " + this.getNNEFragment() + ", " + this.getNNEEFragment() + "\n" +
			"\t" + this.getNWWFragment() + ", " + this.getNWFragment() + ", " + this.getNEFragment() + ", " + this.getNEEFragment() + "\n" +
			"\t" + this.getSWWFragment() + ", " + this.getSWFragment() + ", " + this.getSEFragment() + ", " + this.getSEEFragment() + "\n" +
			"\t" + this.getSSWWFragment() + ", " + this.getSSWFragment() + ", " + this.getSSEFragment() + ", " + this.getSSEEFragment() + "\n" +
			")]";
	};
};

tswlairmgr.core.data.RegionalBoss = function RegionalBoss(id, fragmentSet) {
	this._id = id;
	this._fragmentSet = fragmentSet;
	
	this._fragmentSet._setBackreferenceToBoss(this);
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._setBackreferenceToRegion = function(ref) {
		this._backreferenceToLair = ref;
	};
	
	this.getRegion = function() {
		return this._backreferenceToRegion;
	};
	
	this.getFragmentSet = function() {
		return this._fragmentSet;
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		this.observables.nameChanged.notify(
			{
				previousName: previous
			}
		);
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.toString = function() {
		return "[RegionalBoss(name:<"+this.getName()+">, id:<"+this._id+">)]";
	};
};

tswlairmgr.core.data.Region = function Region(zonesArray) {
	this._zones = zonesArray;
	
	$.each(this._zones, function(key, value) {
		value._setBackreferenceToRegion(this);
	});
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getZones = function() {
		return this._zones;
	};
	
	this.getNumberOfZones = function() {
		return this._zones.length;
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		this.observables.nameChanged.notify(
			{
				previousName: previous
			}
		);
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.toString = function() {
		return "[Region(name:<"+this.getName()+">)]";
	};
};