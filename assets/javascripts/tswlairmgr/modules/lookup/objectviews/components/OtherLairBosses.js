var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};
tswlairmgr.modules.lookup.objectviews.components = tswlairmgr.modules.lookup.objectviews.components || {};

tswlairmgr.modules.lookup.objectviews.components.OtherLairBosses = function lookupObjectviewComponentOtherLairBosses(contentNode, lair, thisBoss, localization) {
	this._lair = lair;
	this._thisBoss = thisBoss;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	this._subViews = [];
	
	this._el = {
		self: contentNode,
		title: null,
		table: null
	};
	
	this._templates = {
		titleLine: '{{context.bossName}}',
		subTitleLine: '{{context.bossMissionName}}'
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		var box = $("<div />")
			.addClass("otherLairBosses");
		
		this._el.title = $("<div />")
			.addClass("componentTitle");
		$(box).append(this._el.title);
		
		this._el.table = $("<table />")
			.addClass("bosstable");
		$(box).append(this._el.table);
		
		$(this._el.self).append(box);
	};
	
	this._redraw = function() {
		$(this._el.title).text(
			this._localization.getLocalizationData().strings.objectviewComponents.otherLairBosses.title
		);
		
		$(this._el.table).empty();
		var self = this;
		$.each(this._lair.getSortedBosses(), function(index, boss) {
			if(boss !== self._thisBoss)
			{
				var titleLine = Mustache.render(
					self._templates.titleLine,
					{
						localization: self._localization.getLocalizationData(),
						context: {
							bossName: boss.getName()
						}
					}
				);
				var subTitleLine = Mustache.render(
					self._templates.subTitleLine,
					{
						localization: self._localization.getLocalizationData(),
						context: {
							bossMissionName: boss.getMissionName()
						}
					}
				);
			
				var rowNode = $("<tr />");
			
				var iconNode = $("<div />");
			
				var leftNode = $("<td />")
					.addClass("icon")
					.append(iconNode);
			
				self._itemMVCControllers.push(
					new tswlairmgr.core.components.ItemHTML(
						boss,
						iconNode,
						{ isSmall: true }
					)
				);
			
				var rightNode = $("<td />")
					.addClass("titles")
					.append(
						$("<div />")
							.addClass("title")
							.append(titleLine)
					)
					.append(
						$("<div />")
							.addClass("subTitle")
							.append(subTitleLine)
					);
			
				$(rowNode).click(function() {
					tswlairmgr.modules.lookup.controller.setSelectedObject(boss);
				});
				$(rowNode).addClass("clickable");
			
				$(rowNode).append(leftNode);
				$(rowNode).append(rightNode);
			
				$(self._el.table).append(rowNode);
			}
		});
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