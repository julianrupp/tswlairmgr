var tswlairmgr = tswlairmgr || {};
tswlairmgr.preloader = tswlairmgr.preloader || {};

tswlairmgr.preloader.Preloader = function Preloader() {
	this.preloaded = [];
	
	this.preload = function(url) {
		var image = new Image();
		image.src = url;
		
		this.preloaded[this.preloaded.length] = image;
		
		if(tswlairmgr.settings.debug)
		{
			console.log('Preloaded image: '+url);
		}
	};
	
	this.preloadLairBossImages = function() {
		for(var i=0; i<tswlairmgr.data.lairdata.length; i++)
		{
			var region = tswlairmgr.data.lairdata[i];
			
			for(var j=0; j<region.lairs.length; j++)
			{
				var lair = region.lairs[j];
				
				for(var k=0; k<lair.bosses.length; k++)
				{
					var boss = lair.bosses[k];
					
					var bossImageUrl = 'assets/images/lairbosses/'+lair.area+boss.id+'.png';
					this.preload(bossImageUrl);
				}
			}
		}
	};
	
	this.preloadLairBackgrounds = function() {
		for(var i=0; i<tswlairmgr.data.lairdata.length; i++)
		{
			var region = tswlairmgr.data.lairdata[i];
			
			for(var j=0; j<region.lairs.length; j++)
			{
				var lair = region.lairs[j];
				
				var lairBackgroundUrl = 'assets/images/lairs/'+lair.area+'.jpg';
				this.preload(lairBackgroundUrl);
			}
		}
	};
	
	this.preloadHelpImages = function() {
		var helpImages = ['01-lair-select.png',
			'02-fragment-counting.png',
			'03-fragment-count-marks.png',
			'04-summons-and-missing.png',
			'05-adding-team-members.png',
			'06-mission-availability.png',
			'07-received-and-outstanding.png',
			'08-download-chat-script.png',
			'09-2-savedialog2.png',
			'09-3-entering-command.png',
			'09-4-output.png'
		];
		for(var i=0; i<helpImages.length; i++)
		{
			var helpImageUrl = 'assets/images/howto/' + helpImages[i];
			
			this.preload(helpImageUrl);
		}
	};
	
	this.init = function() {
		this.preloadLairBossImages();
		this.preloadLairBackgrounds();
		this.preloadHelpImages();
	};
	
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr.preloader.Preloader> instance created');
	}
	
	this.init();
};