var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ChatScriptGenerator = function ChatScriptGenerator(model, localization) {
	this._model = model;
	this._localization = localization;
	
	this.projectURL = "http://github.com/julianrupp/tswlairmgr";
	this.forumThreadURL = "http://forums.thesecretworld.com/showthread.php?84221-Webapp-TSW-Lair-Manager";
	
	this._styles = {
		title: {
			fontface: "HUGE",
			color: "#ffcc00"
		},
		help: {
			fontface: "LARGE",
			color: "#e97f0d"
		},
		assignment: {
			fontface: "LARGE",
			color: "#c0c0c0"
		},
		mission: {
			fontface: "LARGE_BOLD",
			color: "#ffffff"
		},
		participant: {
			fontface: "LARGE_BOLD"
			// Color from external source
		},
		fragment: {
			fontface: "LARGE_BOLD",
			color: "#02b6ff"
		},
		generator: {
			fontface: "LARGE",
			color: "#ffcc00"
		}
	};
	
	this._templates = {
		
	};
	
	this.generate = function() {
		var preLines;
		var contentLines;
		var postLines;
		
		var moduleLocalizationId;
		if($.inArray(this._model._selectedChatScriptLocalizationId, this._localization.getAllLocalizationIds()) === -1)
		{
			moduleLocalizationId = this._localization.getDefaultLocalizationId();
		}
		else
		{
			moduleLocalizationId = this._model._selectedChatScriptLocalizationId;
		}
		
		var self = this;
		self._localization.executeWithDifferentLocalization(moduleLocalizationId, function() {
			tswlairmgr.core.data.executeWithDifferentLocalization(self._model._selectedChatScriptLocalizationId, function() {
				preLines = [
					'<font face='+self._styles.title.fontface+' color='+self._styles.title.color+'>' +
						self._localization.getLocalizationData().strings.chatScript.title +
						'</font>',
					'<font face='+self._styles.help.fontface+' color='+self._styles.help.color+'>' +
						self._localization.getLocalizationData().strings.chatScript.helpText +
						'</font>'
				];
		
				contentLines = "";
				switch(self._model._selectedChatScriptOrderStyle)
				{
					case tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum.o.BY_PARTICIPANT:
						contentLines = self._generate_content_participantOrder();
					break;
					case tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum.o.BY_MISSION:
						contentLines = self._generate_content_missionOrder();
					break;
					default:
					break;
				}
		
				postLines = [
					'<font face='+self._styles.generator.fontface+' color='+self._styles.generator.color+'>' +
						self._localization.getLocalizationData().strings.chatScript.generatorNotice.beforeLink +
						'<a href="text://' +
							'<div align=center>' +
							'<font face=HEADLINE color=#ffcc00>TSW Lair Manager</font><br><font face=HUGE color=#e97f0d>by Cobin</font>' +
							'</div><br>' +
							'<br>' +
							'<font face=LARGE color=#c0c0c0>'+self._localization.getLocalizationData().strings.chatScript.generatorNotice.description + '</font><br>' +
							'<br>' +
							'<font face=LARGE color=#ffffff><a href=\'chatcmd:///option WebBrowserStartURL &quot;'+self.forumThreadURL+'&quot; \\n /option web_browser 1\'>'+self.forumThreadURL+'</a></font><br>' +
							'<font face=LARGE color=#ffffff><a href=\'chatcmd:///option WebBrowserStartURL &quot;'+self.projectURL+'&quot; \\n /option web_browser 1\'>'+self.projectURL+'</a></font>' +
						'">' +
						self._localization.getLocalizationData().strings.chatScript.generatorNotice.linkTitle +
						'</a>' +
						self._localization.getLocalizationData().strings.chatScript.generatorNotice.afterLink +
						'</font>'
				];
			});
		});
		
		return [
			preLines.join("\n"),
			'&nbsp;',
			contentLines,
			'&nbsp;',
			postLines.join("\n")
		].join("\n");
	}
	
	var self = this;
	this._generate_content_participantOrder = function() {
		var participantAssignmentBlocks = [];
		$.each(self._model._participants.getParticipants(), function(unsafeParticipantArrayIndex, participant) {
			var participantColor = tswlairmgr.modules.organizer.classes.NameColors.getHTMLColorForListIndex(
				self._model._participants.getListIndexOfParticipant(participant)
			);
			
			var assignmentBlock = [];
			assignmentBlock.push(
				'<font face='+self._styles.participant.fontface+' color='+participantColor+'>' +
					participant.getName() +
					'</font>'
			);
			
			$.each(self._model._selectedLair.getSortedBosses(), function(bossIndex, boss) {
				if(participant.canTurnInMissionForBoss(boss))
				{
					var renderedMissionName = 
						'<font face='+self._styles.mission.fontface+' color='+self._styles.mission.color+'>' +
						boss.getMissionName() +
						'</font>';
					var renderedFragmentCode = 
						'<font face='+self._styles.fragment.fontface+' color='+self._styles.fragment.color+'>' +
						self._model._assigningStrategy.getAssignedFragmentForParticipantAndMission(participant, boss).getCode() +
						'</font>';
				
					assignmentBlock.push(
						'<font face='+self._styles.assignment.fontface+' color='+self._styles.assignment.color+'>' +
							Mustache.render(self._localization.getLocalizationData().strings.chatScript.assignments.byParticipant.assignmentFormat, {
								localization: self._localization.getLocalizationData(),
								context: {
									missionName: renderedMissionName,
									fragmentCode: renderedFragmentCode
								}
							}) +
							'</font>'
					);
				}
			});
			
			participantAssignmentBlocks.push(assignmentBlock.join("\n"));
		});
		return participantAssignmentBlocks.join("\n&nbsp;\n");
	};
	
	this._generate_content_missionOrder = function() {
		var missionAssignmentBlocks = [];
		$.each(self._model._selectedLair.getSortedBosses(), function(bossIndex, boss) {
			var assignmentBlock = [];
			assignmentBlock.push(
				'<font face='+self._styles.mission.fontface+' color='+self._styles.mission.color+'>' +
					boss.getMissionName() +
					'</font>'
			);
			
			$.each(self._model._participants.getParticipants(), function(unsafeParticipantArrayIndex, participant) {
				if(participant.canTurnInMissionForBoss(boss))
				{
					var participantColor = tswlairmgr.modules.organizer.classes.NameColors.getHTMLColorForListIndex(
						self._model._participants.getListIndexOfParticipant(participant)
					);
					
					var renderedParticipantName = 
						'<font face='+self._styles.participant.fontface+' color='+participantColor+'>' +
						participant.getName() +
						'</font>';
					var renderedFragmentCode = 
						'<font face='+self._styles.fragment.fontface+' color='+self._styles.fragment.color+'>' +
						self._model._assigningStrategy.getAssignedFragmentForParticipantAndMission(participant, boss).getCode() +
						'</font>';
				
					assignmentBlock.push(
						'<font face='+self._styles.assignment.fontface+' color='+self._styles.assignment.color+'>' +
							Mustache.render(self._localization.getLocalizationData().strings.chatScript.assignments.byMission.assignmentFormat, {
								localization: self._localization.getLocalizationData(),
								context: {
									participantName: renderedParticipantName,
									fragmentCode: renderedFragmentCode
								}
							}) +
							'</font>'
					);
				}
			});
			
			missionAssignmentBlocks.push(assignmentBlock.join("\n"));
		});
		return missionAssignmentBlocks.join("\n&nbsp;\n");
	};
};