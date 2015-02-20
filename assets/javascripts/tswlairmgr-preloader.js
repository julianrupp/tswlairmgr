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
	
	this.init = function() {
		this.preloadLairBossImages();
		this.preloadLairBackgrounds();
	};
	
	this.init();
};