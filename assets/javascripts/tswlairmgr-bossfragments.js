var tswlairmgr = tswlairmgr || {};
tswlairmgr.bossfragments = tswlairmgr.bossfragments || {};

tswlairmgr.debug = true;

tswlairmgr.bossfragments.Bosses = function Bosses(node, lair) {
	this.lair = lair;
	this.bosses = [];
	
	this.el = {
		root: node,
		bosses: node.getElementsByClassName('boss')
	};
	
	this.setLair = function(data) {
		this.lair = data;
		
		this.redraw();
	};
	
	this.redraw = function() {
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
	
	if(tswlairmgr.debug) {
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
	
	if(tswlairmgr.debug) {
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
		this.icon.redraw();
	};
	
	this.init = function() {
		this.icon = new tswlairmgr.bossfragments.BossFragmentIcon(this.el['icon'], this);
		this.controls = new tswlairmgr.bossfragments.BossFragmentControls(this.el['controls'], this);
	};
	
	if(tswlairmgr.debug) {
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
	
	if(tswlairmgr.debug) {
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
		this.el['counts']['current'].innerHTML = parseInt(arg);
		if(!dontRecalculate)
		{
			self.fragment.boss.counts.recalculate();
		}
	};
	
	this.getCountAll = function() {
		return(parseInt(this.el['counts']['all'].innerHTML));
	};
	this.setCountAll = function(arg, dontRecalculate) {
		this.el['counts']['all'].innerHTML = parseInt(arg);
		if(!dontRecalculate)
		{
			self.fragment.boss.counts.recalculate();
		}
	};
	
	this.increment = function() {
		var val = self.getCount();
		if(val < self.max)
		{
			self.setCount(val + 1);
		}
	};
	this.decrement = function() {
		var val = self.getCount();
		if(val > self.min)
		{
			self.setCount(val - 1);
		}
	};
	
	this.reset = function(dontRecalculate) {
		this.setCount(0, dontRecalculate);
		this.setCountAll(0, dontRecalculate);
	};
	
	this.init = function() {
		this.el['buttons']['minus'].onclick = this.decrement;
		this.el['buttons']['plus'].onclick = this.increment;
		
		this.reset(true);
	};
	
	if(tswlairmgr.debug) {
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
		argInt = parseInt(arg);
		this.el['countSpawns']['count'].innerHTML = argInt;
		this.el['countSpawns']['subject'].innerHTML = (argInt == 1) ? 'Summoning Ritual' : 'Summoning Rituals';
	};
	
	this.getCountMissing = function() {
		return(parseInt(this.el['countMissing']['count'].innerHTML));
	};
	this.setCountMissing = function(arg) {
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
		var iterationLimit = /*countsArray.length*/32;
		do {
			countsArray = this._array_lowest_increment(countsArray);
			remaining++;
			iterationLimit--;
		}
		while(this._array_lowest(countsArray) == lowestFragmentCount && iterationLimit >= 0);
		
		return(remaining);
	};
	
	this.recalculate = function() {
		var numFragmentsAll = 0;
		var numFragments = [];
		for(var i=0; i<this.boss.fragments.length; i++)
		{
			var controls = this.boss.fragments[i].controls;
			var count = controls.getCount();
			
			numFragmentsAll += count;
			numFragments[i] = count;
		}
		
		var numSpawns = this._calculateNumSpawns(numFragments);
		var numMissing = this._calculateNumMissing(numFragments);
		
		this.setCountSpawns(numSpawns);
		this.setCountMissing(numMissing);
	};
	
	this.init = function() {
		this.setCountSpawns(0);
		this.setCountMissing(0);
	};
	
	if(tswlairmgr.debug) {
		console.log('<tswlairmgr.bossfragments.BossCounts> instance created [index='+this.boss.index+']');
	}
	
	this.init();
};