var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.lookup.controller._localization.addLocalizationData("Deutsch", "German", "deDE", {
	meta: {
		displayName: "Suche"
	},
	strings: {
		selectors: {
			fragments: {
				chooseLabel: "Fragment auswählen...",
				optionGroups: {
					lairFragments: "Beschwörungsritualfragmente",
					regionalFragments: "Säuberungsritualfragmente"
				}
			},
			bosses: {
				chooseLabel: "Boss auswählen...",
				optionGroups: {
					regionalBosses: "Regionalbosse"
				}
			}
		},
		objectviewComponents: {
			propertyTable: {
				regionalfragment: {
					boss: "Boss:",
					region: "Region:"
				},
				regionalboss: {
					name: "Name:",
					location: "Beschwörungsort:"
				},
				lairfragment: {
					boss: "Boss:",
					lair: "Bau:"
				},
				lairboss: {
					lair: "Bau:",
					mission: "Mission:"
				},
			},
			regionalFragmentDropsFrom: {
				title: "Droppt von:"
			},
			allRegionLairBosses: {
				title: "Bau-Bosse dieser Region:"
			},
			otherLairBosses: {
				title: "Andere Bosse dieses Baus:"
			},
			associatedRegionalBoss: {
				title: "Zugehöriger Regionalboss:"
			},
			bossDropsRegionalFragments: {
				title: "Droppt Fragmente:",
				position: "Position",
				regionalFragmentPositions: {
					nnww: "NNWW",
					nnw: "NNW",
					nne: "NNO",
					nnee: "NNOO",
					
					nww: "NWW",
					nw: "NW",
					ne: "NO",
					nee: "NOO",
					
					sww: "SWW",
					sw: "SW",
					se: "SO",
					see: "SOO",
					
					ssww: "SSWW",
					ssw: "SSW",
					sse: "SSO",
					ssee: "SSOO",
				}
			}
		}
	}
});