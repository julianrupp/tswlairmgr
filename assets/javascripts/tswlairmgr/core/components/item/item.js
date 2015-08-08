var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.components = tswlairmgr.core.components || {};

tswlairmgr.core.components.ItemHTML = function ItemHTML(dataInstance, node, options) {
	this._model = new tswlairmgr.core.components.ItemHTMLModel(dataInstance);
	this._view = new tswlairmgr.core.components.ItemHTMLView(this._model, node, options);
	
	this.destroy = function() {
		this._model.destroy();
		delete this._model;
		this._view.destroy();
		delete this._view;
	};
};