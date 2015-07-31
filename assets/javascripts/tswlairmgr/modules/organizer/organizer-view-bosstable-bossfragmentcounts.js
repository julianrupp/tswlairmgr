var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewBosstableBossFragmentCounts = function organizerViewBosstableBossFragmentCounts(contentNode, modelInstance, bossInstance, localization) {
	this._model = modelInstance;
	this._boss = bossInstance;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	
	this.observables = {
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		namesBlock: {
			rootNode: null,
			bossNameLine: null,
			missionNameLine: null,
		},
		fragmentsBlock: {
			rootNode: null,
			fragmentCountControls: {}
		},
		calculatedBlock: {
			rootNode: null,
			numberOfFullSetsLine: null,
			numberOfMissingForNextLine: null
		}
	};
	
	this._templates = {
		calculatedBlock: {
			numberOfFullSets: {
				countFormat: '<span class="count">{{context.number}}</span>'
			},
			numberOfMissingForNext: {
				countFormat: '<span class="count">{{context.number}}</span>'
			}
		}
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentControls>: build called");
		$(this._el.self).empty();
		
		this._build_namesblock();
		this._build_fragmentsblock();
		this._build_calculatedblock();
	};
	
	this._build_namesblock = function() {
		this._el.namesBlock.rootNode = $("<div />")
			.addClass("names");
		
		this._el.namesBlock.bossNameLine = $("<div />")
			.addClass("bossName");
		this._el.namesBlock.missionNameLine = $("<div />")
			.addClass("missionName");
		
		$(this._el.namesBlock.rootNode).append(this._el.namesBlock.bossNameLine);
		$(this._el.namesBlock.rootNode).append(this._el.namesBlock.missionNameLine);
		
		$(this._el.self).append(this._el.namesBlock.rootNode);
	};
	
	this._build_fragmentsblock = function() {
		this._el.fragmentsBlock.rootNode = $("<div />")
			.addClass("fragments");
		
		var table = $(
			'<table class="fragmentsTable">' +
			'	<tbody>' +
			'		' +
			'	</tbody>' +
			'</table>');
		
		var sideLength = Math.ceil(Math.sqrt(9));
		var rowNode;
		var cellNode;
		var fragmentOrder = [
			"nw", "n", "ne",
			"w", "c", "e",
			"sw", "s", "se"
		];
		var fragment;
		for(var row=0; row<sideLength; row++)
		{
			rowNode = $(
				'<tr>' +
				'	' +
				'</tr>');
			
			for(var col=0; col<sideLength; col++)
			{
				fragment = this._boss.getFragmentSet().getFragments()[ fragmentOrder[row*3 + col] ];
				
				cellNode = $(
					'<td class="fragmentControlsContainer low-mark">' + // TODO
					'	<div class="fragment">' +
					'		' +
					'	</div>' +
					'	<div class="controls">' + // TODO: rework HTML to align buttons left/right
					'		<a class="button minus">&minus;</a>' +
					'		<span class="count"></span> <span class="count-all"></span>' +
					'		<a class="button plus">&plus;</a>' +
					'	</div>' +
					'</td>');
				
				this._itemMVCControllers.push(
					new tswlairmgr.core.components.ItemHTML(
						fragment,
						$(".fragment", cellNode)
					)
				);
				
				$(rowNode).append(cellNode);
			}
			
			$(table).append(rowNode);
		}
		
		$(this._el.fragmentsBlock.rootNode).append(table);
		
		$(this._el.self).append(this._el.fragmentsBlock.rootNode);
	};
	
	this._build_calculatedblock = function() {
		this._el.calculatedBlock.rootNode = $("<div />")
			.addClass("calculated");
		
		this._el.calculatedBlock.numberOfFullSetsLine = $("<div />")
			.addClass("count-format");
		this._el.calculatedBlock.numberOfMissingForNextLine = $("<div />")
			.addClass("missing-format");
		
		$(this._el.calculatedBlock.rootNode).append(this._el.calculatedBlock.numberOfFullSetsLine);
		$(this._el.calculatedBlock.rootNode).append(this._el.calculatedBlock.numberOfMissingForNextLine);
		
		$(this._el.self).append(this._el.calculatedBlock.rootNode);
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentCounts>: redraw called");
		
		this._redraw_namesblock();
		this._redraw_fragmentsblock();
		this._redraw_calculatedblock();
	};
	
	this._redraw_namesblock = function() {
		$(this._el.namesBlock.bossNameLine).text(this._boss.getName());
		$(this._el.namesBlock.missionNameLine).text(this._boss.getMissionName());
	};
	
	this._redraw_fragmentsblock = function() {
		/* Nothing to do directly in this view. ItemMVC redraws itself. */
	};
	
	this._redraw_calculatedblock = function() {
		var numberOfFullSets = Math.floor(Math.random()*10);/* TODO: get from model */
		
		var locString1 = this._localization.getLocalizationData().strings.bosstable.calculated.numberOfFullSets;
		locString1 = (numberOfFullSets == 1) ? locString1.singular : locString1.plural;
		
		$(this._el.calculatedBlock.numberOfFullSetsLine).html(
			Mustache.render(locString1, {
				localization: this._localization.getLocalizationData(),
				context: {
					count: Mustache.render(this._templates.calculatedBlock.numberOfFullSets.countFormat, { context: { number: numberOfFullSets } })
				}
			})
		);
		
		var numberOfMissingForNext = Math.floor(Math.random()*10);/* TODO: get from model */
		
		var locString2 = this._localization.getLocalizationData().strings.bosstable.calculated.numberOfMissingForNext;
		locString2 = (numberOfMissingForNext == 1) ? locString2.singular : locString2.plural;
		
		$(this._el.calculatedBlock.numberOfMissingForNextLine).html(
			Mustache.render(locString2, {
				localization: this._localization.getLocalizationData(),
				context: {
					count: Mustache.render(this._templates.calculatedBlock.numberOfMissingForNext.countFormat, { context: { number: numberOfMissingForNext } })
				}
			})
		);
	};
	
	var self = this;
	this._moduleLocalizationCallback = function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentControls>: got notified that module localization has changed.");
		self._redraw_calculatedblock();
	};
	
	this._dataLocalizationCallback = function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentControls>: got notified that data localization has changed.");
		self._redraw_namesblock();
		self._redraw_fragmentsblock();
	};
	
	this._fragmentCountsCallback = function(origin, context) {
		// TODO
	};
	
	this._willHaveCountsCallback = function(origin, context) {
		// TODO
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(this._dataLocalizationCallback);
		
		this._model.observables.fragmentCountsChanged.registerCallback(this._fragmentCountsCallback);
		this._model.observables.fragmentWillHaveCountBroadcast.registerCallback(this._willHaveCountsCallback);
	};
	
	this.destroy = function() {
		$.each(this._itemMVCControllers, function(index, controller) {
			controller.destroy();
		});
		
		this._localization.observables.moduleLocalizationChanged.unregisterCallback(this._moduleLocalizationCallback);
		tswlairmgr.core.data.observables.dataLocalizationChanged.unregisterCallback(this._dataLocalizationCallback);
		
		this._model.observables.fragmentCountsChanged.unregisterCallback(this._fragmentCountsCallback);
		this._model.observables.fragmentWillHaveCountBroadcast.unregisterCallback(this._willHaveCountsCallback);
	};
};