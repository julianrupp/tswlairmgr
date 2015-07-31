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
			bossNameLine: null,
			missionNameLine: null,
		},
		fragmentsBlock: {},
		calculatedBlock: {
			numberOfFullSetsLine: null,
			numberOfFragmentsMissingLine: null
		}
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentControls>: build called");
		
		this._build_namesblock();
		this._build_fragmentsblock();
		this._build_calculatedblock();
	};
	
	this._build_namesblock = function() {
		// TODO
		
/*		<div class="uibox boss-title center">
			<div class="name">Cta-Tha</div>
			<div class="mission">Unto the Beach</div>
		</div>*/
	};
	
	this._build_fragmentsblock = function() {
		// TODO
		
/*		<table class="uibox boss-fragments" border="0">
			<tbody>
				<tr>
					<td class="boss-fragment low-mark">
						<div class="item rare lairfragment">
							<div class="icon km01 nw">
								<div class="name">Theta 04</div>
							</div>
						</div>
						<div class="bossfragment-controls">
							<a class="button minus">−</a>
							<span class="count">0</span> <span class="count-all">0</span>
							<a class="button plus">+</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>*/
	};
	
	this._build_calculatedblock = function() {
		// TODO
		
/*		<div class="uibox boss-counts center">
			<div class="count-format">
				<span class="count">0</span> <span class="subject">Summoning Rituals</span>
			</div>
			<div class="missing-format">
				(<span class="count">9</span> more <span class="subject">fragments</span> for another)
			</div>
		</div>*/
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentCounts>: redraw called");
		
		this._redraw_namesblock();
		this._redraw_fragmentsblock();
		this._redraw_calculatedblock();
	};
	
	this._redraw_namesblock = function() {
		// TODO
		
		$(this._el.self).empty();
		$(this._el.self).append(
			$('<div style="font-size: 18px;" />').text(this._boss.getName())
		);
		$(this._el.self).append(
			$('<div style="color: #e0e0e0;" />').text(this._boss.getMissionName())
		);
	};
	
	this._redraw_fragmentsblock = function() {
		// TODO
	};
	
	this._redraw_calculatedblock = function() {
		// TODO
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentControls>: got notified that module localization has changed.");
			self._redraw_calculatedblock();
		});
		tswlairmgr.core.data.observables.dataLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewBosstableBossFragmentControls>: got notified that data localization has changed.");
			self._redraw_namesblock();
			self._redraw_fragmentsblock();
		});
	};
};