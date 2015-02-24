var tswlairmgr = tswlairmgr || {};
tswlairmgr.bossfragments = tswlairmgr.bossfragments || {};

tswlairmgr.bossfragments.Bosses = function Bosses(node, lair) {
	this.lair = lair;
	this.bosses = [];
	
	this.el = {
		root: node,
		bosses: node.getElementsByClassName('boss')
	};
	
	this.setLair = function(data) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.Bosses> setLair called: ['+data['area']+']');
		}
		
		this.lair = data;
		
		this.redraw();
		
		if(tswlairmgr.turninpicktableInstance)
		{
			tswlairmgr.turninpicktableInstance.update();
		}
	};
	
	this.redraw = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.Bosses> redraw called');
		}
		
		for(var i=0; i<this.bosses.length; i++)
		{
			boss = this.bosses[i];
			
			boss.redraw();
		}
	};
	
	this.init = function() {
		for(var i=0; i<this.el['bosses'].length; i++)
		{
			boss = this.el['bosses'][i];
			
			this.bosses[i] = new tswlairmgr.bossfragments.Boss(boss, this, i);
		}
	};
	
	if(tswlairmgr.settings.debug) {
		console.log('<tswlairmgr.bossfragments.Bosses> instance created');
	}
	
	this.init();
};

tswlairmgr.bossfragments.Boss = function Boss(node, collectionObject, index) {
	this.collection = collectionObject;
	this.index = index;
	this.fragments = [];
	this.counts = null;
	
	this.el = {
		root: node,
		name: node.getElementsByClassName('name')[0],
		mission: node.getElementsByClassName('mission')[0],
		fragments: node.getElementsByClassName('boss-fragment'),
		counts: node.getElementsByClassName('boss-counts')[0]
	};
	
	this.reset = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.Boss> reset called');
		}
		
		this.resetIcons();
		this.resetControls();
		this.counts.reset();
	};
	
	this.resetIcons = function() {
		for(var i=0; i<this.fragments.length; i++)
		{
			fragment = this.fragments[i];
			
			fragment.resetIcon();
		}
	};
	
	this.resetControls = function() {
		
		for(var i=0; i<this.fragments.length; i++)
		{
			fragment = this.fragments[i];
			
			fragment.resetControls();
		}
	};
	
	this.redraw = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.Boss> redraw called');
		}
		
		this.el['name'].innerHTML = this.collection.lair['bosses'][this.index]['name'];
		this.el['mission'].innerHTML = this.collection.lair['bosses'][this.index]['mission_name'];
		
		for(var i=0; i<this.fragments.length; i++)
		{
			fragment = this.fragments[i];
			
			fragment.redraw();
		}
	};
	
	this.init = function() {
		this.counts = new tswlairmgr.bossfragments.BossCounts(this.el['counts'], this);
		
		for(var i=0; i<this.el['fragments'].length; i++)
		{
			fragment = this.el['fragments'][i];
			
			this.fragments[i] = new tswlairmgr.bossfragments.BossFragment(fragment, this, i);
		}
		
		this.redraw();
		
		this.counts.recalculate();
	};
	
	if(tswlairmgr.settings.debug) {
		console.log('<tswlairmgr.bossfragments.Boss> instance created: (index='+this.index+')');
	}
	
	this.init();
};

tswlairmgr.bossfragments.BossFragment = function BossFragment(node, bossObject, position) {
	this.boss = bossObject;
	this.icon = null;
	this.controls = null;
	this.position = position;
	
	this.el = {
		root: node,
		icon: node.getElementsByClassName('item')[0],
		controls: node.getElementsByClassName('bossfragment-controls')[0]
	};
	
	this.reset = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragment> reset called');
		}
		
		this.resetIcon();
		this.resetControls();
	};
	
	this.resetIcon = function() {
		this.icon.reset();
	};
	
	this.resetControls = function() {
		this.controls.reset();
	};
	
	this.getPositionName = function() {
		var map = ['nw', 'n', 'ne', 'w', 'o', 'e', 'sw', 's', 'se'];
		return(map[this.position]);
	};
	
	this.redraw = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragment> redraw called');
		}
		
		this.icon.redraw();
	};
	
	this.init = function() {
		this.icon = new tswlairmgr.bossfragments.BossFragmentIcon(this.el['icon'], this);
		this.controls = new tswlairmgr.bossfragments.BossFragmentControls(this.el['controls'], this);
	};
	
	if(tswlairmgr.settings.debug) {
		console.log('<tswlairmgr.bossfragments.BossFragment> instance created: [index='+this.boss.index+'] (position='+this.getPositionName()+')');
	}
	
	this.init();
};

