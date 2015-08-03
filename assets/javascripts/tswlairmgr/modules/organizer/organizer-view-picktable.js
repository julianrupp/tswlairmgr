var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewPicktable = function organizerViewPicktable(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this._participantrowSubViews = [];
	
	this.observables = {
		participantAddButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantImportButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		participantMissionAvailabilityToggleClicked: new tswlairmgr.core.helpers.Observable(this),
		participantRemoveButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		componentBoxInner: null,
		title: null,
		participantcount: null,
		participantEntry: {
			importButton: null,
			nameField: null,
			addButton: null
		},
		info: null,
		table: null
	};
	
	this._templates = {
		participantCountFormat: '<span class="number">{{context.number}}</span>'
	};
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktable>: build called");
		
		var componentBlock = $(
			'<div class="componentBox">' +
			'	<div class="componentBoxInner">' +
			'	</div>' +
			'</div>'
		);
		
		$(this._el.self).append(componentBlock);
		
		this._el.componentBoxInner = $(".componentBoxInner", this._el.self);
		
		this._build_top();
		this._build_picktable();
	};
	
	this._build_top = function() {
		var top = $(
			'<table class="componentHead">' +
			'	<tbody>' +
			'		<tr>' +
			'			<td class="left">' +
			'				<div class="componentTitle"></div>' +
			'				<div class="numParticipants">' +
			'				</div>' +
			'			</td>' +
			'			<td class="right">' +
			'				<input type="button" id="buttonImport" class="icon import" />' +
			'				<input type="text" id="inputName" class="participantNameInput" value="" />' +
			'				<input type="button" id="buttonAdd" class="icon add" />' +
			'			</td>' +
			'		</tr>' +
			'	</tbody>' +
			'</table>' +
			'<div class="infoText"></div>'
		);
		
		$(this._el.componentBoxInner).append(top);
		
		this._el.title = $(".componentTitle", this._el.self);
		this._el.participantcount = $(".numParticipants", this._el.self);
		this._el.info = $(".infoText", this._el.self);
		
		this._el.participantEntry.importButton = $("#buttonImport", this._el.self);
		this._el.participantEntry.nameField = $("#inputName", this._el.self);
		this._el.participantEntry.addButton = $("#buttonAdd", this._el.self);
		
		var self = this;
		$(this._el.participantEntry.importButton).click(function() {
			self.observables.participantImportButtonClicked.notify({});
		});
		
		$(this._el.participantEntry.addButton).click(function() {
			self.observables.participantAddButtonClicked.notify({
				nameFieldContents: self._el.participantEntry.nameField.val()
			});
		});
		
		$(this._el.participantEntry.nameField).keypress(function(event) {
			if(event.keyCode === 13)
			{
				$(self._el.participantEntry.addButton).click();
			}
		});
	};
	
	this._build_picktable = function() {
		this._el.table = $(
			'<table class="table picktable">' +
			'</table>'
		);
		
		$(this._el.componentBoxInner).append(this._el.table);
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktable>: redraw called");
		
		this._redraw_top();
		this._redraw_picktable();
	};
	
	this._redraw_top = function() {
		$(this._el.title).text(
			this._localization.getLocalizationData().strings.picktable.title
		);
		
		var numParticipants = this._model._participants.getParticipants().length;
		var string = this._localization.getLocalizationData().strings.picktable.numberOfParticipants;
		this._el.participantcount.html(
			Mustache.render( ((numParticipants == 1) ? string.singular : string.plural), {
				localization: this._localization.getLocalizationData(),
				context: {
					count: Mustache.render(this._templates.participantCountFormat, { context: { number: numParticipants } })
				}
			})
		);
		
		$(this._el.participantEntry.importButton).val(
			this._localization.getLocalizationData().strings.picktable.importButtonLabel
		);
		$(this._el.participantEntry.addButton).val(
			this._localization.getLocalizationData().strings.picktable.addButtonLabel
		);
		
		$(this._el.info).html(
			this._localization.getLocalizationData().strings.picktable.infoText
		);
	};
	
	this._redraw_picktable = function() {
		$.each(this._participantrowSubViews, function(index, view) {
			view.destroy();
		});
		this._participantrowSubViews = [];
		
		var fragmentCols = '';
		for(var i=0; i<this._model._selectedLair.getSortedBosses().length; i++)
		{
			fragmentCols += 
				'			<th class="fragment">' +
				'			</th>';
		}
		
		var initialRows = $(
			'	<thead>' +
			'		<tr>' +
			'			<th class="name">' +
			'				'+this._localization.getLocalizationData().strings.picktable.table.headings.name +
			'			</th>' +
			fragmentCols +
			'			<th class="actions">' +
			'				'+this._localization.getLocalizationData().strings.picktable.table.headings.actions +
			'			</th>' +
			'		</tr>' +
			'	</thead>' +
			'	<tbody>' +
			'	</tbody>'
		);
		
		$(this._el.table).empty();
		$(this._el.table).append(initialRows);
		
		var insertNode = $("tbody", this._el.table);
		
		var pList = this._model._participants.getParticipants();
		var self = this;
		$.each(pList, function(index, participant) {
			var rowNode = $('<tr />');
			
			var rowView = new tswlairmgr.modules.organizer.viewPicktableParticipantRow(
				rowNode,
				self._model,
				participant,
				self._localization
			);
			rowView._init();
			
			rowView.observables.participantMissionAvailabilityToggleClicked.registerCallback(function(origin, context) {
				self.observables.participantMissionAvailabilityToggleClicked.notify(context);
			});
			rowView.observables.participantRemoveButtonClicked.registerCallback(function(origin, context) {
				self.observables.participantRemoveButtonClicked.notify(context);
			});
			
			self._participantrowSubViews.push(rowView);
			
			$(insertNode).append(rowNode);
		});
	};
	
	this.clearParticipantNameField = function() {
		$(this._el.participantEntry.nameField).val("");
	};
	
	this.refocusParticipantNameField = function() {
		$(this._el.participantEntry.nameField).focus();
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktable>: got notified that module localization has changed.");
			self._redraw();
		});
		
		this._model.observables.participantsChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewPicktable>: got notified that participants have changed.");
			self._redraw();
		});
	};
};