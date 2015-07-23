TSW Lair Manager
================

TSW Lair Manager is a fan-made lair fragment organizer for [The Secret World](http://thesecretworld.com) (TSW), a MMORPG by Funcom.

It can be used by the leaders or fragment holders of lair groups to easily determine and communicate what fragments group members should pick as their mission reward to maximize the amount of boss summons.

Unlike the [MissionHelper](http://www.curse.com/tsw-mods/tsw/missionhelper) addon, this webapp can be used with an arbitrary number of group members, lets you see everything at a glance, and has the potential to take you much less time to use. Also, it just works in any modern/standards-compliant browser.

With version 2, a major rewrite, the source code was made more readable and easier to extend, and some new features have been added: regional bosses, localization support, and fragment lookup. It now makes use of [jQuery](http://jquery.com) and [mustache.js](http://mustache.github.io/).

Features:

* Lair bosses from all 8 classic lairs
* Regional bosses from all 3 classic regions
* Fragment lookup utility
* Support for arbitrary group sizes
* Easy and fast to use
* On-the-fly TSW chat script generation
* Localized in English and German

An instance of TSW Lair Manager can be found at: [http://tsw.nex4k.net/lairs/](http://tsw.nex4k.net/lairs/)

**Note:** All active development takes place in feature branches branching off the `dev` branch.

**Official TSW forums announcement and discussion thread:** [http://forums.thesecretworld.com/showthread.php?84221-Webapp-TSW-Lair-Manager](http://forums.thesecretworld.com/showthread.php?84221-Webapp-TSW-Lair-Manager)


Requirements
------------
Just a normal modern web browser. All functionality is implemented in client-side JavaScript.


Retrieving
----------
Fetch the source code from this repo the usual way.

Open `index.html` to view.


Using
-----
Click the **Help** tab in the upper right corner of the app to display an usage guide.


Distributing
------------
Upload `index.html` and the `assets` folder to a web server.


Contributing
------------
I've recently completely rewritten the code, though there sure still is a lot to do to enhance as I'm not really into web development this much anymore, and also never really was into JavaScript and jQuery.

What I'm particularly looking for is a French translation for the interface and data, so that with the existing English and German localizations, TSW Lair Manager would then be localized in the same set of languages as The Secret World itself. Please note that I do not want to integrate any other localizations than those three.

Other than pull requests, you can also send me feature requests or other constructive feedback.


Credits
-------
-	Lair boss images have been taken from [*dancingstar93*'s Flickr album](https://www.flickr.com/photos/79764031@N03/sets/72157638380829154/).
	I derived "x-ray"-esque versions from them using Adobe Photoshop CS6 Extended. You can find the PSD files in the resource repository.

-	Lair area screenshots have been taken by myself.
	
	Graphics settings: 2560x1440, DX11, FXAA-HQ, no motion blur, full tesselation, high quality SSAO, Brightness 1.0, Contrast 1.0, Gamma 1.0, all advanced sliders on 4.

-	Lair data (Mission names, Fragment names, Boss names, Fragment positions) has been taken from [*Pandion Knights*' ultimate lair guide](http://forums.thesecretworld.com/showthread.php?t=77874).

-	Regional fragment drop data was kindly provided by *Dott* and *Jermaine* of the [*In Vino Veritas*](http://invinoveritas.corplaunch.com) cabal.

-	The font used is called [Lato](https://www.google.com/fonts/specimen/Lato), available at Google Fonts.

-	The country flags have been taken from [FamFamFam.com](http://www.famfamfam.com/lab/icons/flags/). The page states they are free to use and do not require attribution in any form.

-	My cabal [*In Vino Veritas*](http://invinoveritas.corplaunch.com) originally inspired me to create this webapp as we sometimes run lairs with crazy amounts of people, which in turn makes the fragment holder take ages to assemble a list of who-takes-what.

-	Joakim Bjørnstad ([@joakibj](http://github.com/joakibj)) has inspired me with his [tswcalc](http://github.com/joakibj/tswcalc) webapp in the technical design of this one.

-	Alex Netkachov's blog post [Model-View-Controller (MVC) with JavaScript](https://alexatnet.com/articles/model-view-controller-mvc-javascript) has helped me a lot figuring out how to tackle this design pattern in this very language.


License
-------
MIT License for the source code and fully self-created assets. Please see the `LICENSE` file.

The external artwork (lair boss images and their x-ray derivatives, lair area screenshots) should be considered property of Funcom GmbH unless otherwise noted and is redistributed under fair use.

The Lato font files keep their own license and are merely redistributed by this project; please see `assets/stylesheets/fonts/Lato/OFL.txt` for their license.

This software makes use of [Blob.js](https://github.com/eligrey/Blob.js) and [FileSaver.js](https://github.com/eligrey/FileSaver.js) by Eli Grey ([@eligrey](https://github.com/eligrey)) and redistributes them. Please see the respective `LICENSE.md` files in their subfolders in `assets/javascripts/libraries` for their license.

This software makes use of [jQuery](https://github.com/jquery/jquery) by the jQuery foundation and other contributors and redistributes it. Please see the `MIT-LICENSE.txt` file in `assets/javascripts/libraries/jQuery` for its license.

This software makes use of [mustache.js](https://github.com/janl/mustache.js) by Chris Wanstrath, Jan Lehnardt and the mustache.js community and redistributes it. Please see the `LICENSE` file in `assets/javascripts/libraries/mustache.js` for its license.