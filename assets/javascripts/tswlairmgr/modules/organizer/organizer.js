var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.controller = new function() {
	this.id = "organizer";
	
	this._model = new tswlairmgr.modules.organizer.model();
	this._view = null;
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: initWithRootNode: initializing...");
		
		this._view = new tswlairmgr.modules.organizer.view(contentNode, this._model, this._localization);
		this._view._init();
		
		this._init();
		
		this._model.observables.selectedLairChanged.notify({});
		
		var self = this;
		$.each(this._model.observables, function(observableName, observable) {
			observable.registerCallback(function() {
				self._updatePersistentState();
			});
		});
		
		var self = this;
		tswlairmgr.core.persistentstate.observables.hashLoaded.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified by system that persistent state was loaded");
			self._loadPersistentState(tswlairmgr.core.persistentstate.getModuleState(self));
		});
	};
	
	this.becameActive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that module became active.");
		
		this._view.becameActive();
	};
	
	this.becameInactive = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that module became inactive.");
		
		this._view.becameInactive();
	};
	
	this._loadPersistentState = function(state) {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: loadPersistentState =");
		if(tswlairmgr.core.config.debug) console.log(state);
		if(state)
		{
			this._model.setPersistentState(state);
		}
		this._updatePersistentState();
	};
	
	this._updatePersistentState = function() {
		tswlairmgr.core.persistentstate.updateModuleState(this, this._model.getPersistentState());
	};
	
	this._init = function() {
		var self = this;
		
		this._model.observables.selectedLairChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that selected lair has changed.");
			self._view.observables.appBackgroundShouldChange.notify({});
		});
		
		this._view.observables.appBackgroundShouldChange.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that app background should change.");
			var lair = self._model.getSelectedLair();
			self._view._appBackground["background"] = "#808080 url(assets/images/lair/"+lair.getId()+".jpg) no-repeat fixed center";
			if(tswlairmgr.modules.getActiveModuleId() == self.id)
			{
				self._view._refreshBackground();
			}
		});
		
		this._view.observables.lairselectorDropdownChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that lair selector dropdown selection has changed.");
			self._model.setSelectedLair(context.newLairInstance);
		});
		
		this._view.observables.fragmentCountPlusButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that a fragment count plus button was clicked.");
			self._model.incrementCountForFragment(context.fragment);
		});
		
		this._view.observables.fragmentCountMinusButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that a fragment count minus button was clicked.");
			self._model.decrementCountForFragment(context.fragment);
		});
		
		this._view.observables.participantAddButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that the participant add button was clicked.");
			
			if($.trim(context.nameFieldContents).length > 0)
			{
				var newParticipant = new tswlairmgr.modules.organizer.classes.Participant(context.nameFieldContents);
				if(newParticipant.isValidName(context.nameFieldContents) &&
					self._model._participants.addParticipant(newParticipant))
				{
					self._view._subViews.picktable.clearParticipantNameField();
					self._view._subViews.picktable.refocusParticipantNameField();
				}
				else
				{
					alert(self._localization.getLocalizationData().strings.picktable.addFailedInfoText);
				}
			}
		});
		
		this._view.observables.participantRemoveButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that a participant remove button was clicked.");
			self._model._participants.removeParticipant(context.participantInstance);
		});
		
		this._view.observables.participantImportButtonClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that the participant import button was clicked.");
			
			if(self._view._subViews.picktable.importBoxIsOpen())
			{
				self._view._subViews.picktable.closeImportBox();
			}
			else
			{
				self._view._subViews.picktable.openImportBoxAndFocus();
			}
		});
		
		this._view.observables.participantImportChatLogPasted.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that data has been pasted into the participant import text field.");
			var parsedNames = tswlairmgr.modules.organizer.classes.ChatLogNameParser.getCharacterNamesFromChatLogExcerpt(context.data);
			var countAdded = 0;
			$.each(parsedNames, function(index, name) {
				var newParticipant = new tswlairmgr.modules.organizer.classes.Participant(name);
				if(newParticipant.isValidName(name))
				{
					if(self._model._participants.addParticipant(newParticipant))
					{
						countAdded++;
					}
				}
			});
			var message = self._localization.getLocalizationData().strings.picktable.importFromChatLog.participantsAddedMessage;
			var renderedMessage = Mustache.render( ((countAdded == 1) ? message.singular : message.plural), {
				localization: self._localization.getLocalizationData(),
				context: {
					numberOfAddedParticipants: countAdded
				}
			})
			alert(renderedMessage);
		});
		
		this._view.observables.participantMissionAvailabilityToggleClicked.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.controller>: got notified that a participant's mission availability toggle was clicked.");
			context.participant.toggleCanTurnInMissionForBoss(context.boss);
		});
		
		// TODO: Hook up other interface action observables
	};
	
	tswlairmgr.modules.registerModule(this);
};