var tswlairmgr = tswlairmgr || {};

tswlairmgr.core.data.addLocalizationData("Deutsch", "German", "deDE", {
	alphabets: {
		greek: {
			alpha: "Alpha",
			beta: "Beta",
			gamma: "Gamma",
			delta: "Delta",
			epsilon: "Epsilon",
			zeta: "Zeta",
			eta: "Eta",
			theta: "Theta",
			iota: "Iota",
			kappa: "Kappa",
			lambda: "Lambda",
			mu: "Mu",
			nu: "Nu",
			xi: "Xi",
			omicron: "Omikron",
			pi: "Pi",
			rho: "Rho",
			sigma: "Sigma",
			tau: "Tau",
			upsilon: "Ypsilon",
			phi: "Phi",
			chi: "Chi",
			psi: "Psi",
			omega: "Omega"
		},
		phoenician: {
			alaph: "Alaph",
			beth: "Beth",
			gamal: "Gamal",
			dalath: "Dalath",
			he: "He",
			waw: "Waw",
			zain: "Zain",
			heth: "Heth",
			teth: "Teth",
			yudh: "Yudh",
			kaph: "Kaph",
			lamadh: "Lamadh",
			mim: "Mim",
			nun: "Nun",
			semkath: "Semkath",
			// ayin: "", /* Unused so far */
			pe: "Pe",
			sadhe: "Sadhe",
			qoph: "Qoph",
			resh: "Resh",
			shin: "Shin",
			// taw: "", /* Unused so far */
			e: "E"
		}
	},
	itemNamePatterns: {
		fragmentLair: "Beschwörungsritualfragment: {{0}}",
		fragmentRegional: "Säuberungsritualfragment: {{0}}",
		summonLair: "Beschwörungsritual: {{0}}",
		summonRegional: "Säuberungsritual: {{0}}"
	},
	regions: {
		sol: {
			name: "Solomon Island",
			regionalName: "Aspekt des Langzahnigen",
			zones: {
				km: {
					name: "Kingsmouth",
					lairs: [
						{
							name: "Duma-Strand",
							bosses: [
								{
									name: "Cta-Tha",
									missionName: "Bis zum Strand"
								},
								{
									name: "Kranzmutter",
									missionName: "Algenartig"
								},
								{
									name: "Kopf von Glamr",
									missionName: "Der letzte Strang"
								}
							]
						}
					]
				},
				sc: {
					name: "Savage Coast",
					lairs: [
						{
							name: "Die Übersehenen",
							bosses: [
								{
									name: "Verlorenes Sarkom",
									missionName: "Sinkender Mut"
								},
								{
									name: "Schmutz.Vektor",
									missionName: "Grüße von Nobel"
								},
								{
									name: "Schatten der Verdorbenheit",
									missionName: "Deckung"
								}
							]
						}
					]
				},
				bm: {
					name: "Blue Mountain",
					lairs: [
						{
							name: "Die Casino-Gruben",
							bosses: [
								{
									name: "Verschmutztes Abbild",
									missionName: "Das Haus gewinnt immer"
								},
								{
									name: "Eisenhaltiger Duellant",
									missionName: "Zusammenführung der Teile"
								},
								{
									name: "Blauer Ernter",
									missionName: "Die ganze Wahrheit"
								}
							]
						}
					]
				}
			}
		},
		egy: {
			name: "Ägypten",
			regionalName: "Aspekt des Vielarmigen",
			zones: {
				sd: {
					name: "Die verbrannte Wüste",
					lairs: [
						{
							name: "Die Gipfel",
							bosses: [
								{
									name: "Auge des Schwarms",
									missionName: "Rückkehr der Roten Nächte"
								},
								{
									name: "Lebt-von-Schlangen",
									missionName: "Blutgewänder"
								},
								{
									name: "Der Götzendiener",
									missionName: "In Rauch aufgegangen"
								}
							]
						}
					]
				},
				cs: {
					name: "Stadt des Sonnengottes",
					lairs: [
						{
							name: "Das heimgesuchte Königreich",
							bosses: [
								{
									name: "Nyarlat, Königlicher Henker",
									missionName: "Zitadelle der Schmerzen"
								},
								{
									name: "Hassan, der Verheerer",
									missionName: "Die Spur der Schmuckstücke"
								},
								{
									name: "Dünenrücken",
									missionName: "Die Wache des Schwarzen Pharao"
								}
							]
						}
					]
				}
			}
		},
		tra: {
			name: "Transsylvanien",
			regionalName: "Aspekt des Großgeflügelten",
			zones: {
				bf: {
					name: "Das belagerte Farmland",
					lairs: [
						{
							name: "Die Zuflucht des Grauens",
							bosses: [
								{
									name: "Rote Verehrung",
									missionName: "Mitternachtsmesse"
								},
								{
									name: "Die Pest",
									missionName: "Gesegnet sind die Schöpfer"
								},
								{
									name: "Der Skythe",
									missionName: "Restaurierung"
								}
							]
						}
					]
				},
				sf: {
					name: "Der schattenhafte Wald",
					lairs: [
						{
							name: "Der überzüchtete Garten",
							bosses: [
								{
									name: "Sie vom Leid",
									missionName: "Die Ausbeute des Kalten Krieges"
								},
								{
									name: "Avatar des Widerlings",
									missionName: "Zwielichtige Unterwelt"
								},
								{
									name: "Dakischer Rudelläufer",
									missionName: "Ansturm der Widerlinge"
								}
							]
						}
					]
				},
				cf: {
					name: "Reißzähne der Karpaten",
					lairs: [
						{
							name: "Das Mutterland",
							bosses: [
								{
									name: "Verschlinger",
									missionName: "Von jenseits des Eisernen Vorhangs"
								},
								{
									name: "Der Woiwode",
									missionName: "Die sterbliche Spule"
								},
								{
									name: "Vulkan",
									missionName: "Frachtmeldungen"
								}
							]
						}
					]
				}
			}
		}
	}
});