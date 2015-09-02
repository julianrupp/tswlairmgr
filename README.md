TSW Lair Manager
================

TSW Lair Manager is a fan-made lair fragment organizer for [The Secret World](http://thesecretworld.com) (TSW), a MMORPG by Funcom.

It can be used by the leaders or fragment holders of lair groups to easily determine and communicate what fragments group members should pick as their mission reward to maximize the amount of boss summons they can get.

Unlike the [MissionHelper](http://www.curse.com/tsw-mods/tsw/missionhelper) addon, this webapp can be used with an arbitrary number of group members, lets you see everything at a glance, has the potential to take you much less time to use, and doesn't clash with team window mods like [FiveAlive](https://forums.thesecretworld.com/showthread.php?71072) which are considered essential by many players. Also, it just works in any modern/standards-compliant browser.

With version 2, a major rewrite, the source code was made more readable and easier to extend, and some new features have been added: localization support, persisting state via URL hash, participant name import from chat log excerpts, and fragment lookup including regional bosses/fragments. It now makes use of [jQuery](http://jquery.com) and [mustache.js](http://mustache.github.io/).

Features:

* Lair bosses from all 8 classic lairs
* Regional bosses from all 3 classic regions
* Fragment lookup utility
* Support for arbitrary group sizes
* Batch participant name import from chat log excerpts
* On-the-fly TSW chat script generation in 2 sorting styles
* Crash resilience and saving/sharing ability via URL hashes
* Localized in English, German and French
* Easy and fast to use

**An instance of TSW Lair Manager can be found at:** [http://tsw.nex4k.net/lairs/](http://tsw.nex4k.net/lairs/)

**Official TSW forums announcement and discussion thread:** [[Webapp] TSW Lair Manager](http://forums.thesecretworld.com/showthread.php?84221)


Requirements
------------
Just a normal modern web browser. All functionality is implemented in client-side JavaScript.


Retrieving
----------
Fetch the source code from this repo the usual way.

Open `index.html` to view.


Using
-----
Since I've now switched to a modular system, the old way of just having one single tab/popup/whatever for displaying an usage guide does no longer really work so well. I think as each module is a thing on its own, it should take care of integrating help or an usage guide itself.

The *Organizer* and *Lookup* modules currently do not include some kind of a tab for displaying a comprehensive guide. *Organizer* will instead provide short snippets of help text at tricky spots, while *Lookup* will probably not include any kind of help text at all, as its main functions should be self-explanatory.


Distributing
------------
Upload `index.html` and the `assets` folder to a basic web server.


Contributing
------------
I've recently completely rewritten the code and cleaned it up, though there definitely still is a lot of room for improvement as I'm not really into web development this much anymore, and also never really was into JavaScript and jQuery. Plus, some of the paths I paved I didn't completely pave all the way to the end, but those things should be fairly easy to refactor given their position in the chain.

-	All active development takes place in feature branches branching off the `dev` branch. Use branch names like `feature/<title>` or `bugfix/<issue number>`.

-	Source files for various graphics (PSD, AI, ...) are in a separate resource repository. Only commit ready-to-use versions of graphics files into the main repository. Put source files into the resource repository.

-	Please note that I do not want to officially integrate any other localizations than English, German and French, the set of languages the game itself is localized in. Reasoning behind this is mainly that I don't want to litter the menu with a lot of languages. I might however make an exemption if I get proof that there is a substantial population of native speakers in the game for a particular language.

-	Requiring Flash, Silverlight or any other proprietary/closed-source stuff for your feature additions to work is a no-go. Implement your functionality solely in JavaScript. You may use additional helper libraries, not just the ones that are already there.

-	Please note that I'm not really fond of introducing any kind of build process in this project that is required to get the project files into a ready-to-use/upload state.

-	You may modify system code (module system, localization system, Item MVC, data structure), however, if it is not a bugfix for existing code, you may only extend it with functionality, never alter existing functionality. Try to implement as much as you can in the module you're writing. Only put things into the system files which you know will be used by other modules as well.

Other than pull requests, you can also send me feature requests, bug reports or other constructive feedback.


Changelog
---------

#### Version 2.0

##### 2.0.5 beta

-	Fixed incorrect fragment names/numbers for the SD3 boss.

##### 2.0.4 beta
-	Participant import from chat log will now also import the names of people you've sent a tell to, and of people who shouted something.

##### 2.0.3 beta
-	Fixed a bug introduced in the last version where loading the app state hash on page load wouldn't work in the ingame browser anymore.

##### 2.0.2 beta
-	Simplified chat script output sorting style label "By Boss/Mission" to "By Mission".
-	Changed Lookup module fragment tables so clicking an already-selected fragment on the fragment detail page takes you back to the boss itself. This should make switching back and forth while checking multiple fragments a little faster because of less mouse movement required.
-	When you now try to load the app with a new location hash in the same tab as an already open instance, the app will now load the new hash instead of doing nothing.

##### 2.0.1 beta
-	Exchanged Scorched Desert and Carpathian Fangs lair background images. Both were very bright which rendered the foreground text less readable. SD now has a nice relatively dark one; the new CF image is only slightly darker and somewhat noisy, but the darker shots I have of this lair don't really fit it well in my opinion.

##### 2.0.0 beta
-	Complete code rewrite
	-	Added module system
	-	Added localization system
	-	Added persistent state system using URL hashes
	-	Added shared MVC component for displaying item icons of boss summons and fragments
-	*Organizer* module
	-	Holds old functionality, enhanced for ease of use
	-	Extensive, separate help removed in favor of short help texts within the interface
	-	Boss fragment counts table
		-	Fixed positions of `+` and `-` buttons
	-	Participants / pick table
		-	Both side-by-side blocks have been merged into one
		-	Unstable checking off fragments feature removed
		-	Made naming rules less restrictive
		-	Added mass-importing player names by pasting a chat log excerpt feature
			*(proposed by [Grimmy](https://forums.thesecretworld.com/member.php?90310-Grimmy) on the forums)*
	-	Output
		-	Added ability to choose a separate localization for the chat script output independent of the webapp interface localization
		-	Added new alternative output sorting style *by participant* as new default
-	*Lookup* module
	-	Explore fragments and bosses and their interconnections
		-	See what lair bosses drop a particular regional fragment
		-	See what regional fragments a particular lair boss drops
		-	See the position of a fragment within its set and the other fragments' names
-	Localized in English, German and French


#### Version 1.1

##### 1.1.2 beta
-	Minor visual changes to the usage guide

##### 1.1.1 beta
-	Resolved a bug where the pick table wouldn't get redrawn as intended when switching the lair
-	Changed usage guide appearance

##### 1.1.0 beta
-	Integrated an extensive usage guide into the webapp, accessible via the `?` button in the menu bar.


#### Version 1.0

##### 1.0.3 beta
-	Strengthened item label drop shadow to make it more readable, and some other minor improvements to the CSS.
	*(Proposed by [Gridviper](http://chronicle.thesecretworld.com/character/Gridviper) in-game)*

##### 1.0.2 beta
-	Fixed a bug where the pick table would not get fully rendered when a participant was marked as unavailable on all three missions.
	*(Reported by [Jyusan](https://forums.thesecretworld.com/member.php?31891-Jyusan) on the forums)*

##### 1.0.1 beta
-	Fixed a bug where the TSW chat script download button would no longer work as soon as at least one person was marked as unavailable for at least one mission.

##### 1.0.0 beta
-	The initial release.


Credits
-------
-	Lair boss images have been taken from [*dancingstar93*'s Flickr album](https://www.flickr.com/photos/79764031@N03/sets/72157638380829154/), which in turn are taken from the game.
	I derived "x-ray"-esque versions from them using Adobe Photoshop CS6 Extended.

-	Lair area screenshots have been taken by myself ingame. Graphics settings: 2560x1440 resolution, DX11, FXAA-HQ, no motion blur, full tesselation, high quality SSAO, Brightness/Contrast/Gamma 1.0, all advanced sliders on 4.

-	Lair data (mission, fragment and boss names) in its English localization as well as fragment positions have been taken from [*Pandion Knights*' ultimate lair guide](http://forums.thesecretworld.com/showthread.php?t=77874).

-	Lair data in its German localization has been collected in-game by myself. The English and German interface localizations were also done by myself.

-	Lair data in its French localization has been taken from [TSWRDB.pw](https://tswrdb.pw/live/1030002/).

-	The French interface translation was done by [*Rexxars*](http://chronicle.thesecretworld.com/character/Rexxars) from my cabal.

-	Regional fragment drop data was kindly provided by [*Dott*](http://chronicle.thesecretworld.com/character/Dott) and [*Jermaine*](http://chronicle.thesecretworld.com/character/Jermaine) from my cabal.

-	The font used is called [Lato](https://www.google.com/fonts/specimen/Lato), available at Google Fonts.

-	The country flags have been taken from [FamFamFam.com](http://www.famfamfam.com/lab/icons/flags/).

-	My cabal [*In Vino Veritas*](http://invinoveritas.corplaunch.com) originally inspired me to create this webapp as we sometimes run lairs with crazy amounts of people, which in turn makes the fragment holder take ages to assemble a list of who-takes-what.

-	Joakim Bjørnstad ([@joakibj](http://github.com/joakibj)) has inspired me with his [tswcalc](http://github.com/joakibj/tswcalc) webapp in the technical design of this one.

-	Alex Netkachov's blog post [Model-View-Controller (MVC) with JavaScript](https://alexatnet.com/articles/model-view-controller-mvc-javascript) has helped me a lot figuring out how to tackle this design pattern in this very language.


License
-------
MIT License for the source code and fully self-created assets. Please see the `LICENSE` file.

The external artwork (lair boss images and their x-ray derivatives, lair area screenshots) should be considered property of Funcom GmbH unless otherwise noted and is redistributed under fair use.

The Lato font files keep their own license and are merely redistributed by this project; please see `assets/stylesheets/fonts/Lato/OFL.txt` for their license.

The country flags downloaded from [FamFamFam.com](http://www.famfamfam.com/lab/icons/flags/) do not have a formal license attached to them. The website states: "These flag icons are available for free use for any purpose with no requirement for attribution."

This software makes use of [Blob.js](https://github.com/eligrey/Blob.js) and [FileSaver.js](https://github.com/eligrey/FileSaver.js) by Eli Grey and redistributes them. Please see the respective `LICENSE.md` files in their subfolders in `assets/javascripts/libraries` for their license.

This software makes use of [jQuery](https://github.com/jquery/jquery) by the jQuery foundation and other contributors and redistributes it. Please see the `MIT-LICENSE.txt` file in `assets/javascripts/libraries/jQuery` for its license.

This software makes use of [mustache.js](https://github.com/janl/mustache.js) by Chris Wanstrath, Jan Lehnardt and the mustache.js community and redistributes it. Please see the `LICENSE` file in `assets/javascripts/libraries/mustache.js` for its license.

This software makes use of Douglas Crockford's [JSON implementation](https://github.com/douglascrockford/JSON-js) and redistributes it. Please see the first block comment in the `assets/javascripts/libraries/JSON/json2.js` file for its license.

This software makes use of Julien Bouquillon's ([@revolunet](https://github.com/revolunet)) [`lzw_encoder.js`](https://gist.github.com/revolunet/843889). There appears to be no formal license attached to it, so it could be assumed it is meant to be public domain.