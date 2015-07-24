var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.components = tswlairmgr.core.components || {};

tswlairmgr.core.components.ItemHTMLView = function ItemHTMLView(modelInstance, node, options) {
	this._model = modelInstance;
	
	this._node = node;
	this._options = options;
	
	var self = this;
	this._model.observables.changed.registerCallback(function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.components.ItemHTMLView>: got notified that data changed.");
		self.redraw();
	});
	
	this.redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.core.components.ItemHTMLView>: redraw called");
		var node = $(this._node);
		
		$(node).empty();
		
		var item = $(
			'<div class="item">' +
			'	<div class="icon">' +
			'		<div class="name">' +
			'			' +
			'		</div>' +
			'	</div>' +
			'</div>'
		);
		
		$(item)
			.addClass(this._model.getItemCssClasses().join(" "))
			.attr("title", this._model.getName());
		$(".icon", $(item))
			.addClass(this._model.getIconCssClasses().join(" "));
		$(".name", $(item))
			.text(this._model.getLabel());
		
		if(this._options.isSmall) { $(item).addClass("small"); }
		
		$(node).append(item);
	};
	
	this.redraw();
};