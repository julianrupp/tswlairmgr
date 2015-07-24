var tswlairmgr = tswlairmgr || {};

tswlairmgr.core.data.addLocalizationData("Français", "French", "frFR", {
	alphabets: {
		greek: {
			alpha: "Alpha",
			beta: "Bêta",
			gamma: "Gamma",
			delta: "Delta",
			epsilon: "Epsilon",
			zeta: "Zêta",
			eta: "Êta",
			theta: "Thêta",
			iota: "Iota",
			kappa: "Kappa",
			lambda: "Lambda",
			mu: "Mu",
			nu: "Nu",
			xi: "Xi",
			omicron: "Omicron",
			pi: "Pi",
			rho: "Rhô",
			sigma: "Sigma",
			tau: "Tau",
			upsilon: "Upsilon",
			phi: "Phi",
			chi: "Chi",
			psi: "Psi",
			omega: "Oméga"
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
	regions: {
		sol: {
			name: "Solomon Island",
			regionalName: "Aspect aux Longues Dents",
			zones: {
				km: {
					name: "Kingsmouth",
					lairs: [
						{
							name: "Duma Beach",
							bosses: [
								{
									name: "Cta-Tha",
									missionName: "Sur la plage"
								},
								{
									name: "Mère des volutes",
									missionName: "Algolémie"
								},
								{
									name: "Tête de Glamr",
									missionName: "Le barouf d'honneur"
								}
							]
						}
					]
				},
				sc: {
					name: "La Côte Sauvage",
					lairs: [
						{
							name: "Le Lieu de l'Oubli",
							bosses: [
								{
									name: "Sarcome perdu",
									missionName: "Pressentiments nauséabonds"
								},
								{
									name: "Vecteur de Souillure",
									missionName: "L'appel de Nobel"
								},
								{
									name: "Ombre de dépravation",
									missionName: "La couverture"
								}
							]
						}
					]
				},
				bm: {
					name: "La Montagne Bleue",
					lairs: [
						{
							name: "Les Fosses du Casino",
							bosses: [
								{
									name: "Effigie contaminée",
									missionName: "La banque gagne à tous les coups"
								},
								{
									name: "Duelliste ferreux",
									missionName: "Morceau par morceau"
								},
								{
									name: "Moissonneur bleu",
									missionName: "Toute la vérité"
								}
							]
						}
					]
				}
			}
		},
		egy: {
			name: "Egypte",
			regionalName: "Aspect aux Nombreux Membres",
			zones: {
				sd: {
					name: "Le Désert Brûlé",
					lairs: [
						{
							name: "Les Sommets",
							bosses: [
								{
									name: "Œil de l'essaim",
									missionName: "Le retour des Nuits Rouges"
								},
								{
									name: "Mange-les-vers",
									missionName: "Vêtures sanglantes"
								},
								{
									name: "L'idolâtre",
									missionName: "Partis en fumée"
								}
							]
						}
					]
				},
				cs: {
					name: "Cité du Dieu Solaire",
					lairs: [
						{
							name: "Le Royaume Flétri",
							bosses: [
								{
									name: "Nyarlat, le bourreau royal",
									missionName: "La citadelle des tourments"
								},
								{
									name: "Hassan le démanteleur",
									missionName: "La piste aux babioles"
								},
								{
									name: "Dos-de-dune",
									missionName: "La garde du Pharaon Noir"
								}
							]
						}
					]
				}
			}
		},
		tra: {
			name: "Transylvanie",
			regionalName: "Aspect aux Grandes Ailes",
			zones: {
				bf: {
					name: "Les Fermes Assiégées",
					lairs: [
						{
							name: "La Retraite Effroyable",
							bosses: [
								{
									name: "Vénération rouge",
									missionName: "Messe de minuit"
								},
								{
									name: "La peste",
									missionName: "Loués soient les créateurs"
								},
								{
									name: "Le Scythe",
									missionName: "Restauration"
								}
							]
						}
					]
				},
				sf: {
					name: "La Forêt des Ombres",
					lairs: [
						{
							name: "Le Jardin Corrompu",
							bosses: [
								{
									name: "Celle des malheurs",
									missionName: "Les dépouilles de la guerre froide"
								},
								{
									name: "Avatar de l'infâme",
									missionName: "Montée en graine"
								},
								{
									name: "Pur-sang de Dacie",
									missionName: "Haro sur les Rampants"
								}
							]
						}
					]
				},
				cf: {
					name: "Les Crocs des Carpates",
					lairs: [
						{
							name: "Les Terres Natales",
							bosses: [
								{
									name: "Dévoreur",
									missionName: "Par-delà le rideau de fer"
								},
								{
									name: "Le Voïvode",
									missionName: "Sales bobines"
								},
								{
									name: "Vulkan",
									missionName: "Suivi de commande"
								}
							]
						}
					]
				}
			}
		}
	}
});