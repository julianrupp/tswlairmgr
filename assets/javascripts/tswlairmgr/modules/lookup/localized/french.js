var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.lookup.controller._localization.addLocalizationData("Français", "French", "frFR", {
	meta: {
		displayName: "Recherche"
	},
	strings: {
		selectors: {
			fragments: {
				chooseLabel: "Sélectionner fragment...",
				optionGroups: {
					lairFragments: "Fragments de rituel d'évocation",
					regionalFragments: "Fragments de rituel purificateur"
				}
			},
			bosses: {
				chooseLabel: "Sélectionner boss...",
				optionGroups: {
					regionalBosses: "Boss régionaux"
				}
			}
		},
		objectviewComponents: {
			propertyTable: {
				regionalfragment: {
					boss: "Boss:",
					region: "Région:"
				},
				regionalboss: {
					name: "Nom:",
					location: "Lieu d'évocation:"
				},
				lairfragment: {
					boss: "Boss:",
					lair: "Antre:"
				},
				lairboss: {
					lair: "Antre:",
					mission: "Mission:"
				},
			},
			regionalFragmentDropsFrom: {
				title: "Drope de:"
			},
			allRegionLairBosses: {
				title: "Boss d'antres de cette région:"
			},
			otherLairBosses: {
				title: "Autres boss de cette antre:"
			},
			associatedRegionalBoss: {
				title: "Boss régional associé:"
			},
			bossDropsRegionalFragments: {
				title: "Drope les fragments:",
				position: "Position",
				regionalFragmentPositions: {
					nnww: "NNOO",
					nnw: "NNO",
					nne: "NNE",
					nnee: "NNEE",
					
					nww: "NOO",
					nw: "NO",
					ne: "NE",
					nee: "NEE",
					
					sww: "SOO",
					sw: "SO",
					se: "SE",
					see: "SEE",
					
					ssww: "SSOO",
					ssw: "SSO",
					sse: "SSE",
					ssee: "SSEE",
				}
			}
		}
	}
});