var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.NameColors = new function() {
	this._colors = [
		'#fabca4',
		'#fad2a4',
		'#fae4a4',
		'#faf5a4',
		'#e7f4a0',
		'#acec9a',
		'#98e9dc',
		'#98c2e9',
		'#9899e9',
		'#c298e9',
		'#eb9ada',
		'#f5a0a9'
	];
	
	this.getHTMLColorForListIndex = function(listIndex)
	{
		return this._colors[ listIndex % this._colors.length ];
	};
};