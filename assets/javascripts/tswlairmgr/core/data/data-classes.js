var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.data = tswlairmgr.core.data || {};

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

tswlairmgr.core.data.NamePattern = function NamePattern() {
	this._pattern = undefined;
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.setPattern = function(pattern) {
		var previous = this._pattern;
		
		this._pattern = pattern;
		
		this.observables.changed.notify(
			{
				previousPattern: previous
			}
		);
	};
	
	this.renderWithContext = function(context) {
		return Mustache.render(this._pattern, context);
	};
	
	this.toString = function() {
		return "[NamePattern(pattern:<"+this._pattern+">)]";
	};
};

tswlairmgr.core.data.BossFragment = function BossFragment(character, number) {
	this._character = character;
	this._number = number;
	this._fullNamePattern = tswlairmgr.core.data.struct.inpFragLair;
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._character.observables.nameChanged.registerCallback(function(origin, context) {
		self.observables.changed.notify(context);
	});
	this._fullNamePattern.observables.changed.registerCallback(function(origin, context) {
		self.observables.changed.notify(context);
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
		return this._fullNamePattern.renderWithContext(
			[
				this.getCode()
			]
		);
	};
	
	this.getCode = function() {
		return this._character.getName() + " " + this._formattedNumberString();
	};
	
	this.getItemName = function() {
		return this.getName();
	};
	
	this.getItemLabel = function() {
		return this.getCode();
	};
	
	this.getOrientationCode = function() {
		return this.getSet().getOrientationOfFragment(this);
	};
	
	this.getBossId = function() {
		return this.getSet().getBoss().getId();
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
	var self = this;
	$.each(this._fragments, function(key, value) {
		frags[key] = fragmentsHash[key] || undefined;
		
		frags[key]._setBackreferenceToSet(self);
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
	
	this.getFragmentAtOrientation = function(orientation) {
		return this._fragments[orientation];
	};
	
	this.getOrientationOfFragment = function(fragmentInstance) {
		var r = null;
		$.each(this._fragments, function(key, fragment) {
			if(fragmentInstance === fragment)
			{
				r = key;
			}
		});
		return r;
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
	this._fullNamePattern = tswlairmgr.core.data.struct.inpSummonLair;
	this._regionalFragmentDrops = [];
	
	this._fragmentSet._setBackreferenceToBoss(this);
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this),
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
		
		var context = {
			previousName: previous
		};
		$.each([this.observables.nameChanged, this.observables.changed], function(index, observable) {
			observable.notify(context);
		});
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.getItemName = function() {
		return this._fullNamePattern.renderWithContext(
			[
				this.getName()
			]
		);
	};
	
	this.getItemLabel = function() {
		return "";
	};
	
	this.setMissionName = function(name) {
		var previous = this._missionName;
		
		this._missionName = name;
		
		var context = {
			previousName: previous
		};
		$.each([this.observables.missionNameChanged, this.observables.changed], function(index, observable) {
			observable.notify(context);
		});
	};
	
	this.getMissionName = function() {
		return this._missionName;
	};
	
	this.getId = function() {
		return this._id;
	};
	
	this.toString = function() {
		return "[Boss(name:<"+this.getName()+">, missionName:<"+this.getMissionName()+">, id:<"+this._id+">)]";
	};
};

tswlairmgr.core.data.Lair = function Lair(id, bossesArray) {
	this._id = id;
	this._bosses = bossesArray;
	
	var bosses = this._bosses;
	var self = this;
	$.each(this._bosses, function(key, value) {
		value._setBackreferenceToLair(self);
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
		var res = {};
		$.each(this._bosses, function(index, boss) {
			res[boss.getId()] = boss;
		});
		return res;
	};
	
	this.getSortedBosses = function() {
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
	
	this.getId = function() {
		return this._id;
	};
	
	this.toString = function() {
		return "[Lair(name:<"+this.getName()+">, id:<"+this._id+">)]";
	};
};

tswlairmgr.core.data.Zone = function Zone(id, lairsArray) {
	this._id = id;
	this._lairs = lairsArray;
	
	var lairs = this._lairs;
	var self = this;
	$.each(this._lairs, function(key, value) {
		value._setBackreferenceToZone(self);
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
		var res = {};
		$.each(this._lairs, function(index, lair) {
			res[lair.getId()] = lair;
		});
		return res;
	};
	
	this.getSortedLairs = function() {
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
	
	this.getId = function() {
		return this._id;
	};
	
	this.toString = function() {
		return "[Zone(name:<"+this.getName()+">)]";
	};
};

tswlairmgr.core.data.RegionalBossFragment = function RegionalBossFragment(character, number, droppedFromArray) {
	this._character = character;
	this._number = number;
	this._fullNamePattern = tswlairmgr.core.data.struct.inpFragRegional;
	this._droppedFrom = droppedFromArray;
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this)
	};
	
	var self = this;
	this._character.observables.nameChanged.registerCallback(function(origin, context) {
		self.observables.changed.notify(context);
	});
	this._fullNamePattern.observables.changed.registerCallback(function(origin, context) {
		self.observables.changed.notify(context);
	});
	
	this._setBackreferenceToSet = function(ref) {
		this._backreferenceToSet = ref;
	};
	
	this._generateDropReferences = function() {
		var droppers = this.getDroppedFrom();
		var self = this;
		$.each(droppers, function(key, value) {
			value._addRegionalFragmentDrop(self);
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
		return this._fullNamePattern.renderWithContext(
			[
				this.getCode()
			]
		);
	};
	
	this.getCode = function() {
		return this._character.getName() + " " + this._formattedNumberString();
	};
	
	this.getItemName = function() {
		return this.getName();
	};
	
	this.getItemLabel = function() {
		return this.getCode();
	};
	
	this.getOrientationCode = function() {
		return this.getSet().getOrientationOfFragment(this);
	};
	
	this.getBossId = function() {
		return this.getSet().getBoss().getId();
	};
	
	this.getDroppedFrom = function() {
		return this._droppedFrom;
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
	var self = this;
	$.each(this._fragments, function(key, value) {
		frags[key] = fragmentsHash[key] || undefined;
		
		frags[key]._setBackreferenceToSetAndGenerateDropReferences(self);
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
	
	this.getFragmentAtOrientation = function(orientation) {
		return this._fragments[orientation];
	};
	
	this.getOrientationOfFragment = function(fragmentInstance) {
		var r = null;
		$.each(this._fragments, function(key, fragment) {
			if(fragmentInstance === fragment)
			{
				r = key;
			}
		});
		return r;
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

tswlairmgr.core.data.RegionalBoss = function RegionalBoss(id, lair, fragmentSet) {
	this._id = id;
	this._backreferenceToLair = lair;
	this._fragmentSet = fragmentSet;
	this._fullNamePattern = tswlairmgr.core.data.struct.inpSummonRegional;
	
	this._fragmentSet._setBackreferenceToBoss(this);
	
	this.observables = {
		changed: new tswlairmgr.core.helpers.Observable(this),
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._setBackreferenceToRegion = function(ref) {
		this._backreferenceToRegion = ref;
	};
	
	this.getRegion = function() {
		return this._backreferenceToRegion;
	};
	
	this.getLair = function() {
		return this._backreferenceToLair;
	};
	
	this.getFragmentSet = function() {
		return this._fragmentSet;
	};
	
	this.setName = function(name) {
		var previous = this._name;
		
		this._name = name;
		
		var context = {
			previousName: previous
		};
		$.each([this.observables.nameChanged, this.observables.changed], function(index, observable) {
			observable.notify(context);
		});
	};
	
	this.getName = function() {
		return this._name;
	};
	
	this.getItemName = function() {
		return this._fullNamePattern.renderWithContext(
			[
				this.getRegion().getName()
			]
		);
	};
	
	this.getItemLabel = function() {
		return "";
	};
	
	this.getId = function() {
		return this._id;
	};
	
	this.toString = function() {
		return "[RegionalBoss(name:<"+this.getName()+">, id:<"+this._id+">)]";
	};
};

tswlairmgr.core.data.Region = function Region(id, zonesArray, regionalBoss) {
	this._id = id;
	this._zones = zonesArray;
	this._regionalBoss = regionalBoss;
	
	var self = this;
	$.each(this._zones, function(key, value) {
		value._setBackreferenceToRegion(self);
	});
	this._regionalBoss._setBackreferenceToRegion(this);
	
	this.observables = {
		nameChanged: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this.getZones = function() {
		var res = {};
		$.each(this._zones, function(index, zone) {
			res[zone.getId()] = zone;
		});
		return res;
	};
	
	this.getSortedZones = function() {
		return this._zones;
	};
	
	this.getNumberOfZones = function() {
		return this._zones.length;
	};
	
	this.getRegional = function() {
		return this._regionalBoss;
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
	
	this.getId = function() {
		return this._id;
	};
	
	this.toString = function() {
		return "[Region(name:<"+this.getName()+">)]";
	};
};