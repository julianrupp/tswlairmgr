var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewPicktableParticipantRow = function organizerViewPicktableParticipantRow(contentNode, modelInstance, participantInstance, localization) {
	this._model = modelInstance;
	this._participant = participantInstance;
	this._localization = localization;
	
	this._itemMVCControllers = [];
	
	this.observables = {
		participantMissionAvailabilityToggleClicked: new tswlairmgr.core.helpers.Observable(this),
		participantRemoveButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		name: null,
		missions: [],
		actions: {
			rootNode: null,
			remove: null
		}
	};
	
	this._templates = {
		skipAssignmentDisplay:
			'<div class="skip">' +
			'	<div class="symbol">' +
			'		&times;' +
			'	</div>' +
			'	<div class="text">' +
			'		{{localization.strings.picktable.table.skipLabel}}' +
			'	</div>' +
			'</div>'
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktableParticipantRow>: build called");
		$(this._el.self).empty();
		
		// TODO
		
		this._el.name = $('<td class="name" />')
			.text(this._participant.getName())
			.addClass();
		$(this._el.self).append(this._el.name);
		
		var fragmentCols = '';
		for(var i=0; i<this._model._selectedLair.getSortedBosses().length; i++)
		{
			this._el.missions[i] = $('<td class="fragment" />');
			$(this._el.self).append(this._el.missions[i]);
		}
		
		this._el.actions.rootNode = $('<td class="actions" />');
		
		var self = this;
		this._el.actions.remove = $('<input type="button" class="icon remove" />')
			.click(function() {
				self.observables.participantRemoveButtonClicked.notify({
					participantInstance: self._participant
				});
			});
		
		$(this._el.actions.rootNode).append(this._el.actions.remove)
		$(this._el.self).append(this._el.actions.rootNode);
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktableParticipantRow>: redraw called");
		
		$(this._el.actions.remove).val(
			Mustache.render(this._localization.getLocalizationData().strings.picktable.table.actions.remove, {
				localization: this._localization.getLocalizationData(),
				context: {}
			})
		);
		
		for(var i=0; i<this._model._selectedLair.getSortedBosses().length; i++)
		{
			var boss = this._model._selectedLair.getSortedBosses()[i];
			var assignedFragment = this._model.assignmentStrategy.getAssignedFragmentForParticipantAndMission(this._participant, boss);
			
			// TODO
		}
	};
	
	var self = this;
	this._moduleLocalizationCallback = function(origin, context) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktableParticipantRow>: got notified that module localization has changed.");
		self._redraw();
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(this._moduleLocalizationCallback);
	};
	
	this.destroy = function() {
		$.each(this._itemMVCControllers, function(index, controller) {
			controller.destroy();
		});
		
		this._localization.observables.moduleLocalizationChanged.unregisterCallback(this._moduleLocalizationCallback);
	};
};