var tswlairmgr = tswlairmgr || {};
tswlairmgr.turnin = tswlairmgr.turnin || {};

tswlairmgr.turnin.NameColorizer = function NameColorizer() {
	this.init = function() {
		var colors = tswlairmgr.settings['name_colors'];
		
		var css = '';
		for(var i=0; i<colors.length; i++)
		{
			css += '.table.names tr:nth-child('+(colors.length)+'n+'+(i+1)+') td:first-child.name	{ color: '+colors[i]+'; }\n';
		}
		
		var cssTextNode = document.createTextNode(css);
		var cssNode = document.createElement('style');
		cssNode.type = 'text/css';
		cssNode.appendChild(cssTextNode);
		
		document.getElementsByTagName("head")[0].appendChild(cssNode);
	};
	
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr.turnin.NameColorizer> instance created');
	}
	
	this.init();
};