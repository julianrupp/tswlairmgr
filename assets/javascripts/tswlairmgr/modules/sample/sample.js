var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};

tswlairmgr.modules.sample = new function() {
	this.id = "sample";
	this._localization = new tswlairmgr.modules.ModuleLocalization();
	var self = this;
	this._localization.observables.moduleLocalizationChanged.registerCallback(function(origin, context) {
		console.log("<tswlairmgr.modules.sample>: got notified that localization has changed.");
		self.redraw();
	});
	
	this._el = {
		self: null,
		sampleText: null,
		demoItems: {
			rootNode: null,
			fragments: {
				rootNode: null,
				fragments: []
			},
			summons: {
				rootNode: null,
				summons: []
			},
		},
		localizationSwitcher: {
			rootNode: null,
			interface: {
				rootNode: null
			},
			module: {
				rootNode: null
			},
			data: {
				rootNode: null
			}
		}
	};
	
	this._demoItemControllers = {
		fragments: [],
		summons: []
	};
	
	this._templates = {
		sample:
			'<span style="font-size: 20px;">' +
			'	{{localization.strings.sampleText.moduleContainerFor}} <b>{{context.name}}</b>' +
			'</span>',
		
		interface_switcher_title:
			'{{localization.strings.localizationSwitcher.interface.setInterfaceLocalization}}:',
		module_switcher_title:
			'{{localization.strings.localizationSwitcher.module.setModuleLocalization}}:',
		data_switcher_title:
			'{{localization.strings.localizationSwitcher.data.setDataLocalization}}:'
	};
	
	this.getDisplayName = function() {
		return this._localization.getLocalizationData().meta.displayName;
	};
	
	this.initWithRootNode = function(contentNode) {
		console.log("<tswlairmgr.modules.sample>: initWithRootNode: initializing...");
		
		this._el.self = contentNode;
		
		this.init();
		
		this.redraw();
	};
	
	this.init = function() {
		console.log("<tswlairmgr.modules.sample>: init called");
		
		this._localization.init();
		
		$(this._el.self).addClass("uibox");
		
		// Sample Text
		this._el.sampleText = $("<div />")
			.css("margin-bottom", "15px");
		this._el.self.append(this._el.sampleText);
		
		// Demo Items
		this._el.demoItems.rootNode = $("<div />");
		
		// Fragments
		this._el.demoItems.fragments.rootNode = $("<div />")
			.css("margin-bottom", "15px");
		
		var fragments = [
			{
				dataInstance:
					// LF: Theta 07
					tswlairmgr.core.data.struct.regions.tra.zones.bf.lairs[0].bosses[0].boss.getFragmentSet().getCFragment(),
				isSmall: false
			},
			{
				dataInstance:
					// RF: Alaph 04
					tswlairmgr.core.data.struct.regions.tra.regional.getFragmentSet().getNNEFragment(),
				isSmall: false
			},
			{
				dataInstance:
					// LF: Omicron 01
					tswlairmgr.core.data.struct.regions.sol.zones.bm.lairs[0].bosses[1].boss.getFragmentSet().getEFragment(),
				isSmall: true
			},
			{
				dataInstance:
					// RF: Lamadh 06
					tswlairmgr.core.data.struct.regions.sol.regional.getFragmentSet().getNWWFragment(),
				isSmall: true
			}
		];
		
		var self = this;
		$.each(fragments, function(index, compound) {
			var node = $("<div />")
				.css("display", "inline-block")
				.css("border", "1px solid #00ff00")
				.css("margin-right", "5px");
			
			self._demoItemControllers.fragments.push(
				new tswlairmgr.core.components.ItemHTML(
					compound.dataInstance,
					node,
					{
						isSmall: compound.isSmall
					}
				)
			);
			
			$(self._el.demoItems.fragments.rootNode).append(node);
			
			self._el.demoItems.fragments.fragments.push(node);
		});
		
		$(this._el.demoItems.rootNode).append(this._el.demoItems.fragments.rootNode);
		
		// Summons
		this._el.demoItems.summons.rootNode = $("<div />")
			.css("margin-bottom", "15px");
		
		var summons = [
			{
				dataInstance:
					// LS: Head of Glamr
					tswlairmgr.core.data.struct.regions.sol.zones.km.lairs[0].bosses[2].boss,
				isSmall: false
			},
			{
				dataInstance:
					// RS: Egypt
					tswlairmgr.core.data.struct.regions.egy.regional,
				isSmall: false
			},
			{
				dataInstance:
					// LS: Duneback
					tswlairmgr.core.data.struct.regions.egy.zones.cs.lairs[0].bosses[2].boss,
				isSmall: true
			},
			{
				dataInstance:
					// RS: Transylvania
					tswlairmgr.core.data.struct.regions.tra.regional,
				isSmall: true
			}
		];
		
		var self = this;
		$.each(summons, function(index, compound) {
			var node = $("<div />")
				.css("display", "inline-block")
				.css("border", "1px solid #00ff00")
				.css("margin-right", "5px");
			
			self._demoItemControllers.summons.push(
				new tswlairmgr.core.components.ItemHTML(
					compound.dataInstance,
					node,
					{
						isSmall: compound.isSmall
					}
				)
			);
			
			$(self._el.demoItems.summons.rootNode).append(node);
			
			self._el.demoItems.summons.summons.push(node);
		});
		
		$(this._el.demoItems.rootNode).append(this._el.demoItems.summons.rootNode);
		
		this._el.self.append(this._el.demoItems.rootNode);
		
		// Localization switcher
		this._el.localizationSwitcher.rootNode = $("<div />");
		
		// Interface localization switcher
		this._el.localizationSwitcher.interface.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.interface.rootNode);
		
		// Module localization switcher
		this._el.localizationSwitcher.module.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.module.rootNode);
		
		// Data localization switcher
		this._el.localizationSwitcher.data.rootNode = $("<div />")
			.css("margin-bottom", "5px");
		this._el.localizationSwitcher.rootNode.append(this._el.localizationSwitcher.data.rootNode);
		
		this._el.self.append(this._el.localizationSwitcher.rootNode);
	};
	
	this.redraw = function() {
		console.log("<tswlairmgr.modules.sample>: redraw called");
		
		// Sample Text
		$(this._el.sampleText).empty();
		$(this._el.sampleText).append(
			Mustache.render(this._templates.sample, { localization: this._localization.getLocalizationData(), context: {
					name: this.getDisplayName()
				}
			})
		);
		
		var self = this;
		
		// Demo Fragments
		// Will redraw themselves.
		
		// Interface localization switcher
		$(this._el.localizationSwitcher.interface.rootNode).empty();
		$(self._el.localizationSwitcher.interface.rootNode).append(
			$("<div />").append(
				Mustache.render(
					this._templates.interface_switcher_title, { localization: this._localization.getLocalizationData(), context:
						{}
					}
				)
			)
		);
		$.each(tswlairmgr.modules.getAllLocalizationIds(), function(index, id) {
			$(self._el.localizationSwitcher.interface.rootNode).append(
				self._createInterfaceLocalizationSwitchButton(id)
			);
		});
		
		// Module localization switcher
		$(this._el.localizationSwitcher.module.rootNode).empty();
		$(self._el.localizationSwitcher.module.rootNode).append(
			$("<div />").append(
		   		Mustache.render(
		   	        this._templates.module_switcher_title, { localization: this._localization.getLocalizationData(), context:
		   	        	{}
		   	        }
		   		)
			)
		);
		$.each(this._localization._sortedLocalizations, function(index, id) {
			$(self._el.localizationSwitcher.module.rootNode).append(
				self._createModuleLocalizationSwitchButton(id)
			);
		});
		
		// Module localization switcher
		$(this._el.localizationSwitcher.data.rootNode).empty();
		$(self._el.localizationSwitcher.data.rootNode).append(
			$("<div />").append(
		   		Mustache.render(
		   	        this._templates.data_switcher_title, { localization: this._localization.getLocalizationData(), context:
		   	        	{}
		   	        }
		   		)
			)
		);
		$.each(tswlairmgr.core.data.getAllLocalizationIds(), function(index, id) {
			$(self._el.localizationSwitcher.data.rootNode).append(
				self._createDataLocalizationSwitchButton(id)
			);
		});
	};
	
	this._createInterfaceLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#80c080', // Border
			'#00c000', // Background
			tswlairmgr.modules.getAllLocalizationsMeta()[id],
			function() {
				console.log("<tswlairmgr.modules.sample>: interface <"+id+"> localization button clicked");

				if(tswlairmgr.modules.getLocalizationId() !== id)
				{
					tswlairmgr.modules.setLocalizationById(id);
				}
			}
		);
	};
	
	this._createModuleLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#80c0c0', // Border
			'#00c0c0', // Background
			this._localization._localizations[id],
			function() {
				console.log("<tswlairmgr.modules.sample>: module <"+id+"> localization button clicked");

				if(self._localization.getLocalizationId() !== id)
				{
					self._localization.setLocalizationById(id);
				}
			}
		);
	};
	
	this._createDataLocalizationSwitchButton = function(id) {
		return this._createLocalizationSwitchButton(
			'#c08080', // Border
			'#c00000', // Background
			tswlairmgr.core.data.getAllLocalizationsMeta()[id],
			function() {
				console.log("<tswlairmgr.modules.sample>: data <"+id+"> localization button clicked");

				if(tswlairmgr.core.data.getLocalizationId() !== id)
				{
					tswlairmgr.core.data.setLocalizationById(id);
				}
			}
		);
	};
	
	this._createLocalizationSwitchButton = function(borderColorHex, backgroundColorHex, meta, callback) {
		var self = this;
		
		var buttonNode = $(
			'<div class="button" style="display: inline-block; border: 1px solid '+borderColorHex+'; border-radius: 4px; margin: 2px; background-color: '+backgroundColorHex+'; cursor: pointer;">' +
			'	<div class="buttonContent" style="padding: 3px 6px 3px 6px;">' +
			'		'+meta.localName+' (<i>'+meta.globalName+'</i>)' +
			'	</div>' +
			'</div>'
		)
		.click(function(){
			callback.call();
		});
		
		return buttonNode;
	}
	
	this._appBackground = {
		savedSnapshot: null,
		module: "#404040 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA+SURBVDjLY/j//z8DJZgyzQwMDZQawDTgLmAcdcEgcMHApwOWAXcBG4gQAJvEwMALpbmhNBeU5kCmYTbDaABkFrFGcnxtxwAAAABJRU5ErkJggg==) repeat center"
	};
	
	this.becameActive = function() {
		console.log("<tswlairmgr.modules.sample>: got notified that module became active.");
		
		// Save snapshot
		this._appBackground.savedSnapshot = $("body").css("background");
		// Set
		$("body").css("background", this._appBackground.module);
	};
	
	this.becameInactive = function() {
		console.log("<tswlairmgr.modules.sample>: got notified that module became inactive.");
		
		// Restore snapshot
		$("#webapp").css("background", this._appBackground.savedSnapshot);
	};
	
	tswlairmgr.modules.registerModule(this);
};