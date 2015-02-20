var tswlairmgr = tswlairmgr || {};
tswlairmgr.lairselector = tswlairmgr.lairselector || {};

tswlairmgr.lairselector.LairSelectorDropdown = function LairSelectorDropdown(node, bossfragmentsObject, defaultRegionId, defaultLairId) {
	this.bossfragments = bossfragmentsObject;
	this.selectIndexMap = [];
	
	var self = this;
	
	this.el = {
		root: node,
		select: node.getElementsByTagName('select')[0]
	};
	
	this.switchLair = function() {
		var selected = self.selectIndexMap[self.el['select'].selectedIndex];
		
		tswlairmgr.bossfragmentsInstance.setLair(tswlairmgr.data.lairdata[selected['regionId']].lairs[selected['lairId']]);
	}
	
	this.init = function() {
		var selectIndex = 0;
		for(var i=0; i<tswlairmgr.data.lairdata.length; i++)
		{
			var region = tswlairmgr.data.lairdata[i];
			
			var regionNode = document.createElement('optgroup');
			regionNode.label = region['region_name'];
			
			for(var j=0; j<region['lairs'].length; j++)
			{
				var lair = region['lairs'][j];
				
				var lairNode = document.createElement('option');
				if(i == defaultRegionId && j == defaultLairId)
				{
					lairNode.selected = true;
				}
				var lairTitleNode = document.createTextNode(lair['area_name']+': '+lair['lair_name']);
				lairNode.appendChild(lairTitleNode);
				
				this.selectIndexMap[selectIndex++] = {regionId: i, lairId: j};
				
				regionNode.appendChild(lairNode);
			}
			
			this.el['select'].appendChild(regionNode);
		}
		
		this.el['select'].onchange = this.switchLair;
	};
	
	this.init();
};