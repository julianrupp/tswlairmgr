var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.inventory = tswlairmgr.modules.inventory || {};

tswlairmgr.modules.inventory.viewFragmenttableLair = function inventoryViewFragmenttableLair(contentNode, modelInstance, lairInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	this._lair = lairInstance;
	
	this._bossfragmentcontrolsSubViews = [];
	
	this.observables = {
		fragmentCountPlusButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		fragmentCountMinusButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		head: {
			rootNode: null,
			zoneName: null,
			lairName: null
		},
		table: null
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttableLair>: build called");
		
		this._build_head();
		this._build_bosstable();
	};
	
	this._build_head = function() {
		this._el.head.rootNode = $(
			'<div class="lairHead">' +
			'	<span class="zoneName"></span>: '+
			'	<span class="lairName"></span>' +
			'</div>'
		);
		
		$(this._el.self).append(this._el.head.rootNode);
		this._el.head.zoneName = $(".zoneName", this._el.head.rootNode);
		this._el.head.lairName = $(".lairName", this._el.head.rootNode);
	};
	
	this._build_bosstable = function() {
		this._el.table = $("<div />")
			.addClass("lairBosses");
		
		var bosses = this._lair.getSortedBosses();
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
		
		this._build_bosstable_bossfragmentcontrols();
		
		$(this._el.self).append(this._el.table);
	};
	
	this._build_bosstable_bossfragmentcontrols = function() {
		var tc = $(this._el.table);
		var bosses = this._lair.getSortedBosses();
		
		var k = 0;
		var self = this;
		$(".innerContent", $("td.inner", $(tc))).each(function(index) {
			var contentNode = this;
			var boss = bosses[k];
			
			var bfcView = new tswlairmgr.modules.inventory.viewFragmenttableLairBossFragmentCounts(contentNode, self._model, boss, self._localization);
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
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttableLair>: redraw called");
		
		this._redraw_head();
	};
	
	this._redraw_head = function() {
		$(this._el.head.zoneName).html(this._lair.getZone().getName());
		$(this._el.head.lairName).html(this._lair.getName());
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.inventory.viewFragmenttableLair>: got notified that module localization has changed.");
			self._redraw();
		});
	};
};