var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewBosstable = function organizerViewBosstable(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._bossfragmentcontrolsSubViews = [];
	
	this.observables = {
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		table: null
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstable>: build called");
		
		this._build_bosstable();
	};
	
	this._build_bosstable = function() {
		this._el.table = $("<div />");
		
		$(this._el.self).append(this._el.table);
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstable>: redraw called");
		
		this._redraw_bosstable();
	};
	
	this._redraw_bosstable = function() {
		$(this._el.table).empty();
		
		var lair = this._model.getSelectedLair();
		//if(!lair){ return; }
		
		var bosses = lair.getSortedBosses();
		var i = bosses.length;
		
		var lineNode, lineNodeHTML = '<table><tbody><tr></tr></tbody></table>';
		var columnNodeHTML = '<td class="inner"><div class="innerContent"></div></td>';
		var paddingNodeHTML = '<td class="pad" />';
		
		while(i > 0)
		{
			lineNode = $(lineNodeHTML);
			
			if(i >= 3)
			{
				$(lineNode).addClass("three");
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				i -= 3;
			}
			else if(i >= 2)
			{
				$(lineNode).addClass("two");
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				i -= 2;
			}
			else if(i >= 1)
			{
				$(lineNode).addClass("one");
				$("tr", lineNode).append(paddingNodeHTML);
				$("tr", lineNode).append(columnNodeHTML);
				$("tr", lineNode).append(paddingNodeHTML);
				i -= 1;
			}
			
			$(this._el.table).append(lineNode);
		}
		
		this._redraw_bosstable_bossfragmentcontrols();
	};
	
	this._redraw_bosstable_bossfragmentcontrols = function() {
		$.each(this._bossfragmentcontrolsSubViews, function(index, view) {
			view.destroy();
		});
		this._bossfragmentcontrolsSubViews = [];
		
		var tc = $(this._el.table);
		var lair = this._model.getSelectedLair();
		//if(!lair){ return; }
		var bosses = lair.getSortedBosses();
		
		var k = 0;
		var self = this;
		$(".innerContent", $("td.inner", $(tc))).each(function(index) {
			var contentNode = this;
			var boss = bosses[k];
			
			var bfcView = new tswlairmgr.modules.organizer.viewBosstableBossFragmentCounts(contentNode, self._model, boss, self._localization);
			bfcView._init();
			
			bfcView.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
				self.observables.fragmentCountPlusButtonClicked.notify(context);
			});
			bfcView.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
				self.observables.fragmentCountMinusButtonClicked.notify(context);
			});
			
			self._bossfragmentcontrolsSubViews.push(bfcView);
			k++;
		});
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		/* TODO: Move to boss fragment controls sub-views
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstable>: got notified that module localization has changed.");
			self._redraw();
		});
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstable>: got notified that data localization has changed.");
			self._redraw();
		});*/
		
		/*TEMP START*/
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstable>: got notified that data localization has changed.");
			self._redraw();
		});
		/*TEMP END*/
		
		this._model.observables.selectedLairChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstable>: got notified that selected lair has changed.");
			
			self._redraw_bosstable();
		});
	};
};