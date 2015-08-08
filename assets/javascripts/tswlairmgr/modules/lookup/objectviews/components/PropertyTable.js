var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.lookup = tswlairmgr.modules.lookup || {};
tswlairmgr.modules.lookup.objectviews = tswlairmgr.modules.lookup.objectviews || {};
tswlairmgr.modules.lookup.objectviews.components = tswlairmgr.modules.lookup.objectviews.components || {};

tswlairmgr.modules.lookup.objectviews.components.PropertyTable = function lookupObjectviewComponentPropertyTable(contentNode, properties, localization) {
	this._properties = properties;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	this._subViews = [];
	
	this._el = {
		self: contentNode,
		table: null
	};
	
	this._templates = {
		"RegionalFragment_Boss": '{{context.bossName}}',
		"RegionalFragment_Region": '{{context.regionName}}',
		"RegionalBoss_Name": '{{context.bossName}}',
		"RegionalBoss_SummoningLair": '{{context.lairName}} ({{context.zoneName}})'
	};
	
	this._build = function() {
		$(this._el.self).empty();
		
		var box = $("<div />")
			.addClass("propertyTable");
		
		this._el.table = $("<table />")
			.addClass("properties");
		$(box).append(this._el.table);
		
		$(this._el.self).append(box);
	};
	
	this._redraw = function() {
		$(this._el.table).empty();
		var self = this;
		$.each(this._properties, function(index, compound) {
			var title = "";
			var text = "";
			var link = null;
			
			switch(compound.type)
			{
				case "RegionalFragment_Boss":
					title = Mustache.render(
						self._localization.getLocalizationData().strings.objectviewComponents.propertyTable.regionalfragment.boss,
						{
							localization: self._localization.getLocalizationData(),
							context: {}
						}
					);
					text = Mustache.render(
						self._templates[compound.type],
						{
							localization: self._localization.getLocalizationData(),
							context: {
								bossName: compound.object.getName()
							}
						}
					);
					link = compound.object;
				break;
				case "RegionalFragment_Region":
					title = Mustache.render(
						self._localization.getLocalizationData().strings.objectviewComponents.propertyTable.regionalfragment.region,
						{
							localization: self._localization.getLocalizationData(),
							context: {}
						}
					);
					text = Mustache.render(
						self._templates[compound.type],
						{
							localization: self._localization.getLocalizationData(),
							context: {
								regionName: compound.object.getName()
							}
						}
					);
				break;
				case "RegionalBoss_Name":
					title = Mustache.render(
						self._localization.getLocalizationData().strings.objectviewComponents.propertyTable.regionalboss.name,
						{
							localization: self._localization.getLocalizationData(),
							context: {}
						}
					);
					text = Mustache.render(
						self._templates[compound.type],
						{
							localization: self._localization.getLocalizationData(),
							context: {
								bossName: compound.object.getName()
							}
						}
					);
				break;
				case "RegionalBoss_SummoningLair":
					title = Mustache.render(
						self._localization.getLocalizationData().strings.objectviewComponents.propertyTable.regionalboss.summoningLair,
						{
							localization: self._localization.getLocalizationData(),
							context: {}
						}
					);
					text = Mustache.render(
						self._templates[compound.type],
						{
							localization: self._localization.getLocalizationData(),
							context: {
								lairName: compound.object.getName(),
								zoneName: compound.object.getZone().getName()
							}
						}
					);
				break;
				default:
					// Should never reach here
				break;
			}
			
			var rowNode = $("<tr />");
			
			var titleNode = $("<td />")
				.addClass("title")
				.html(title);
			
			var textNode = $("<td />")
				.addClass("text")
				.append(
					$("<div />")
						.addClass("container")
						.append(text)
				);
			
			if(link !== null)
			{
				$(textNode).click(function() {
					tswlairmgr.modules.lookup.controller.setSelectedObject(link);
				});
				$(textNode).addClass("clickable");
			}
			
			$(rowNode).append(titleNode);
			$(rowNode).append(textNode);
			
			$(self._el.table).append(rowNode);
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