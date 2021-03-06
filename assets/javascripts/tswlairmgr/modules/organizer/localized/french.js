var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.organizer.controller._localization.addLocalizationData("Français", "French", "frFR", {
	meta: {
		displayName: "Organisateur"
	},
	strings: {
		topmenu: {
			fragmentcountsImport: {
				importButton: {
					label: "Importer fragments...",
				}
			},
			lairselector: {
				selectLair: "Choisir antre:"
			}
		},
		bosstable: {
			calculated: {
				numberOfFullSets: {
					singular: "{{{context.count}}} rituel d'évocation",
					plural: "{{{context.count}}} rituels d'évocation"
				},
				numberOfMissingForNext: {
					singular: "({{{context.count}}} fragment manquant pour un autre)",
					plural: "({{{context.count}}} fragments manquants pour un autre)"
				}
			}
		},
		picktable: {
			title: "Table de répartition",
			numberOfParticipants: {
				singular: "{{{context.count}}} participant",
				plural: "{{{context.count}}} participants"
			},
			importButtonLabel: "Importer...",
			importFromChatLog: {
				title: "Importer les noms des participants à partir du journal de discussion",
				infoText: {
					text: "Collez ({{{context.pasteShortcut}}}) un extrait du journal de discussion en jeu dans le champ de texte ci-dessous pour ajouter tous les noms de personnages trouvés à la liste des participants:",
					pasteShortcut: "Ctrl+V"
				},
				participantsAddedMessage: {
					singular: "{{context.numberOfAddedParticipants}} nouveau participant a été ajouté.",
					plural: "{{context.numberOfAddedParticipants}} nouveaux participants ont été ajoutés."
				}
			},
			addButtonLabel: "Ajouter participant",
			addFailedInfoText:
				"Le participant n'a pas pu être ajouté.\n" +
				"Soit il existe déjà un participant portant le même nom, soit le nom que vous avez entré contient des caractères non valides.\n" +
				"Un nom peut être composé que de A-Z, a-z, 0-9, tirets (-) et tirets du bas (_) et doit contenir au moins un caractère.",
			infoText:
				"Ajoutez ici tous les joueurs qui participent à votre Lair run. Cliquez sur le fragment d'antre respectif à côté d'un nom pour ignorer l'attribution du fragment pour ce joueur et la mission, par exemple lorsqu'ils ont envoyé le rapport de mission trop tôt. Cliquez sur le signe d'annulation pour rendre le participant à nouveau disponible.",
			table: {
				headings: {
					name: "Nom",
					actions: "Actions"
				},
				actions: {
					remove: "Supprimer"
				},
				skipLabel: "Ignorer"
			}
		},
		output: {
			title: "Edition du script de discussion",
			sortingStylesButtonLabels: {
				byParticipant: "Par Participant",
				byBossMission: "Par Mission"
			},
			infoTextUpper:
				"<p>Après avoir ajouté tous les participants et entré tous les nombres de fragments, générez un script de discussion afin de dire aux participants quels fragments choisir. Cliquer sur le bouton ci-dessous vous fournira un script de discussion en tant que fichier à télécharger qui, lors de l'utilisation, postera la répartition des fragments dans le canal de discussion sélectionné.</p>",
			downloadButtonLabel: "Télécharger\nTSW Chat Script",
			infoTextLower: {
				showLabel: "Montrer le guide d'utilisation",
				hideLabel: "Cacher le guide d'utilisation",
				text:
					"<p>Sauvegardez le fichier dans le sous-dossier {{{context.scriptsFolder}}} situé dans votre dossier d'installation TSW (Si il n'existe pas déjà, créez-en un avec ce nom).<br />Ne changez pas le nom du fichier proposé {{{context.fileName}}}; si un fichier avec ce nom existe déjà, choisissez écraser.</p>" +
					"<p>En jeu, cliquez sur le nom du canal sélectionné (le texte entre {{{context.chatChannelBrackets}}} crochets) dans le coin bas gauche de votre fenêtre de discussion pour ouvrir un menu contextuel qui vous permet de choisir un autre canal:</p>" +
					"<ul>" +
					"	<li>Choisissez {{{context.groupChannel}}} si les membres de votre équipe sont dans un groupe de 5 personnes.</li>" +
					"	<li>Choisissez {{{context.raidChannel}}} si les membres de votre équipe sont dans un raid de 10 personnes (double groupe).</li>" +
					"	<li>Choisissez {{{context.sayChannel}}} si vous avez plus de participants que ne peut en contenir un raid. Assurez vous que tous les participants sont proches de vous avant d'envoyer le script, étant donné qu'ils ne recevront le message Dire que dans une zone délimitée autour de vous.</li>" +
					"</ul>" +
					"<p>Puis entrez {{{context.scriptCommand}}} (supposant que vous n'avez pas changé le nom du fichier) en tant que message de discussion et appuyez sur {{{context.enterButton}}}.</p>",
				groupChannelName: "Groupe",
				raidChannelName: "Raid",
				sayChannelName: "Dire",
				enterButtonName: "Entrée"
			}
		},
		chatScript: {
			title: "Attribution des fragments",
			helpText: "Trouvez votre nom dans la liste ci-dessous pour voir quels fragments vous devez choisir en récompense lorsque vous envoyez les rapports de missions d'antre:",
			assignments: {
				byParticipant: {
					assignmentFormat: "  Pour {{{context.missionName}}} choisir {{{context.fragmentCode}}}"
				},
				byMission: {
					assignmentFormat: "  {{{context.participantName}}} choisit {{{context.fragmentCode}}}"
				}
			},
			generatorNotice: {
				beforeLink: "Généré avec Cobin's ",
				linkTitle: "TSW Lair Manager",
				afterLink: ".",
				description: "Une appli web gratuite et open source qui vous aide à organiser des lair runs."
			}
		}
	}
});