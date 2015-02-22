TSW Lair Manager
================

**This webapp is in early development and currently still (nearly) non-functional.**

TSW Lair Manager is a fan-made lair fragment organizer for [The Secret World](http://thesecretworld.com) (TSW), a MMORPG by Funcom.

It can be used by the leaders or fragment holders of lair groups to easily determine and communicate what fragments group members should pick as their mission reward to maximize the amount of boss summons.

Unlike the limited [MissionHelper addon](http://www.curse.com/tsw-mods/tsw/missionhelper), this webapp can be used with an arbitrary number of group members and lets you see everything at a glance, still with nice graphics. Additionally it just works in any modern browser.

Features:

* Lair bosses from all 8 classic lairs
* Support for arbitrary group sizes
* Easy and fast to use
* On-the-fly TSW chat script generation

TSW Lair Manager can be found at: [http://tsw.nex4k.net/lairs/](http://tsw.nex4k.net/lairs/)

**Note:** All active development takes place in the `master` branch while TSW Lair Manager is still in initial development.


Requirements
------------
Just a basic web server. All functionality is implemented in client-side JavaScript.


Retrieving
----------
Fetch the source code from this repo the usual way.

Open `index.html` to view.


Distributing
------------
Upload `index.html` and the `assets` folder to a web server.


Contributing
------------
Code - not at this time yet.

I'll be open for code contributions once I reach the first fully functional version.

(There sure will be a lot to do to prettify and refactor as I'm not really into web development this much and never bothered about learning some JavaScript helper library like jQuery and the likes.)

However, you can already send me feature requests or other constructive feedback.


Credits
-------
-	Lair boss images have been taken from [*dancingstar93*'s Flickr album](https://www.flickr.com/photos/79764031@N03/sets/72157638380829154/).
	I derived "x-ray"-esque versions from them using Adobe Photoshop CS6 Extended. You can find the PSD files in the resource repository.

-	Lair area screenshots have been taken by myself.
	
	Graphics settings: 2560x1440, DX11, FXAA-HQ, no motion blur, full tesselation, high quality SSAO, Brightness 1.0, Contrast 1.0, Gamma 1.0, all advanced sliders on 4.

-	Lair data (Mission names, Fragment names, Boss names, Fragment positions) has been taken from [*Pandion Knights*' ultimate lair guide](http://forums.thesecretworld.com/showthread.php?t=77874).

-	The font used is called [*Lato*](https://www.google.com/fonts/specimen/Lato), available at Google Fonts under the SIL Open Font License.

-	My cabal [*In Vino Veritas*](http://invinoveritas.corplaunch.com) originally inspired me to create this webapp as we sometimes run lairs with crazy amounts of people, which in turn makes the fragment holder take ages to assemble a list of who-takes-what.

-	Joakim Bjørnstad ([@joakibj](http://github.com/joakibj)) has inspired me with his [*tswcalc*](http://github.com/joakibj/tswcalc) webapp in the technical design of this one.


License
-------
MIT License for the source code and fully self-created assets. Please see the `LICENSE` file.

The external artwork (lair boss images and their x-ray derivatives, lair area screenshots) should be considered property of Funcom GmbH unless otherwise noted and is redistributed under fair use.

The Lato font files keep their own license and are merely redistributed by this project; see the `assets/stylesheets/fonts/Lato/OFL.txt` file for their license.

This software makes use of [Blob.js](https://github.com/eligrey/Blob.js) and [FileSaver.js](https://github.com/eligrey/FileSaver.js) by [Eli Grey](https://github.com/eligrey) and redistributes them. Please see the respective `LICENSE.md` files in their subfolders in `assets/javascripts/libraries`.