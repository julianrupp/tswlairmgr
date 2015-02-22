var tswlairmgr = tswlairmgr || {};
tswlairmgr.turnin = tswlairmgr.turnin || {};

tswlairmgr.turnin.PickTable = function PickTable(node) {
	this.rowPrototype = null;
	this.picks = [];
	
	this.countOutstanding = 0;
	this.countReceived = 0;
	
	var self = this;
	
	this.el = {
		root: node,
		table: {
			root: document.getElementById("picks"),
			content: document.getElementById("picks").getElementsByTagName("tbody")[0]
		},
		counter: {
			received: document.getElementById("pick-table-count").getElementsByClassName("count-received")[0],
			outstanding: document.getElementById("pick-table-count").getElementsByClassName("count-outstanding")[0]
		},
		downloadButton: document.getElementById("download-button")
	};
	
	this.redrawCounts = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.PickTable> redrawCounts called');
		}
		
		this.el['counter']['received'].innerHTML = this.countReceived;
		this.el['counter']['outstanding'].innerHTML = this.countOutstanding;
	}
	
	this.checkFragment = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.PickTable> checkFragment called');
		}
		
		this.countOutstanding--;
		this.countReceived++;
		this.redrawCounts();
	};
	
	this.uncheckFragment = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.PickTable> uncheckFragment called');
		}
		
		this.countOutstanding++;
		this.countReceived--;
		this.redrawCounts();
	};
	
	this.downloadHandler = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.PickTable> downloadHandler called');
		}
		
		var nameColors = tswlairmgr.settings.name_colors;
		
		var chatScriptCode = '';
		var systemHeadingColorLight = '#ffcc00';
		var systemHeadingColorDark = '#e97f0d';
		var systemBodyColor = '#ffffff';
		
		var hRule = '<font color="'+systemHeadingColorDark+'" face="NORMAL">' + (Array(32).join('-')) + '</font>\n';
		
		for(var i=0; i<tswlairmgr.bossfragmentsInstance.lair.bosses.length; i++)
		{
			var missionName = tswlairmgr.bossfragmentsInstance.lair.bosses[i]['mission_name'];
			var bossName = tswlairmgr.bossfragmentsInstance.lair.bosses[i]['name'];
			
			var missionPicksHeader = '<font color="'+systemHeadingColorLight+'" face="HUGE">' + missionName + '</font>\n' +
				'<font color="'+systemHeadingColorDark+'" face="NORMAL">(' + bossName + ')</font>\n';
			
			var missionPicksCode = '';
			for(var j=0; j<self.picks.length; j++)
			{
				var pickSet = self.picks[j];
				var pickedFragmentForMission = pickSet.picks[i];
				if(pickedFragmentForMission)
				{
					var fragmentName = pickedFragmentForMission.icon.el['name'].innerHTML;

					var line = '<font color="'+nameColors[j%nameColors.length]+'" face="LARGE_BOLD">' + pickSet.name + '</font><font color="'+systemBodyColor+'" face="LARGE">: ' + fragmentName + '</font>\n';
				
					missionPicksCode += line;
				}
			}
			
			chatScriptCode += ((i==0) ? hRule : '') +
				missionPicksHeader +
				missionPicksCode +
				hRule;
		}
		
		chatScriptCode += '<font color="'+systemHeadingColorDark+'" face="NORMAL">Generated by <a href="text://<div align=center><font face=HEADLINE color='+systemHeadingColorLight+'>TSW Lair Manager</font><br><br><a href=\'chatcmd:///option WebBrowserStartURL &quot;http://github.com/julianrupp/tswlairmgr&quot; \\n /option web_browser 1\' face=HUGE>http://github.com/julianrupp/tswlairmgr</a></div>" face="NORMAL">Cobin\'s TSW Lair Manager</a></font>';
		
		var blob = new Blob([chatScriptCode], {type: "application/octet-stream;charset=utf-8"});
		saveAs(blob, "tswlairmgr");
	}
	
	this.update = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.PickTable> update called');
		}
		
		var bf = tswlairmgr.bossfragmentsInstance;
		
		this.picks = tswlairmgr.turninparticipantsInstance.getParticipants();
		
		var picksByBossAndFragment = [];
		for(var i=0; i<bf.bosses.length; i++)
		{
			picksByBossAndFragment[i] = [];
			var boss = bf.bosses[i];
			for(var j=0; j<boss.fragments.length; j++)
			{
				picksByBossAndFragment[i][j] = 0;
			}
		}
		
		for(var i=0; i<bf.bosses.length; i++)
		{
			var boss = bf.bosses[i];
			var availablePlayers = tswlairmgr.turninparticipantsInstance.getParticipantsAvailableForMission(i);
			
			/* Fetch fragment counts list */
			var fragmentCounts = [];
			for(var j=0; j<boss.fragments.length; j++)
			{
				var fragment = boss.fragments[j];
				
				fragmentCounts[j] = fragment.controls.getCount();
			}
			
			/* Assign Boss fragments to people for this boss */
			for(var k=0; k<availablePlayers.length; k++)
			{
				var playerToAssign = availablePlayers[k];
				
				/* Find best fragment pick choice */
				var lowestFragmentCount = null;
				var lowestFragmentIndex = null;
				for(var l=0; l<fragmentCounts.length; l++)
				{
					if(lowestFragmentCount === null || fragmentCounts[l] < lowestFragmentCount)
					{
						lowestFragmentCount = fragmentCounts[l];
						lowestFragmentIndex = l;
					}
				}
				
				/* Pick */
				for(var m=0; m<this.picks.length; m++)
				{
					if(this.picks[m].name == playerToAssign)
					{
						this.picks[m].picks = this.picks[m].picks || [];
						this.picks[m].picks[i] = tswlairmgr.bossfragmentsInstance.bosses[i].fragments[lowestFragmentIndex];
						
						picksByBossAndFragment[i][lowestFragmentIndex]++;
						
						fragmentCounts[lowestFragmentIndex]++;
						
						if(tswlairmgr.settings.debug)
						{
							console.log('>>> Boss '+(i+1)+': '+playerToAssign+' = '+this.picks[m].picks[i].icon.el['name'].innerHTML);
						}
					}
				}
			}
		}
		
		/* Update total fragment counts in boss fragment table */
		var bf = tswlairmgr.bossfragmentsInstance;
		for(var i=0; i<bf.bosses.length; i++)
		{
			var boss = bf.bosses[i];
			var availablePlayers = tswlairmgr.turninparticipantsInstance.getParticipantsAvailableForMission(i);
			
			/* Fetch fragment counts list */
			var fragmentCounts = [];
			for(var j=0; j<boss.fragments.length; j++)
			{
				var fragment = boss.fragments[j];
				
				tswlairmgr.bossfragmentsInstance
					.bosses[i]
					.fragments[j]
					.controls.setCountAll(
						fragment.controls.getCount() + picksByBossAndFragment[i][j]
					);
			}
		}
		
		this.redraw();
	};
	
	this.redraw = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.PickTable> redraw called');
		}
		
		/* Clear table */
		while(this.el['table']['content'].firstChild)
		{
			this.el['table']['content'].removeChild(this.el['table']['content'].firstChild);
		}
		this.countOutstanding = 0;
		this.countReceived = 0;
		
		for(var i=0; i<this.picks.length; i++)
		{
			var participant = this.picks[i];
			
			var newRowNode = this.rowPrototype.cloneNode(true); /* Deep copy */
			
			newRowNode.getElementsByClassName("name")[0].innerHTML = participant.name;
			for(var j=0; j<participant.picks.length; j++)
			{
				if(participant.picks[j])
				{
					var itemNode = participant.picks[j].icon.el['root'].cloneNode(true); /* Deep copy */
				
					itemNode.className += ' small';
				
					newRowNode.getElementsByClassName("fragment-checkbox")[j].appendChild(itemNode);
					
					this.countOutstanding++;
				}
				else
				{
					// TODO: Insert disabled empty boss fragment icon here
				}
			}
			
			this.el['table']['content'].appendChild(newRowNode);
		}
		
		this.el['counter']['received'].innerHTML = this.countReceived;
		this.el['counter']['outstanding'].innerHTML = this.countOutstanding;
		
		/* Enhance fragments */
		var elms = this.el['table']['content'].getElementsByClassName("fragment-checkbox");
		for(var i=0; i<elms.length; i++)
		{
			if(!elms[i].className.match(/\bdisabled\b/) && elms[i].getElementsByClassName("item").length != 0)
			{
				elms[i].style.cursor = 'pointer';
				elms[i].onclick = (function(objSelf, obj) {
					return function() {
						if(objSelf.className.match(/\bchecked\b/))
						{
							objSelf.className = 'fragment-checkbox';
							obj.uncheckFragment();
						}
						else
						{
							objSelf.className = 'fragment-checkbox checked';
							obj.checkFragment();
						}
					}
				})(elms[i], this);
			}
			else
			{
				elms[i].style.cursor = 'default';
			}
		}
		
		if(this.picks.length == 0)
		{
			this.el['downloadButton'].disabled = true;
		}
		else
		{
			this.el['downloadButton'].disabled = false;
		}
	};
	
	this.init = function() {
		/* Initialize row prototype */
		var rowPrototypeNode = this.el['table']['content'].getElementsByClassName("prototype")[0];
		this.rowPrototype = rowPrototypeNode.cloneNode(true); /* Deep copy */
		
		var rowPrototypeClasses = this.rowPrototype.className.split(" ");
		var prototypeClassIndex = rowPrototypeClasses.indexOf("prototype");
		if(prototypeClassIndex > -1) /* should always be true, but check for sanity */
		{
			rowPrototypeClasses.splice(prototypeClassIndex, 1);
		}
		this.rowPrototype.className = rowPrototypeClasses.join(" ");
		
		rowPrototypeNode.parentNode.removeChild(rowPrototypeNode);
		
		this.el['downloadButton'].onclick = this.downloadHandler;
		
		this.update();
	};
	
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr.turnin.PickTable> instance created');
	}
	
	this.init();
};