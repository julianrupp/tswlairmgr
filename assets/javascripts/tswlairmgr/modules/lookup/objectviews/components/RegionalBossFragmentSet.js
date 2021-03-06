var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};
tswlairmgr.modules.lookup.objectviews.components = tswlairmgr.modules.lookup.objectviews.components || {};

tswlairmgr.modules.lookup.objectviews.components.RegionalBossFragmentSet = function lookupObjectviewComponentRegionalBossFragmentSet(contentNode, object, options, localization) {
	this._object = object;
	this._options = options;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	this._subViews = [];
	
	this._el = {
		self: contentNode,
		fragments: null
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		this._el.fragments = $("<div />")
			.addClass("regionalBossFragmentSet");
		
		var table = $(
			'<table class="fragmentsTable">' +
			'	<tbody>' +
			'		' +
			'	</tbody>' +
			'</table>');
		
		var sideLength = Math.ceil(Math.sqrt(16));
		var fragmentOrder = [
			"nnww", "nnw", "nne", "nnee",
			"nww", "nw", "ne", "nee",
			"sww", "sw", "se", "see",
			"ssww", "ssw", "sse", "ssee"
		];
		var cellNode;
		for(var row=0; row<sideLength; row++)
		{	
			var rowNode = $(
				'<tr>' +
				'	' +
				'</tr>');
			
			for(var col=0; col<sideLength; col++)
			{
				var self = this;
				
				(function(){
					var fragment = self._object.getFragmentSet().getFragments()[ fragmentOrder[row*sideLength + col] ];
			
					cellNode = $(
						'<td>' +
						'	<div class="fragment">' +
						'		' +
						'	</div>' +
						'</td>');
					
					if(self._options.markAllBut)
					{
						if(fragment !== self._options.markAllBut)
						{
							$(cellNode).addClass("marked");
						}
					}
					if(self._options.markSpecific)
					{
						if(fragment === self._options.markSpecific)
						{
							$(cellNode).addClass("marked");
						}
					}
					if(self._options.markAll)
					{
						$(cellNode).addClass("marked");
					}
					
					$(cellNode).addClass("clickable");
					
					if(self._options.markSpecific && fragment === self._options.markSpecific)
					{
						$(cellNode).click(function() {
							tswlairmgr.modules.lookup.controller.setSelectedObject(fragment.getSet().getBoss());
						});
					}
					else
					{
						$(cellNode).click(function() {
							tswlairmgr.modules.lookup.controller.setSelectedObject(fragment);
						});
					}
					
					var fragmentNode = $(".fragment", cellNode);
					self._itemMVCControllers.push(
						new tswlairmgr.core.components.ItemHTML(
							fragment,
							fragmentNode
						)
					);
				})();
				
				$(rowNode).append(cellNode);
			}
			
			$(table).append(rowNode);
		}
		
		$(this._el.fragments).append(table);
		
		$(this._el.self).append(this._el.fragments);
	};
	
	this._redraw = function() {
		// Fragments redraw themselves
	};
	
	var self = this;
	this._moduleLocalizationCallback = function(origin, context) {
		self._redraw();
	};
	
	this._dataLocalizationCallback = function(origin, context) {
		self._redraw();
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(this._dataLocalizationCallback);
	};
	
	this.destroy = function() {
		$.each(this._itemMVCControllers, function(index, controller) {
			controller.destroy();
		});
		$.each(this._subViews, function(index, view) {
			view.destroy();
		});
		
		this._localization.observables.moduleLocalizationChanged.unregisterCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.unregisterCallback(this._dataLocalizationCallback);
	};
	
	this._init();
};