tswlairmgr.bossfragments.BossFragmentIcon = function BossFragmentIcon(node, fragmentObject) {
	this.fragment = fragmentObject;
	
	this.el = {
		root: node,
		icon: node.getElementsByClassName('icon')[0],
		name: node.getElementsByClassName('name')[0]
	};
	
	this.redraw = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragmentIcon> redraw called');
		}
		
		var bossIndex = this.fragment.boss.index;
		var lairId = this.fragment.boss.collection.lair['area'];
		var bossId = this.fragment.boss.collection.lair['bosses'][bossIndex]['id'];
		var positionName = this.fragment.getPositionName();
		
		this.el['icon'].className = 'icon';
		if(lairId != null && bossId != null) { this.el['icon'].className += ' ' + lairId+bossId; }
		if(positionName != null) { this.el['icon'].className += ' ' + positionName; }
		
		var fragmentData = this.fragment.boss.collection.lair['bosses'][bossIndex]['fragments'][positionName];
		var fragmentName = fragmentData.letter+' '+fragmentData.number;
		this.el['name'].innerHTML = fragmentName;
	};
	
	this.init = function() {
		this.el['root'].className = 'item rare lairfragment';
		
		this.redraw();
	};
	
	if(tswlairmgr.settings.debug) {
		console.log('<tswlairmgr.bossfragments.BossFragmentIcon> instance created [index='+this.fragment.boss.index+' position='+this.fragment.getPositionName()+']');
	}
	
	this.init();
};

tswlairmgr.bossfragments.BossFragmentControls = function BossFragmentControls(node, fragmentObject) {
	this.fragment = fragmentObject;
	this.min = 0;
	this.max = 99;
	
	var self = this;
	
	this.el = {
		root: node,
		buttons: {
			minus: node.getElementsByClassName('minus')[0],
			plus: node.getElementsByClassName('plus')[0]
		},
		counts: {
			current: node.getElementsByClassName('count')[0],
			all: node.getElementsByClassName('count-all')[0]
		}
	};
	
	this.getCount = function() {
		return(parseInt(this.el['counts']['current'].innerHTML));
	};
	this.setCount = function(arg, dontRecalculate) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragmentControls> setCount called: ['+arg+', '+dontRecalculate+']');
		}
		
		this.el['counts']['current'].innerHTML = parseInt(arg);
		if(!dontRecalculate)
		{
			self.fragment.boss.counts.recalculate();
		}
		
		if(tswlairmgr.turninpicktableInstance)
		{
			tswlairmgr.turninpicktableInstance.update();
		}
	};
	
	this.getCountAll = function() {
		return(parseInt(this.el['counts']['all'].innerHTML));
	};
	this.setCountAll = function(arg, dontRecalculate) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragmentControls> setCountAll called: ['+arg+', '+dontRecalculate+']');
		}
		
		this.el['counts']['all'].innerHTML = parseInt(arg);
		if(!dontRecalculate)
		{
			self.fragment.boss.counts.recalculate();
		}
	};
	
	this.increment = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragmentControls> increment called');
		}
		
		var val = self.getCount();
		if(val < self.max)
		{
			self.setCount(val + 1);
		}
	};
	this.decrement = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragmentControls> decrement called');
		}
		
		var val = self.getCount();
		if(val > self.min)
		{
			self.setCount(val - 1);
		}
	};
	
	this.reset = function(dontRecalculate) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossFragmentControls> reset called');
		}
		
		this.setCount(0, dontRecalculate);
		this.setCountAll(0, dontRecalculate);
	};
	
	this.init = function() {
		this.el['buttons']['minus'].onclick = this.decrement;
		this.el['buttons']['plus'].onclick = this.increment;
		
		this.reset(true);
	};
	
	if(tswlairmgr.settings.debug) {
		console.log('<tswlairmgr.bossfragments.BossFragmentControls> instance created [index='+this.fragment.boss.index+' position='+this.fragment.getPositionName()+']');
	}
	
	this.init();
};

