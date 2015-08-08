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
			},
			regionalFragmentDropsFrom: {
				title: "Drops from:"
			},
			allRegionLairBosses: {
				title: "Lair bosses from this region:"
			}
		}
	}
});