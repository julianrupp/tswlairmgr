var tswlairmgr = tswlairmgr || {};

window.onload = function() {
	/* Hide "JavaScript disabled" notice */
	document.getElementById('js-required-warning').style.display = 'none';
	
	/* Initialize TSW Lair Manager */
	new tswlairmgr.bootstrapper();
	
	/* Make app visible */
	document.getElementById('webapp').style.display = 'block';
};