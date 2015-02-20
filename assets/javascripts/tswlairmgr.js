var tswlairmgr = tswlairmgr || {};

tswlairmgr.debug = true;

tswlairmgr.settings = {
	lair_default: { /* Solomon Island - Kingsmouth */
		region_id: 0,
		lair_id: 0
	}
};

window.onload = function() {
	document.getElementById('js-required-warning').style.display = 'none';
	
	var lair = tswlairmgr.data.lairdata[tswlairmgr.settings['lair_default']['region_id']].lairs[tswlairmgr.settings['lair_default']['lair_id']]; // Default selected lair = Kingsmouth
	tswlairmgr.bossfragmentsInstance = new tswlairmgr.bossfragments.Bosses(document.getElementById('boss-fragments'), lair);
	//demoSetRandomFragmentCounts();
	
	tswlairmgr.lairselectorInstance = new tswlairmgr.lairselector.LairSelectorDropdown(document.getElementById('lair-selector'), tswlairmgr.bossfragmentsInstance, tswlairmgr.settings['lair_default']['region_id'], tswlairmgr.settings['lair_default']['lair_id']);
	
	document.getElementById('webapp').style.display = 'block';
};

function demoSetRandomFragmentCounts()
{
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
}