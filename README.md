TSW Lair Manager
================

TSW Lair Manager is a fan-made lair fragment organizer for [The Secret World](http://thesecretworld.com) (TSW), a MMORPG by Funcom.

It can be used by the leaders or fragment holders of lair groups to easily determine and communicate what fragments group members should pick as their mission reward to maximize the amount of boss summons.

Unlike the [MissionHelper](http://www.curse.com/tsw-mods/tsw/missionhelper) addon, this webapp can be used with an arbitrary number of group members, lets you see everything at a glance, and has the potential to take you much less time to use. Also, it just works in any modern/standards-compliant browser.

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

An instance of TSW Lair Manager can be found at: [http://tsw.nex4k.net/lairs/](http://tsw.nex4k.net/lairs/)

**Official TSW forums announcement and discussion thread:** [[Webapp] TSW Lair Manager](http://forums.thesecretworld.com/showthread.php?84221-Webapp-TSW-Lair-Manager)


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
I've recently completely rewritten the code and cleaned it up, though there definitely still is a lot of room for improvement. I'm not really into web development this much anymore, and also never really was into JavaScript and jQuery.

- All active development takes place in feature branches branching off the `dev` branch.

- Source files for various graphics (PSD, AI, ...) are in a separate resource repository. Only commit ready-to-use versions of graphics files into the main repository. Put source files into the resource repository.

- Please note that I do not want to officially integrate any other localizations than English, German and French, the set of languages the game itself is localized in. Reasoning behind this is mainly that I don't want to litter the menu with a lot of languages. I might however make an exemption if I get proof that there is a substantial population of native speakers in the game for a particular language.

Other than pull requests, you can also send me feature requests, bug reports or other constructive feedback.


Credits
-------
-	Lair boss images have been taken from [*dancingstar93*'s Flickr album](https://www.flickr.com/photos/79764031@N03/sets/72157638380829154/), which in turn are taken from the game.
	I derived "x-ray"-esque versions from them using Adobe Photoshop CS6 Extended. You can find the PSD files in the resource repository.

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