var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.components = tswlairmgr.core.components || {};

tswlairmgr.core.components.FragmentHTML = function FragmentHTML(fragmentInstance, node, isSmall) {
	this._model = new tswlairmgr.core.components.FragmentHTMLModel(fragmentInstance);
	this._view = new tswlairmgr.core.components.FragmentHTMLView(this._model, node, isSmall);
};