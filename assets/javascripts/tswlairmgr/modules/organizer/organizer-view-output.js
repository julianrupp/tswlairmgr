var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};

tswlairmgr.modules.organizer.viewOutput = function organizerViewOutput(contentNode, modelInstance, localization) {
	this._model = modelInstance;
	this._localization = localization;
	
	this.observables = {
		outputDataLocalizationButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		outputOrderStyleButtonClicked: new tswlairmgr.core.helpers.Observable(this),
		outputGenerateButtonClicked: new tswlairmgr.core.helpers.Observable(this)
	};
	
	this._el = {
		self: contentNode,
		componentBoxInner: null,
		title: null,
		chatScriptLocalization: null,
		orderStyle: null,
		infoTextUpper: null,
		downloadButton: null,
		infoTextLowerToggle: null,
		infoTextLower: null
	};
	
	this._templates = {
		technicalFormat: '<span class="technical">{{context.text}}</span>',
		groupChannelNameFormat: '<span class="emphasis" style="color: #4169e1;">{{context.text}}</span>',
		raidChannelNameFormat: '<span class="emphasis" style="color: #a0522d;">{{context.text}}</span>',
		sayChannelNameFormat: '<span class="emphasis" style="color: #c0c0c0;">{{context.text}}</span>'
	};
	
	this.scriptsFolder = "Scripts";
	this.fileName = "tswlairmgr";
	this.chatChannelBrackets = "[ ]";
	this.scriptCommand = "/"+this.fileName;
	
	this._build = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewOutput>: build called");
		
		var componentBlock = $(
			'<div class="componentBox">' +
			'	<div class="componentBoxInner">' +
			'	</div>' +
			'</div>'
		);
		
		$(this._el.self).append(componentBlock);
		
		this._el.componentBoxInner = $(".componentBoxInner", this._el.self);
		
		var struct = $(
			'<table class="componentHead">' +
			'	<tbody>' +
			'		<tr>' +
			'			<td class="left">' +
			'				<div class="componentTitle"></div>' +
			'			</td>' +
			'			<td class="right">' +
			'				<div class="chatScriptLocalization"></div>' +
			'				<div class="orderStyle"></div>' +
			'			</td>' +
			'		</tr>' +
			'	</tbody>' +
			'</table>' +
			'<div class="infoTextUpper"></div>' +
			'<input type="button" class="downloadButton" />' +
			'<div class="infoTextLowerToggle"></div>' +
			'<div class="infoTextLower"></div>'
		);
		
		$(this._el.componentBoxInner).append(struct);
		
		this._el.title = $(".componentTitle", this._el.self);
		this._el.chatScriptLocalization = $(".chatScriptLocalization", this._el.self);
		this._el.orderStyle = $(".orderStyle", this._el.self);
		this._el.infoTextUpper = $(".infoTextUpper", this._el.self);
		
		this._el.downloadButton = $(".downloadButton", this._el.self);
		var self = this;
		$(this._el.downloadButton).click(function() {
			self.observables.outputGenerateButtonClicked.notify({});
		});
		
		this._el.infoTextLowerToggle = $(".infoTextLowerToggle", this._el.self);
		$(this._el.infoTextLowerToggle).click(function() {
			if($(self._el.infoTextLower).is(":visible"))
			{
				$(self._el.infoTextLower).hide();
				$(self._el.infoTextLowerToggle).text(self._localization.getLocalizationData().strings.output.infoTextLower.showLabel);
			}
			else
			{
				$(self._el.infoTextLower).show();
				$(self._el.infoTextLowerToggle).text(self._localization.getLocalizationData().strings.output.infoTextLower.hideLabel);
			}
		})
		this._el.infoTextLower = $(".infoTextLower", this._el.self);
		$(this._el.infoTextLower).hide();
	};
	
	this._redraw = function() {
		if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewOutput>: redraw called");
		
		$(this._el.title).text(
			this._localization.getLocalizationData().strings.output.title
		);
		
		this._redraw_csl();
		this._redraw_csos();
		
		$(this._el.infoTextUpper).html(
			this._localization.getLocalizationData().strings.output.infoTextUpper
		);
		
		$(this._el.downloadButton).val(
			this._localization.getLocalizationData().strings.output.downloadButtonLabel
		);
		
		if($(this._el.infoTextLower).is(":visible"))
		{
			$(this._el.infoTextLowerToggle).text(this._localization.getLocalizationData().strings.output.infoTextLower.hideLabel);
		}
		else
		{
			$(this._el.infoTextLowerToggle).text(this._localization.getLocalizationData().strings.output.infoTextLower.showLabel);
		}
		
		var renderedScriptsFolder = Mustache.render(this._templates.technicalFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this.scriptsFolder
			}
		});
		var renderedFileName = Mustache.render(this._templates.technicalFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this.fileName
			}
		});
		var renderedChatChannelBrackets = Mustache.render(this._templates.technicalFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this.chatChannelBrackets
			}
		});
		
		var renderedGroupChannelName = Mustache.render(this._templates.groupChannelNameFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this._localization.getLocalizationData().strings.output.infoTextLower.groupChannelName
			}
		});
		var renderedRaidChannelName = Mustache.render(this._templates.raidChannelNameFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this._localization.getLocalizationData().strings.output.infoTextLower.raidChannelName
			}
		});
		var renderedSayChannelName = Mustache.render(this._templates.sayChannelNameFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this._localization.getLocalizationData().strings.output.infoTextLower.sayChannelName
			}
		});
		
		var renderedScriptCommand = Mustache.render(this._templates.technicalFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this.scriptCommand
			}
		});
		var renderedEnterButtonName = Mustache.render(this._templates.technicalFormat, {
			localization: this._localization.getLocalizationData(),
			context: {
				text: this._localization.getLocalizationData().strings.output.infoTextLower.enterButtonName
			}
		});
		
		$(this._el.infoTextLower).html(
			Mustache.render(this._localization.getLocalizationData().strings.output.infoTextLower.text, {
				localization: this._localization.getLocalizationData(),
				context: {
					scriptsFolder: renderedScriptsFolder,
					fileName: renderedFileName,
					chatChannelBrackets: renderedChatChannelBrackets,
					groupChannel: renderedGroupChannelName,
					raidChannel: renderedRaidChannelName,
					sayChannel: renderedSayChannelName,
					scriptCommand: renderedScriptCommand,
					enterButton: renderedEnterButtonName
				}
			})
		);
	};
	
	this._redraw_csl = function() {
		$(this._el.chatScriptLocalization).empty();
		
		var self = this;
		$.each(tswlairmgr.modules.getAllLocalizationIds(), function(index, id) {
			var meta = tswlairmgr.modules.getAllLocalizationsMeta()[id];
			var isActive = (self._model._selectedChatScriptLocalizationId === id) ? true : false;

			var button = $(
				'<div class="localizationContainer">' +
				'	<img class="localizationImage" />' +
				'</div>'
			)
			.click(function() {
				self.observables.outputDataLocalizationButtonClicked.notify({
					localizationId: id
				});
			});

			if(isActive)
			{
				$(button).addClass("active");
			}

			$(".localizationImage", button)
				.attr("src", "assets/images/localization/"+id+".png")
				.attr("title", meta.localName)
				.attr("alt", meta.localName);

			$(self._el.chatScriptLocalization).append(button);
		});
	};
	
	this._redraw_csos = function() {
		$(this._el.orderStyle).empty();
		
		var orderStyles = [
			{
				code: tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum.o.BY_PARTICIPANT,
				label: this._localization.getLocalizationData().strings.output.sortingStylesButtonLabels.byParticipant,
				id: "Participant",
				icon: "participant"
			},
			{
				code: tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum.o.BY_MISSION,
				label: this._localization.getLocalizationData().strings.output.sortingStylesButtonLabels.byBossMission,
				id: "Mission",
				icon: "boss"
			}
		];
		
		var self = this;
		$.each(orderStyles, function(index, styleCompound) {
			var button = $('<input type="button" class="icon" />')
				.attr("id", "button"+styleCompound.id)
				.addClass(styleCompound.icon)
				.val(styleCompound.label);
			if(styleCompound.code === self._model._selectedChatScriptOrderStyle)
			{
				$(button).addClass("active");
			}
			$(button).click(function() {
				self.observables.outputOrderStyleButtonClicked.notify({
					orderStyleCode: styleCompound.code
				});
			});
			
			$(self._el.orderStyle).append(button);
		});
	};
	
	this._init = function() {
		this._build();
		this._redraw();
		
		var self = this;
		
		this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewOutput>: got notified that module localization has changed.");
			self._redraw();
		});
		
		this._model.observables.selectedChatScriptLocalizationIdChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewOutput>: got notified that selected chat script data localization has changed.");
			self._redraw_csl();
		});
		
		this._model.observables.selectedChatScriptOrderStyleChanged.registerCallback(function(origin, context) {
			if(tswlairmgr.core.config.debug) console.log("<tswlairmgr.modules.organizer.viewOutput>: got notified that selected chat script ordering style has changed.");
			self._redraw_csos();
		});
	};
};