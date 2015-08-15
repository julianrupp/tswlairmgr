var tswlairmgr = tswlairmgr || {};

tswlairmgr.modules.organizer.controller._localization.addLocalizationData("Deutsch", "German", "deDE", {
	meta: {
		displayName: "Planer"
	},
	strings: {
		topmenu: {
			lairselector: {
				selectLair: "Bau auswählen:"
			}
		},
		bosstable: {
			calculated: {
				numberOfFullSets: {
					singular: "{{{context.count}}} Beschwörungsritual",
					plural: "{{{context.count}}} Beschwörungsrituale"
				},
				numberOfMissingForNext: {
					singular: "(noch {{{context.count}}} Fragment für ein weiteres)",
					plural: "(noch {{{context.count}}} Fragmente für ein weiteres)"
				}
			}
		},
		picktable: {
			title: "Zuweisungstabelle",
			numberOfParticipants: {
				singular: "{{{context.count}}} Teilnehmer",
				plural: "{{{context.count}}} Teilnehmer"
			},
			importButtonLabel: "Importieren...",
			importFromChatLog: {
				title: "Namen von Chatlog importieren",
				infoText: {
					text: "Füge einen Auszug des Chatlogs im Spiel in dem Textfeld unten ein ({{{context.pasteShortcut}}}), um alle darin gefundenen Charakternamen der Teilnehmerliste hinzuzufügen:",
					pasteShortcut: "Strg+V"
				},
				participantsAddedMessage: {
					singular: "{{context.numberOfAddedParticipants}} neuer Teilnehmer wurde hinzugefügt.",
					plural: "{{context.numberOfAddedParticipants}} neue Teilnehmer wurden hinzugefügt."
				}
			},
			addButtonLabel: "Teilnehmer hinzufügen",
			addFailedInfoText:
				"Der Teilnehmer konnte nicht hinzugefügt werden.\n" +
				"Entweder gibt es bereits einen Teilnehmer mit diesem Namen, oder der eingegebene Name enthält ungültige Zeichen.\n" +
				"Ein Name darf nur aus den Zeichen A-Z, a-z, 0-9, Bindestrich (-) und Unterstrich (_) bestehen und mindestens ein Zeichen lang sein.",
			infoText:
				"Füge hier alle Spieler hinzu, die an deinem Lairrun teilnehmen. Klicke auf das jeweilige Fragment neben einem Namen, um die Fragmentzuweisung für diesen Teilnehmer und diese Mission zu überspringen, z.B. wenn dieser den Missionsbericht bereits gesendet hat. Klicke die Überspringungsmarkierung an, um den Teilnehmer wieder als verfügbar zu markieren.",
			table: {
				headings: {
					name: "Name",
					actions: "Aktionen"
				},
				actions: {
					remove: "Entfernen"
				},
				skipLabel: "Überspr."
			}
		},
		output: {
			title: "Chatskript-Ausgabe",
			sortingStylesButtonLabels: {
				byParticipant: "Nach Teilnehmer",
				byBossMission: "Nach Mission"
			},
			infoTextUpper:
				"<p>Nachdem du alle Teilnehmer hinzugefügt und die Anzahl aller deiner Fragmente eingegeben hast, kannst du dir hier ein Chatskript generieren lassen, um deinen Teilnehmern auf einfache und schnelle Weise zu sagen wer welche Fragmente nehmen soll.</p>" +
					"<p>Wenn du den Button unten anklickst, wird dir ein Chatskript als Datei zum Download angeboten, das, wenn es ausgeführt wird, alle Fragmentzuweisungen in dem gerade ausgewählten Chatkanal postet.</p>",
			downloadButtonLabel: "TSW Chatskript\nherunterladen",
			infoTextLower: {
				showLabel: "Zeige Anleitung",
				hideLabel: "Verstecke Anleitung",
				text:
					"<p>Speichere die Datei im {{{context.scriptsFolder}}}-Unterordner im Installationsverzeichnis von TSW (falls dort kein Ordner mit diesem Namen existiert, lege ihn an).<br />Ändere nicht den vorgeschlagenen Dateinamen {{{context.fileName}}}; falls bereits eine Datei mit diesem Namen existiert, lass sie überschreiben.</p>" +
					"<p>Klicke im Spiel auf den ausgewählten Chatkanalnamen (der Text in {{{context.chatChannelBrackets}}}-Klammern) in der unteren linken Ecke des Chatfensters, um ein Menü zur Auswahl eines neuen Ziel-Chatkanals zu öffnen:</p>" +
					"<ul>" +
					"	<li>Wähle {{{context.groupChannel}}}, falls sich alle Teilnehmer in einer 5-Personen-Gruppe befinden.</li>" +
					"	<li>Wähle {{{context.raidChannel}}}, falls sich alle Teilnehmer in einem 10-Personen-Raid (doppelte Gruppe) befinden.</li>" +
					"	<li>Wähle {{{context.sayChannel}}}, falls du mehr Teilnehmer hast als in einen Raid passen. Stelle sicher, dass alle Teilnehmer in deiner unmittelbaren Nähe stehen, bevor du das Skript ausführst, da andere Spieler solche Nachrichten nur in einem gewissen Radius um den Ursprungspunkt empfangen.</li>" +
					"</ul>" +
					"<p>Gib danach {{{context.scriptCommand}}} als Chatnachricht ein (sofern du den Dateinamen nicht geändert hast) und drücke {{{context.enterButton}}}.</p>",
				groupChannelName: "Gruppe",
				raidChannelName: "Raid",
				sayChannelName: "Sagen",
				enterButtonName: "Enter"
			}
		},
		chatScript: {
			title: "Fragmentzuweisungen",
			helpText: "Finde deinen Namen in der Liste unten, um zu sehen, welche Fragmente du beim Senden der Missionsberichte als Belohnung wählen solltest:",
			assignments: {
				byParticipant: {
					assignmentFormat: "  für {{{context.missionName}}} wähle {{{context.fragmentCode}}}"
				},
				byMission: {
					assignmentFormat: "  {{{context.participantName}}} wähle {{{context.fragmentCode}}}"
				}
			},
			generatorNotice: {
				beforeLink: "Generiert mit Cobins ",
				linkTitle: "TSW Lair Manager",
				afterLink: ".",
				description: "Ein kostenloses und quelloffenes Webapp, das die Organisation von Lairruns erleichtert."
			}
		}
	}
});