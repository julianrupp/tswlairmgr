var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.inventory.controller._localization.addLocalizationData("Français", "French", "frFR", {
	meta: {
		displayName: "Inventaire"
	},
	strings: {
		topmenu: {
			fragmentcountsImport: {
				importButton: {
					label: "Importer fragments...",
				},
				importBox: {
					title: "Importer les fragments du jeu",
					infoText: {
						text: "Collez ({{{context.pasteShortcut}}}) le texte vous avez copié du mod {{{context.modLink}}} du jeu dans le champ de texte ci-dessous pour importer tous les fragments de votre inventaire et banque personnelle (si ouverte). Ceci remplacera les nombres de tous les fragments associés avec un ensemble duquel vous avez un ou plusieurs fragments.",
						pasteShortcut: "Ctrl+V"
					},
					importedMessage: {
						message: "Les nombres de {{context.distinctFragments}} de {{context.distinctRegions}}, {{context.distinctZones}}, {{context.distinctBosses}} ont été importés.",
						totalFragments: {
							singular: "{{context.number}} fragment",
							plural: "{{context.number}} fragments"
						},
						distinctFragments: {
							singular: "{{context.number}} fragment",
							plural: "{{context.number}} fragments distincts"
						},
						distinctRegions: {
							singular: "{{context.number}} région",
							plural: "{{context.number}} régions"
						},
						distinctZones: {
							singular: "{{context.number}} zone",
							plural: "{{context.number}} zones"
						},
						distinctLairs: {
							singular: "{{context.number}} antre",
							plural: "{{context.number}} antres"
						},
						distinctBosses: {
							singular: "{{context.number}} boss",
							plural: "{{context.number}} boss"
						},
						totalRegionalFragments: {
							singular: "{{context.number}} fragment régional",
							plural: "{{context.number}} fragments régionaux"
						},
						distinctRegionalFragments: {
							singular: "{{context.number}} fragment régional",
							plural: "{{context.number}} fragments régionaux distincts"
						},
						distinctRegionalRegions: {
							singular: "{{context.number}} région",
							plural: "{{context.number}} régions"
						},
						distinctRegionalBosses: {
							singular: "{{context.number}} boss régional",
							plural: "{{context.number}} boss régionaux"
						}
					},
					importErrorMessage: {
						message: "N'a pas pu trouver un code de TSWLM Exporter dans le texte collé, ou le code a un mauvais format."
					}
				}
			}
		},
		notes: {
			title: "Notes",
			infoText:
				"Vous pouvez écrire des notes ici, par exemple pour partager avec les autres joueurs."
		},
		fragmenttable: {
			calculated: {
				numberOfFullSets: {
					singular: "{{{context.count}}} rituel d'évocation",
					plural: "{{{context.count}}} rituels d'évocation"
				},
				numberOfMissingForNext: {
					singular: "({{{context.count}}} fragment manquant pour un autre)",
					plural: "({{{context.count}}} fragments manquants pour un autre)"
				},
				regionalNumberOfFullSets: {
					singular: "{{{context.count}}} rituel purificateur",
					plural: "{{{context.count}}} rituels purificateur"
				},
				regionalNumberOfMissingForNext: {
					singular: "({{{context.count}}} fragment manquant pour un autre)",
					plural: "({{{context.count}}} fragments manquants pour un autre)"
				}
			}
		}
	}
});