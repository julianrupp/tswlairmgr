var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.organizer.controller._localization.addLocalizationData("English", "English", "enUS", {
	meta: {
		displayName: "Organizer"
	},
	strings: {
		topmenu: {
			lairselector: {
				selectLair: "Select lair"
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
			importButtonLabel: "Import",
			addButtonLabel: "Add",
			addFailedInfoText: "The participant could not be added. There either already is a participant with that name, or the name you entered contains invalid characters. A name may only consist of A-Z, a-z, 0-9 and dashes (-) and must be at least one character long.",
			infoText: "Add all players that participate in your lair run here. Click the respective lair fragment next to a name to skip fragment assignment for that player and mission, e.g. when they already prematurely sent the mission report.",
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
		}
	}
});