tswlairmgr.bossfragments.BossCounts = function BossCounts(node, bossObject) {
	this.boss = bossObject;
	
	this.el = {
		root: node,
		countSpawns: {
			count: node.getElementsByClassName('count-format')[0].getElementsByClassName('count')[0],
			subject: node.getElementsByClassName('count-format')[0].getElementsByClassName('subject')[0]
		},
		countMissing: {
			count: node.getElementsByClassName('missing-format')[0].getElementsByClassName('count')[0],
			subject: node.getElementsByClassName('missing-format')[0].getElementsByClassName('subject')[0]
		}
	};
	
	this.getCountSpawns = function() {
		return(parseInt(this.el['countSpawns']['count'].innerHTML));
	};
	this.setCountSpawns = function(arg) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossCounts> setCountSpawns called: ['+arg+']');
		}
		
		argInt = parseInt(arg);
		this.el['countSpawns']['count'].innerHTML = argInt;
		this.el['countSpawns']['subject'].innerHTML = (argInt == 1) ? 'Summoning Ritual' : 'Summoning Rituals';
	};
	
	this.getCountMissing = function() {
		return(parseInt(this.el['countMissing']['count'].innerHTML));
	};
	this.setCountMissing = function(arg) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossCounts> setCountMissing called: ['+arg+']');
		}
		
		argInt = parseInt(arg);
		this.el['countMissing']['count'].innerHTML = argInt;
		this.el['countMissing']['subject'].innerHTML = (argInt == 1) ? 'fragment' : 'fragments';
	};
	
	this._array_lowest = function(argArray) {
		var lowest = null;
		for(var i=0; i<argArray.length; i++)
		{
			if(lowest === null || argArray[i] < lowest)
			{
				lowest = argArray[i];
			}
		}
		return((lowest != null) ? lowest : 0);
	};
	
	this._array_lowest_increment = function(argArray) {
		argArray = argArray.slice(0); /* Clone */
		
		var lowest = null;
		var lowestIndex = null;
		for(var i=0; i<argArray.length; i++)
		{
			if(lowest === null || argArray[i] < lowest)
			{
				lowest = argArray[i];
				lowestIndex = i;
			}
		}
		argArray[lowestIndex]++;
		
		return(argArray);
	};
	
	this._calculateNumSpawns = function(countsArray) {
		return(this._array_lowest(countsArray));
	};
	
	this._calculateNumMissing = function(countsArray) {
		countsArray = countsArray.slice(0); /* Clone */
		
		var lowestFragmentCount = this._array_lowest(countsArray);
		var remaining = 0;
		var iterationLimit = countsArray.length;
		do {
			countsArray = this._array_lowest_increment(countsArray);
			remaining++;
			iterationLimit--;
		}
		while(this._array_lowest(countsArray) == lowestFragmentCount && iterationLimit >= 0);
		
		return(remaining);
	};
	
	this.markLowestFragments = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossCounts> markLowestFragments called');
		}
		
		/* Find lowest fragment count */
		var lowestFragmentCount = null;
		var lowestFragmentCountIndex = null;
		for(var i=0; i<this.boss.fragments.length; i++)
		{
			var controls = this.boss.fragments[i].controls;
			var count = controls.getCount();
			
			if(lowestFragmentCount === null || count < lowestFragmentCount)
			{
				lowestFragmentCount = count;
				lowestFragmentCountIndex = i;
			}
		}
		
		/* Find all fragments with lowest count */
		var fragmentsToMark = [];
		for(var i=0; i<this.boss.fragments.length; i++)
		{
			var controls = this.boss.fragments[i].controls;
			var count = controls.getCount();
			
			if(count == lowestFragmentCount)
			{
				fragmentsToMark[fragmentsToMark.length] = i;
			}
		}
		
		/* Mark/unmark fragments */
		for(var i=0; i<this.boss.fragments.length; i++)
		{
			var controlsNode = this.boss.fragments[i].el['root'];
			
			/* Unmark first */
			var controlsNodeClasses = controlsNode.className.split(" ");
			var lowmarkClassIndex = controlsNodeClasses.indexOf("low-mark");
			if(lowmarkClassIndex >= 0)
			{
				controlsNodeClasses.splice(lowmarkClassIndex, 1);
			}
			controlsNode.className = controlsNodeClasses.join(" ");
			
			if(fragmentsToMark.indexOf(i) >= 0)
			{
				/* Mark it again */
				controlsNode.className += ' low-mark';
			}
		}
	}
	
	this.recalculate = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bossfragments.BossCounts> recalculate called');
		}
		
		var numFragmentsAll = 0;
		var numFragments = [];
		for(var i=0; i<this.boss.fragments.length; i++)
		{
			var controls = this.boss.fragments[i].controls;
			var countAll = controls.getCountAll();
			
			numFragmentsAll += countAll;
			numFragments[i] = countAll;
		}
		
		var numSpawns = this._calculateNumSpawns(numFragments);
		var numMissing = this._calculateNumMissing(numFragments);
		
		this.setCountSpawns(numSpawns);
		this.setCountMissing(numMissing);
		
		this.markLowestFragments();
	};
	
	this.init = function() {
		this.setCountSpawns(0);
		this.setCountMissing(0);
	};
	
	if(tswlairmgr.settings.debug) {
		console.log('<tswlairmgr.bossfragments.BossCounts> instance created [index='+this.boss.index+']');
	}
	
	this.init();
};