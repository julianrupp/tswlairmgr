var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.inventory.controller._localization.addLocalizationData("English", "English", "enUS", {
	meta: {
		displayName: "Inventory"
	},
	strings: {
		topmenu: {
			fragmentcountsImport: {
				importButton: {
					label: "Import fragment counts...",
				},
				importBox: {
					title: "Import fragment counts from game",
					infoText: {
						text: "Paste ({{{context.pasteShortcut}}}) the string you copied out of the {{{context.modLink}}} mod into the text field below to import all fragment counts from your ingame inventory and personal bank (if open). This will replace the counts of all fragments associated with a set you have one or more fragments of.",
						pasteShortcut: "Ctrl+V"
					},
					importedMessage: {
						message: "The counts of {{context.distinctFragments}} from {{context.distinctRegions}}, {{context.distinctZones}}, {{context.distinctBosses}} as well as {{context.distinctRegionalFragments}} from {{context.distinctRegionalRegions}} were imported.",
						totalFragments: {
							singular: "{{context.number}} fragment",
							plural: "{{context.number}} fragments"
						},
						distinctFragments: {
							singular: "{{context.number}} fragment",
							plural: "{{context.number}} distinct fragments"
						},
						distinctRegions: {
							singular: "{{context.number}} region",
							plural: "{{context.number}} regions"
						},
						distinctZones: {
							singular: "{{context.number}} zone",
							plural: "{{context.number}} zones"
						},
						distinctLairs: {
							singular: "{{context.number}} lair",
							plural: "{{context.number}} lairs"
						},
						distinctBosses: {
							singular: "{{context.number}} boss",
							plural: "{{context.number}} bosses"
						},
						totalRegionalFragments: {
							singular: "{{context.number}} regional fragment",
							plural: "{{context.number}} regional fragments"
						},
						distinctRegionalFragments: {
							singular: "{{context.number}} regional fragment",
							plural: "{{context.number}} distinct regional fragments"
						},
						distinctRegionalRegions: {
							singular: "{{context.number}} region",
							plural: "{{context.number}} regions"
						},
						distinctRegionalBosses: {
							singular: "{{context.number}} regional boss",
							plural: "{{context.number}} regional bosses"
						}
					},
					importErrorMessage: {
						message: "Could not find a TSWLM Exporter code in the pasted text, or the code is malformed."
					}
				}
			}
		},
		notes: {
			title: "Notes",
			infoText:
				"You can enter various notes here, e.g. for personal reference or sharing purposes."
		},
		fragmenttable: {
			calculated: {
				numberOfFullSets: {
					singular: "{{{context.count}}} Summoning Ritual",
					plural: "{{{context.count}}} Summoning Rituals"
				},
				numberOfMissingForNext: {
					singular: "({{{context.count}}} more fragment for another)",
					plural: "({{{context.count}}} more fragments for another)"
				},
				regionalNumberOfFullSets: {
					singular: "{{{context.count}}} Cleansing Ritual",
					plural: "{{{context.count}}} Cleansing Rituals"
				},
				regionalNumberOfMissingForNext: {
					singular: "({{{context.count}}} more fragment for another)",
					plural: "({{{context.count}}} more fragments for another)"
				}
			}
		}
	}
});