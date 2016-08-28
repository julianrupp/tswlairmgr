var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.inventory.controller._localization.addLocalizationData("Deutsch", "German", "deDE", {
	meta: {
		displayName: "Inventar"
	},
	strings: {
		topmenu: {
			fragmentcountsImport: {
				importButton: {
					label: "Fragmente importieren...",
				},
				importBox: {
					title: "Fragmente aus dem Spiel importieren",
					infoText: {
						text: "Füge die Zeichenkette, die du aus dem {{{context.modLink}}}-Mod kopiert hast, hier ein ({{{context.pasteShortcut}}}) um alle Fragmente aus deinem Inventar und deiner persönlichen Bank (sofern geöffnet) zu importieren. Dies wird die eingetragene Anzahl aller Fragmente ersetzen, die zu einem Set gehören, von welchem du ein oder mehrere Fragmente hast.",
						pasteShortcut: "Strg+V"
					},
					importedMessage: {
						message: "{{context.distinctFragments}} aus {{context.distinctRegions}}, {{context.distinctZones}}, {{context.distinctBosses}} sowie {{context.distinctRegionalFragments}} aus {{context.distinctRegionalRegions}} wurden importiert.",
						totalFragments: {
							singular: "{{context.number}} Fragment",
							plural: "{{context.number}} Fragmente"
						},
						distinctFragments: {
							singular: "{{context.number}} Fragment",
							plural: "{{context.number}} verschiedene Fragmente"
						},
						distinctRegions: {
							singular: "{{context.number}} Region",
							plural: "{{context.number}} Regionen"
						},
						distinctZones: {
							singular: "{{context.number}} Zone",
							plural: "{{context.number}} Zonen"
						},
						distinctLairs: {
							singular: "{{context.number}} Bau",
							plural: "{{context.number}} Bauen"
						},
						distinctBosses: {
							singular: "{{context.number}} Boss",
							plural: "{{context.number}} Bossen"
						},
						totalRegionalFragments: {
							singular: "{{context.number}} Regional-Fragment",
							plural: "{{context.number}} Regional-Fragmente"
						},
						distinctRegionalFragments: {
							singular: "{{context.number}} Regional-Fragment",
							plural: "{{context.number}} verschiedene Regional-Fragmente"
						},
						distinctRegionalRegions: {
							singular: "{{context.number}} Region",
							plural: "{{context.number}} Regionen"
						},
						distinctRegionalBosses: {
							singular: "{{context.number}} Regionalboss",
							plural: "{{context.number}} Regionalbossen"
						}
					},
					importErrorMessage: {
						message: "Konnte keinen TSWLM Exporter-Code im eingefügten Text finden, oder der Code hat ein ungültiges Format."
					}
				}
			}
		},
		notes: {
			title: "Notizen",
			infoText:
				"Du kannst hier Notizen eintragen, z.B. zur eigenen Information oder zum Teilen mit anderen."
		},
		fragmenttable: {
			calculated: {
				numberOfFullSets: {
					singular: "{{{context.count}}} Beschwörungsritual",
					plural: "{{{context.count}}} Beschwörungsrituale"
				},
				numberOfMissingForNext: {
					singular: "(noch {{{context.count}}} Fragment für ein weiteres)",
					plural: "(noch {{{context.count}}} Fragmente für ein weiteres)"
				},
				regionalNumberOfFullSets: {
					singular: "{{{context.count}}} Säuberungsritual",
					plural: "{{{context.count}}} Säuberungsrituale"
				},
				regionalNumberOfMissingForNext: {
					singular: "(noch {{{context.count}}} Fragment für ein weiteres)",
					plural: "(noch {{{context.count}}} Fragmente für ein weiteres)"
				}
			}
		}
	}
});