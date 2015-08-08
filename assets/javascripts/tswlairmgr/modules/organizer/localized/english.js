var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.organizer.controller._localization.addLocalizationData("English", "English", "enUS", {
	meta: {
		displayName: "Organizer"
	},
	strings: {
		topmenu: {
			lairselector: {
				selectLair: "Select lair:"
			}
		},
		bosstable: {
			calculated: {
				numberOfFullSets: {
					singular: "{{{context.count}}} Summoning Ritual",
					plural: "{{{context.count}}} Summoning Rituals"
				},
				numberOfMissingForNext: {
					singular: "({{{context.count}}} more fragment for another)",
					plural: "({{{context.count}}} more fragments for another)"
				}
			}
		},
		picktable: {
			title: "Pick Table",
			numberOfParticipants: {
				singular: "{{{context.count}}} participant",
				plural: "{{{context.count}}} participants"
			},
			importButtonLabel: "Import...",
			importFromChatLog: {
				title: "Import participant names from chat log",
				infoText: {
					text: "Paste ({{{context.pasteShortcut}}}) an excerpt of the in-game chat log into the text field below to add all characters' names found within to the participant list:",
					pasteShortcut: "Ctrl+V"
				},
				participantsAddedMessage: {
					singular: "{{context.numberOfAddedParticipants}} new participant was added.",
					plural: "{{context.numberOfAddedParticipants}} new participants were added."
				}
			},
			addButtonLabel: "Add participant",
			addFailedInfoText:
				"The participant could not be added.\n" +
				"There either already is a participant with that name, or the name you entered contains invalid characters.\n" +
				"A name may only consist of A-Z, a-z, 0-9, dashes (-) and underscores (_) and must be at least one character long.",
			infoText:
				"Add all players that participate in your lair run here. Click the respective lair fragment next to a name to skip fragment assignment for that player and mission, e.g. when they already prematurely sent the mission report. Click the skip indicator to mark the participant available again.",
			table: {
				headings: {
					name: "Name",
					actions: "Actions"
				},
				actions: {
					remove: "Remove"
				},
				skipLabel: "Skip"
			}
		},
		output: {
			title: "Chat Script Output",
			sortingStylesButtonLabels: {
				byParticipant: "By Participant",
				byBossMission: "By Boss/Mission"
			},
			infoTextUpper:
				"<p>After you have added all participants and entered all fragment counts, generate a chat script to easily tell people what fragments they should pick.<br />Clicking the button below will offer you a chat script as a file to download which, when used, will post all fragment assignments in the currently selected chat channel.</p>",
			downloadButtonLabel: "Download\nTSW Chat Script",
			infoTextLower: {
				showLabel: "Show usage guide",
				hideLabel: "Hide usage guide",
				text:
					"<p>Save the file in the {{{context.scriptsFolder}}} subfolder located in your installation folder of TSW (if there is no such subfolder, create one with that name).<br />Do not change the suggested file name {{{context.fileName}}}; if a file with that name already exists there, choose overwrite.</p>" +
					"<p>In the game, click the selected channel name (the text in {{{context.chatChannelBrackets}}} brackets) in the lower left corner of your chat window to bring up a popup menu where you can choose a new target channel:</p>" +
					"<ul>" +
					"	<li>Select {{{context.groupChannel}}} if all your team's members are in a 5-person group.</li>" +
					"	<li>Select {{{context.raidChannel}}} if all your team's members are in a 10-person raid (double group).</li>" +
					"	<li>Select {{{context.sayChannel}}} if you have more team members than what you can fit into one raid. Make sure all team members are standing close to you before you fire the script as people will only receive Say messages within a certain radius around you.</li>" +
					"</ul>" +
					"<p>Then enter {{{context.scriptCommand}}} (assuming you haven't changed the file name) as the chat message and press {{{context.enterButton}}}.</p>",
				groupChannelName: "Group",
				raidChannelName: "Raid",
				sayChannelName: "Say",
				enterButtonName: "Return"
			}
		},
		chatScript: {
			title: "Fragment Assignments",
			helpText: "Find your name in the list below to see which fragments you should pick as a reward when turning in the lair missions:",
			assignments: {
				byParticipant: {
					assignmentFormat: "  for {{{context.missionName}}} choose {{{context.fragmentCode}}}"
				},
				byMission: {
					assignmentFormat: "  {{{context.participantName}}} choose {{{context.fragmentCode}}}"
				}
			},
			generatorNotice: {
				beforeLink: "Generated with Cobin's ",
				linkTitle: "TSW Lair Manager",
				afterLink: ".",
				description: "A free and open source web app that helps you with organizing lair runs."
			}
		}
	}
});