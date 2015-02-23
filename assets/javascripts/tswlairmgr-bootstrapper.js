var tswlairmgr = tswlairmgr || {};
tswlairmgr.bootstrapper = tswlairmgr.bootstrapper || {};

tswlairmgr.bootstrapper = function bootstrapper() {
	this.defaultLair = null;
	this.initialLair = null;
	this.initialLairRegionId = null;
	this.initialLairZoneId = null;
	
	this._bootstrapPreloader = function() {
		tswlairmgr.preloaderInstance = new tswlairmgr.preloader.Preloader();
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Preloader initialized.');
		}
	};
	
	this._bootstrapHelpOverlay = function() {
		tswlairmgr.helpoverlayInstance = new tswlairmgr.helpoverlay.HelpOverlay();
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Help overlay initialized.');
		}
	};
	
	this._bootstrapBossFragmentsDisplay = function() {
		tswlairmgr.bossfragmentsInstance = new tswlairmgr.bossfragments.Bosses(
			document.getElementById('boss-fragments'),
			this.initialLair
		);
		
		if(tswlairmgr.settings.demo)
		{
			this._demoSetRandomFragmentCounts();
		}
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Boss fragments display initialized.');
		}
	};
	
	this._bootstrapLairSelectorDropdown = function() {
		tswlairmgr.lairselectorInstance = new tswlairmgr.lairselector.LairSelectorDropdown(
			document.getElementById('lair-selector'),
			document.getElementsByTagName('body')[0],
			tswlairmgr.bossfragmentsInstance,
			this.initialLairRegionId,
			this.initialLairZoneId
		);
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Lair selector dropdown initialized.');
		}
	};
	
	this._bootstrapTurninParticipants = function() {
		tswlairmgr.turninparticipantsInstance = new tswlairmgr.turnin.Participants(document.getElementById("participants"));
		
		if(tswlairmgr.settings.demo)
		{
			this._demoInsertRandomNames();
		}
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Turn-in: Participant list initialized.');
		}
	};
	
	this._bootstrapTurninPickTable = function() {
		tswlairmgr.turninpicktableInstance = new tswlairmgr.turnin.PickTable(document.getElementById("pick-table"));
		
		if(tswlairmgr.settings.demo)
		{
			this._demoSetRandomPickStates();
		}
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Turn-in: Pick table initialized.');
		}
	};
	
	this._bootstrapTurninNameColorizer = function() {
		tswlairmgr.turninnamecolorizerInstance = new tswlairmgr.turnin.NameColorizer();
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Turn-in: Name colorizer initialized.');
		}
	};
	
	this._demoSetRandomFragmentCounts = function() {
		for(var i=0; i<tswlairmgr.bossfragmentsInstance.bosses.length; i++)
		{
			var boss = tswlairmgr.bossfragmentsInstance.bosses[i];

			for(var j=0; j<boss.fragments.length; j++)
			{
				var fragment = boss.fragments[j];

				var randomFragmentCount = Math.floor(Math.random() * 10);
				fragment.controls.setCount( randomFragmentCount );
			}
		}
	};
	
	this._demoInsertRandomNames = function() {
		var names = [
			'Derp',
			'Derpina',
			'SirCritsalot',
			'FistingIsFun',
			'Sucker',
			'FacerollMode',
			'Masochist',
			'MadScientist',
			'Hammertime',
			'Bleeder',
			'MeleeOrFeed',
			'Laserdisco'
		];
		
		//+ Jonas Raoni Soares Silva
		//@ http://jsfromhell.com/array/shuffle [v1.0]
		names = (function shuffle(o){ //v1.0
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
		})(names);
		
		names = names.slice(0, 5 + Math.floor((Math.random() * (12-5))));
		
		for(var i=0; i<names.length; i++)
		{
			tswlairmgr.turninparticipantsInstance.addParticipant(names[i]);
		}
	};
	
	this._demoSetRandomPickStates = function() {
		// TODO: Implement me.
		console.log('===== RANDOMLY INITIALIZE PICK TABLE STATUSES HERE =====');
	};
	
	this.init = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> init called');
		}
		
		if(tswlairmgr.settings.demo)
		{
			var randomRegionId = Math.floor(Math.random()*tswlairmgr.data.lairdata.length);
			var randomRegion = tswlairmgr.data.lairdata[randomRegionId];
			var randomLairId = Math.floor(Math.random()*randomRegion.lairs.length);
			var randomLair = randomRegion.lairs[randomLairId];
			
			this.initialLair = randomLair;
			this.initialLairRegionId = randomRegionId;
			this.initialLairZoneId = randomLairId;
		}
		else
		{
			this.initialLair = tswlairmgr.data.lairdata[tswlairmgr.settings.lair_default.region_id].lairs[tswlairmgr.settings.lair_default.lair_id];;
			this.initialLairRegionId = tswlairmgr.settings['lair_default']['region_id'];
			this.initialLairZoneId = tswlairmgr.settings['lair_default']['lair_id'];
		}
		
		this._bootstrapPreloader();
		this._bootstrapHelpOverlay();
		this._bootstrapBossFragmentsDisplay();
		this._bootstrapLairSelectorDropdown();
		this._bootstrapTurninParticipants();
		this._bootstrapTurninPickTable();
		this._bootstrapTurninNameColorizer();
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Bootstrapping process complete, TSW Lair Manager is fully initialized.');
		}
	};
	
	this.init();
}