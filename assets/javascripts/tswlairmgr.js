var tswlairmgr = tswlairmgr || {};

window.onload = function() {
	/* Hide "JavaScript disabled" notice */
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr> Hiding "JS disabled" warning.');
	}
	document.getElementById('js-required-warning').style.display = 'none';
	
	/* Initialize TSW Lair Manager */
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr> Firing up bootstrapper...');
	}
	new tswlairmgr.bootstrapper();
	
	/* Make app visible */
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr> Making app container visible.');
	}
	document.getElementById('webapp').style.display = 'block';
};