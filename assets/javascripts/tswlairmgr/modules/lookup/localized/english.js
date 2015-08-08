var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.lookup.controller._localization.addLocalizationData("English", "English", "enUS", {
	meta: {
		displayName: "Lookup"
	},
	strings: {
		selectors: {
			fragments: {
				chooseLabel: "Select fragment...",
				optionGroups: {
					lairFragments: "Summoning Ritual Fragments",
					regionalFragments: "Cleansing Ritual Fragments"
				}
			},
			bosses: {
				chooseLabel: "Select boss...",
				optionGroups: {
					regionalBosses: "Regional bosses"
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
					location: "Summoning location:"
				},
				lairfragment: {
					boss: "Boss:",
					lair: "Lair:"
				},
				lairboss: {
					lair: "Lair:",
					mission: "Mission:"
				},
			},
			regionalFragmentDropsFrom: {
				title: "Drops from:"
			},
			allRegionLairBosses: {
				title: "Lair bosses from this region:"
			},
			otherLairBosses: {
				title: "Other bosses from this lair:"
			},
			associatedRegionalBoss: {
				title: "Associated regional boss:"
			},
			bossDropsRegionalFragments: {
				title: "Drops fragments:",
				position: "Position",
				regionalFragmentPositions: {
					nnww: "NNWW",
					nnw: "NNW",
					nne: "NNE",
					nnee: "NNEE",
					
					nww: "NWW",
					nw: "NW",
					ne: "NE",
					nee: "NEE",
					
					sww: "SWW",
					sw: "SW",
					se: "SE",
					see: "SEE",
					
					ssww: "SSWW",
					ssw: "SSW",
					sse: "SSE",
					ssee: "SSEE",
				}
			}
		}
	}
});