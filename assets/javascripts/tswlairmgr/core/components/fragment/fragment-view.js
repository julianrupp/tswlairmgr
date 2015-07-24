var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.components = tswlairmgr.core.components || {};

tswlairmgr.core.components.FragmentHTMLView = function FragmentHTMLView(modelInstance, node) {
	this._model = modelInstance;
	
	this._node = node;
	
	var self = this;
	this._model.observables.nameChanged.registerCallback(function(origin, context) {
		console.log("<tswlairmgr.core.components.FragmentHTMLView>: got notified that fragment's name changed.");
		self.redraw();
	});
	
	this.redraw = function() {
		console.log("<tswlairmgr.core.components.FragmentHTMLView>: redraw called");
		var node = $(this._node);
		
		$(node).empty();
		
		var fragment = $(
			'<div class="item">' +
			'	<div class="icon">' +
			'		<div class="name">' +
			'			' +
			'		</div>' +
			'	</div>' +
			'</div>'
		);
		
		$(fragment)
			.addClass(this._model.getFragmentRarityCode())
			.addClass(this._model.getFragmentTypeCode());
		$(".icon", $(fragment))
			.addClass(this._model.getBossId())
			.addClass(this._model.getFragmentSetOrientationCode());
		$(".name", $(fragment))
			.text(this._model.getFragmentName());
		
		$(node).append(fragment);
	};
	
	this.redraw();
};